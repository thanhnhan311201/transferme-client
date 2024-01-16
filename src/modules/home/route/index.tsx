import React, { lazy } from "react";

import { IRoute } from "@/types/route.type";

const Home = lazy(() => import("@/modules/home/index"));

export const homeRoutes: IRoute[] = [
  { path: "/", key: "home", element: <Home /> },
];
