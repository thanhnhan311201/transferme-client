import { useEffect } from "react";

import PublicRoutes from "./routes/PublicRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";

// import socketClient from "./socket";
import { useAppSelector } from "./states";

import { AUTHENTICATION_STATUS } from "./modules/authentication/utils/auth.constant";
import { useAutoLogin } from "./modules/authentication/hooks";

import Loading from "./components/Loading";

function App() {
  const { authStatus } = useAppSelector((state) => state.auth);

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
      return <Loading />;
  }
}

export default App;
