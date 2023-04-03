import { createSlice } from "@reduxjs/toolkit";

export enum AUTHENTICATION_STATUS {
  UNAUTHENTICATE = "UNAUTHENTICATE",
  AUTHENTICATED = "AUTHENTICATED",
  AUTHENTICATING = "AUTHENTICATING",
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authStatus: AUTHENTICATION_STATUS.UNAUTHENTICATE,
    userInfo: { id: "", email: "", name: "", picture: "" },
  },
  reducers: {
    setAuthenticated: (state, action) => ({
      ...state,
      authStatus: AUTHENTICATION_STATUS.AUTHENTICATED,
      userInfo: action.payload,
    }),
    setUnauthenticated: (state) => ({
      ...state,
      authStatus: AUTHENTICATION_STATUS.UNAUTHENTICATE,
      userInfo: { id: "", email: "", name: "", picture: "" },
    }),
    setUnauthenticating: (state) => ({
      ...state,
      authStatus: AUTHENTICATION_STATUS.AUTHENTICATING,
    }),
  },
});

export const authActions = authSlice.actions;

export default authSlice;
