import { useSelector } from "react-redux";
import { useEffect } from "react";

import PublicRoutes from "./routes/PublicRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";

// import socketClient from "./socket";

import { AUTHENTICATION_STATUS } from "./features/authentication/slice/authSlice";
import { useAutoLogin } from "./features/authentication/hooks";
import { RootState } from "./states";

function App() {
  const authStatus = useSelector((state: RootState) => state.auth.authStatus);

  const autoLogin = useAutoLogin();

  useEffect(() => {
    autoLogin();
  }, []);

  // useEffect(() => {
  //   const handleCloseTab = (e: BeforeUnloadEvent) => {
  //     socketClient.disconnect();
  //   };

  //   window.addEventListener("beforeunload", handleCloseTab);
  //   return () => {
  //     window.removeEventListener("beforeunload", handleCloseTab);
  //   };
  // }, []);

  switch (authStatus) {
    case AUTHENTICATION_STATUS.UNAUTHENTICATE:
      return <PublicRoutes />;
    case AUTHENTICATION_STATUS.AUTHENTICATED:
      return <ProtectedRoutes />;
    case AUTHENTICATION_STATUS.AUTHENTICATING:
    default:
      return <div>Loading</div>;
  }
}

export default App;
