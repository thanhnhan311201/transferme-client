import { Navigate, Route, Routes } from "react-router-dom";

import ScreenAuthentication from "../screens/Authentication";
import ScreenHome from "../screens/Home";

import Login from "../features/authentication/views/Login";
import Register from "../features/authentication/views/Register";
import ResetPass from "../features/authentication/views/ResetPass";
import NewPass from "../features/authentication/views/NewPass";
import ResetToken from "../features/authentication/views/ResetToken";

const PublicRoutes: React.FC = () => {
  return (
    <ScreenAuthentication>
      <Routes>
        <Route path="/" element={<ScreenHome />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Register />} />
        <Route path="/auth/reset" element={<ResetPass />} />
        <Route path="/auth/newpass" element={<NewPass />} />
        <Route path="/auth/reset-token" element={<ResetToken />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Routes>
    </ScreenAuthentication>
  );
};

export default PublicRoutes;
