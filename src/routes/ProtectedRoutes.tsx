import { Suspense } from 'react'
import { Routes, Route, Navigate } from "react-router";

import { transferRoutes } from "@/modules/transfer/route";

import Loading from '@/components/Loading';

const ProtectedRoutes: React.FC = () => {
  const protectedRoutes = [...transferRoutes];

  return (
    <Suspense fallback={<Loading loading={true} />}>
      <Routes>
        {Array.isArray(protectedRoutes) &&
          protectedRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        <Route path="*" element={<Navigate to={"/transfer"} />} />
      </Routes>
    </Suspense>
  );
};

export default ProtectedRoutes;
