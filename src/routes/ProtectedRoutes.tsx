import { Routes, Route, Navigate } from "react-router";

import { transferRoutes } from "@/modules/transfer/route";

const ProtectedRoutes: React.FC = () => {
  const protectedRoutes = [...transferRoutes];

  return (
    <Routes>
      {Array.isArray(protectedRoutes) &&
        protectedRoutes.map((route) => (
          <Route key={route.key} path={route.path} element={route.element} />
        ))}
      <Route path="*" element={<Navigate to={"/transfer"} />} />
    </Routes>
  );
};

export default ProtectedRoutes;
