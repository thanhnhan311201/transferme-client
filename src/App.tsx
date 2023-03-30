import { useSelector } from "react-redux";
import { useEffect } from "react";

import PublicRoutes from "./routes/PublicRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";

import { AUTHENTICATION_STATUS } from "./features/authentication/slice/authSlice";
import { RootState } from "./states";

function App() {
  const authStatus = useSelector((state: RootState) => state.auth.authStatus);

  switch (authStatus) {
    case AUTHENTICATION_STATUS.UNAUTHENTICATE:
      return <PublicRoutes />;
    case AUTHENTICATION_STATUS.AUTHENTICATED:
      return <ProtectedRoutes />;
    default:
      return <div>Loading</div>;
  }
}

export default App;
