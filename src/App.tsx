import { useEffect } from "react";

import PublicRoutes from "./routes/PublicRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";

// import socketClient from "./socket";
import { useAppSelector } from "./store";

import { AUTHENTICATION_STATUS } from "./modules/authentication/utils";
import { useAutoSignin } from "./modules/authentication/hooks";

import Loading from "./components/Loading";
import { initFacebookSdk } from "./utils/facebookSDK";

function App() {
  const { authStatus } = useAppSelector((state) => state.auth);

  const autoSignin = useAutoSignin();

  useEffect(() => {
    autoSignin();
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

  useEffect(() => {
    initFacebookSdk();
  }, []);

  switch (authStatus) {
    case AUTHENTICATION_STATUS.UNAUTHENTICATED:
      return <PublicRoutes />;
    case AUTHENTICATION_STATUS.AUTHENTICATED:
      return <ProtectedRoutes />;
    case AUTHENTICATION_STATUS.AUTHENTICATING:
    default:
      return <Loading />;
  }
}

export default App;
