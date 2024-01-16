import React, { lazy } from "react";

import { IRoute } from "@/types/route.type";

const Transfer = lazy(() => import("@/modules/transfer/views/Transfer"));

export const transferRoutes: IRoute[] = [
  {
    path: "/transfer",
    key: "transfer",
    element: <Transfer />,
  },
];
