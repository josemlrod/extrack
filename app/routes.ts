import { type RouteConfig, layout, route } from "@react-router/dev/routes";

export default [
  // index("routes/layout.tsx"),
  layout("routes/layout.tsx", [
    route("/workouts", "routes/workouts.tsx"),
    route("/progress", "routes/progress.tsx"),
  ]),
] satisfies RouteConfig;
