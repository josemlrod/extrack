import { createRequestHandler } from "react-router-dom/server";
import { Headers } from "@remix-run/web-fetch";
import {
  installGlobals,
  createReadableStreamFromReadable,
} from "@remix-run/node";

// Install globals like fetch, Request, Response, etc.
installGlobals();

// Import your app's routes
import * as build from "../src/entry.server";

export default async function handler(req, res) {
  try {
    // Create a request from the Vercel request
    const request = new Request(req.url, {
      method: req.method,
      headers: new Headers(req.headers),
      body:
        req.method !== "GET" && req.method !== "HEAD"
          ? createReadableStreamFromReadable(req)
          : undefined,
    });

    const handler = createRequestHandler(build, "production");
    const response = await handler(request);

    // Set status code and headers
    res.statusCode = response.status;
    for (const [key, value] of response.headers.entries()) {
      res.setHeader(key, value);
    }

    // Send response
    if (response.body) {
      const reader = response.body.getReader();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        res.write(value);
      }
    }
    res.end();
  } catch (error) {
    console.error(error);
    res.statusCode = 500;
    res.end("Internal Server Error");
  }
}
