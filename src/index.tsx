import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

import store from "./states";
import { GOOGLE_CLIENT_ID } from "./config";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Router>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </Router>
);
