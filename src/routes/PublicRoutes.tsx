import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { homeRoutes } from "@/modules/home/route";
import { authRoutes } from "@/modules/authentication/route";

import Loading from "@/components/Loading";

const PublicRoutes: React.FC = () => {
  const publicRoutes = [...homeRoutes, ...authRoutes];

  return (
    <Suspense fallback={<Loading loading={true} />}>
      <Routes>
        {Array.isArray(publicRoutes) &&
          publicRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </Suspense>
  );
};

export default PublicRoutes;
