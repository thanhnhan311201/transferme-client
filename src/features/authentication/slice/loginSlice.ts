import { createSlice } from "@reduxjs/toolkit";

export enum LOGIN_STATUS {
  PROCESS_LOGIN = "PROCESS_LOGIN",
  LOGIN_FAIL = "LOGIN_FAIL",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  NOT_LOGIN = "NOT_LOGIN",
}

interface SliceState {
  loginStatus: LOGIN_STATUS;
}

const loginSlice = createSlice({
  name: "login",
  initialState: {
    loginStatus: LOGIN_STATUS.NOT_LOGIN,
  } as SliceState,
  reducers: {
    processLogin: (state) => ({ loginStatus: LOGIN_STATUS.PROCESS_LOGIN }),
    setLoginFail: (state) => ({ loginStatus: LOGIN_STATUS.LOGIN_FAIL }),
    setLoginSuccess: (state) => ({ loginStatus: LOGIN_STATUS.LOGIN_SUCCESS }),
    setNotLogin: (state) => ({ loginStatus: LOGIN_STATUS.NOT_LOGIN }),
  },
});

export const loginActions = loginSlice.actions;

export default loginSlice;
