import React, { lazy } from "react";

import { IRoute } from "@/types/route.type";

const Login = lazy(() => import("@/modules/authentication/views/Login"))
const Register = lazy(() => import("@/modules/authentication/views/Register"))
const ResetPass = lazy(() => import("@/modules/authentication/views/ResetPass"))
const NewPass = lazy(() => import("@/modules/authentication/views/NewPass"))
const ResetToken = lazy(() => import("@/modules/authentication/views/ResetToken"))

export const authRoutes: IRoute[] = [
  {
    path: "/auth/login",
    key: "login",
    element: <Login />,
  },
  {
    path: "/auth/signup",
    key: "signup",
    element: <Register />,
  },
  {
    path: "/auth/reset",
    key: "loresetgin",
    element: <ResetPass />,
  },
  {
    path: "/auth/newpass",
    key: "newpass",
    element: <NewPass />,
  },
  {
    path: "/auth/reset-token",
    key: "reset-token",
    element: <ResetToken />,
  },
];
