import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { GoogleOAuthProvider } from "@react-oauth/google";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <GoogleOAuthProvider clientId="655941934067-3uhmjqnjmkddp674a9t09h0sctev1u8p.apps.googleusercontent.com">
    <App />
  </GoogleOAuthProvider>
);
