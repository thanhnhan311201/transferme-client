import { createSlice } from "@reduxjs/toolkit";

export enum AUTHENTICATION_STATUS {
  UNAUTHENTICATE = "UNAUTHENTICATE",
  AUTHENTICATED = "AUTHENTICATED",
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authStatus: AUTHENTICATION_STATUS.UNAUTHENTICATE,
    userInfo: { id: null, email: null, name: null, picture: null },
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
      userInfo: { id: null, email: null, name: null, picture: null },
    }),
  },
});

export const authActions = authSlice.actions;

export default authSlice;
