import { BrowserRouter as Router } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import PublicRoutes from "./routes/PublicRoutes";
import ProtectedRoutes from "./routes/ProtectedRoutes";

import { RootState } from "./states";

function App() {
  const authStatus = useSelector((state: RootState) => state.auth.authStatus);
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);

  return (
    <div>
      <Router>{authStatus ? <PublicRoutes /> : <ProtectedRoutes />}</Router>
    </div>
  );
}

export default App;
