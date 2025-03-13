import { createStaticHandler } from "react-router-dom/server";
import routes from "./app/routes.ts";

export const { query } = createStaticHandler(routes);
