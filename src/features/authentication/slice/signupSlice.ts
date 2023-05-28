import { createSlice } from "@reduxjs/toolkit";

export enum SIGNUP_STATUS {
  PROCESS_SIGNUP = "PROCESS_SIGNUP",
  SIGNUP_FAIL = "SIGNUP_FAIL",
  SIGNUP_SUCCESS = "SIGNUP_SUCCESS",
  NOT_SIGNUP = "NOT_SIGNUP",
}

interface SliceState {
  signupStatus: SIGNUP_STATUS;
}

const signupSlice = createSlice({
  name: "signup",
  initialState: {
    signupStatus: SIGNUP_STATUS.NOT_SIGNUP,
  } as SliceState,
  reducers: {
    processSignup: (state) => ({
      signupStatus: SIGNUP_STATUS.PROCESS_SIGNUP,
    }),
    setSignupFail: (state) => ({ signupStatus: SIGNUP_STATUS.SIGNUP_FAIL }),
    setSignupSuccess: (state) => ({
      signupStatus: SIGNUP_STATUS.SIGNUP_SUCCESS,
    }),
    setNotSignup: (state) => ({ signupStatus: SIGNUP_STATUS.NOT_SIGNUP }),
  },
});

export const signupActions = signupSlice.actions;

export default signupSlice;
