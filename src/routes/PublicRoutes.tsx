import { Navigate, Route, Routes } from "react-router-dom";

import ScreenAuthentication from "../screens/Authentication";
import ScreenHome from "../screens/Home";

import Login from "../modules/authentication/views/Login";
import Register from "../modules/authentication/views/Register";
import ResetPass from "../modules/authentication/views/ResetPass";
import NewPass from "../modules/authentication/views/NewPass";
import ResetToken from "../modules/authentication/views/ResetToken";

const PublicRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<ScreenHome />} />
      <Route path="/auth" element={<ScreenAuthentication />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Register />} />
        <Route path="reset" element={<ResetPass />} />
        <Route path="newpass" element={<NewPass />} />
        <Route path="reset-token" element={<ResetToken />} />
      </Route>
      <Route path="*" element={<Navigate to={"/"} />} />
    </Routes>
  );
};

export default PublicRoutes;
