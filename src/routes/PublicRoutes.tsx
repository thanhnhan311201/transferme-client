import { Navigate, Route, Routes, useRoutes } from "react-router-dom";

import { homeRoutes } from "@/modules/home/route";
import { authRoutes } from "@/modules/authentication/route";

const PublicRoutes: React.FC = () => {
  const publicRoutes = [...homeRoutes, ...authRoutes];

  return (
    <Routes>
      {Array.isArray(publicRoutes) &&
        publicRoutes.map((route) => (
          <Route key={route.key} path={route.path} element={route.element} />
        ))}
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};

export default PublicRoutes;
