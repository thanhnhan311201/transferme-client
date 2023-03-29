import { createSlice } from "@reduxjs/toolkit";

export enum AUTHENTICATION_STATUS {
  UNAUTHENTICATE = "UNAUTHENTICATE",
  AUTHENTICATED = "AUTHENTICATED",
}

interface IUserInfo {
  id: string;
  username: string;
}

const authSlice = createSlice({
  name: "auth",
  initialState: {
    authenticationStatus: AUTHENTICATION_STATUS.UNAUTHENTICATE,
    userInfo: { id: null, username: null },
  },
  reducers: {
    setAuthenticated: (state, action) => ({
      ...state,
      authenticationStatus: AUTHENTICATION_STATUS.AUTHENTICATED,
      userInfo: action.payload.userInfo,
    }),
    setUnauthenticated: (state) => ({
      ...state,
      authenticationStatus: AUTHENTICATION_STATUS.UNAUTHENTICATE,
      userInfo: { id: null, username: null },
    }),
  },
});

export const authActions = authSlice.actions;

export default authSlice;
