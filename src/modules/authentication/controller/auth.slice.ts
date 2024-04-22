import { createSlice } from "@reduxjs/toolkit";

import { AUTHENTICATION_STATUS } from "../utils";

interface ISliceState {
  authStatus: string;
}

const SLICE_NAME = "auth";

const initialState: ISliceState = {
  authStatus: AUTHENTICATION_STATUS.UNAUTHENTICATE,
};

const authSlice = createSlice({
  name: SLICE_NAME,
  initialState: initialState,
  reducers: {
    setAuthenticated: (state) => ({
      ...state,
      authStatus: AUTHENTICATION_STATUS.AUTHENTICATED,
    }),
    setUnauthenticated: (state) => ({
      ...state,
      authStatus: AUTHENTICATION_STATUS.UNAUTHENTICATE,
    }),
    setUnauthenticating: (state) => ({
      ...state,
      authStatus: AUTHENTICATION_STATUS.AUTHENTICATING,
    }),
  },
});

export const { setAuthenticated, setUnauthenticated, setUnauthenticating } =
  authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
