import { Routes, Route, Navigate } from "react-router";

import ScreenTransfer from "../screens/Transfer";

const ProtectedRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/transfer" element={<ScreenTransfer />} />
    </Routes>
  );
};

export default ProtectedRoutes;
