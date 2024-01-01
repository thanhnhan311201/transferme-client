import { createSlice } from "@reduxjs/toolkit";

import {
  AUTHENTICATION_STATUS,
  LOGIN_STATUS,
  SIGNUP_STATUS,
} from "../utils/auth.constant";

interface SliceState {
  authStatus: string;
  userInfo: {
    id: string;
    email: string;
    name: string;
    picture: string;
  };
  loginStatus: LOGIN_STATUS;
  signupStatus: SIGNUP_STATUS;
}

interface SliceState {}

const SLICE_NAME = "auth";

const initialState: SliceState = {
  authStatus: AUTHENTICATION_STATUS.UNAUTHENTICATE,
  userInfo: { id: "", email: "", name: "", picture: "" },
  loginStatus: LOGIN_STATUS.IDLE,
  signupStatus: SIGNUP_STATUS.IDLE,
};

const authSlice = createSlice({
  name: SLICE_NAME,
  initialState: initialState,
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
      userInfo: { id: "", email: "", name: "", picture: "" },
    }),

    processLogin: (state) => ({
      ...state,
      loginStatus: LOGIN_STATUS.PROCESS_LOGIN,
    }),
    setLoginFail: (state) => ({
      ...state,
      loginStatus: LOGIN_STATUS.LOGIN_FAIL,
    }),
    setLoginSuccess: (state) => ({
      ...state,
      loginStatus: LOGIN_STATUS.LOGIN_SUCCESS,
    }),
    setIdleStatusLogin: (state) => ({ ...state, loginStatus: LOGIN_STATUS.IDLE }),

    processSignup: (state) => ({
      ...state,
      signupStatus: SIGNUP_STATUS.PROCESS_SIGNUP,
    }),
    setSignupFail: (state) => ({
      ...state,
      signupStatus: SIGNUP_STATUS.SIGNUP_FAIL,
    }),
    setSignupSuccess: (state) => ({
      ...state,
      signupStatus: SIGNUP_STATUS.SIGNUP_SUCCESS,
    }),
    setIdleStatusSignup: (state) => ({ ...state, signupStatus: SIGNUP_STATUS.IDLE }),
  },
});

export const {
  processLogin,
  processSignup,
  setAuthenticated,
  setLoginFail,
  setLoginSuccess,
  setIdleStatusLogin,
  setIdleStatusSignup,
  setSignupFail,
  setSignupSuccess,
  setUnauthenticated,
  setUnauthenticating,
} = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
