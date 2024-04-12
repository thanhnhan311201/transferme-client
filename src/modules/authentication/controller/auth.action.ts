import { createAsyncThunk } from "@reduxjs/toolkit";

import AuthAPI from "./auth.service";

import {
  ILoginRequestParam,
  ILoginWithGitHubRequestParam,
  ILoginWithGoogleRequestParam,
  ISignUpRequestParam,
  IVerifyEmailRequestParam,
  IVerifyTokenRequestParam,
} from "../types/requestParam.interface";

const SLICE_NAME = "auth";

// action login
export const login = createAsyncThunk(
  SLICE_NAME + "/login",
  async (params: ILoginRequestParam) => {
    const response = await AuthAPI.login(params);
    return response.data;
  }
);

// action signup
export const signup = createAsyncThunk(
  SLICE_NAME + "/signup",
  async (params: ISignUpRequestParam) => {
    const response = await AuthAPI.signup(params);
    return response.data;
  }
);

// action login with google
export const loginWithGoogle = createAsyncThunk(
  SLICE_NAME + "/login-with-google",
  async (params: ILoginWithGoogleRequestParam) => {
    const response = await AuthAPI.loginWithGoogle(params);
    return response.data;
  }
);

// action verify token
export const verifyToken = createAsyncThunk(
  SLICE_NAME + "/verify-token",
  async (params: IVerifyTokenRequestParam) => {
    const response = await AuthAPI.verifyToken(params);
    return response.data;
  }
);

// action verify email
export const verifyEmail = createAsyncThunk(
  SLICE_NAME + "/verify-email",
  async (params: IVerifyEmailRequestParam) => {
    const response = await AuthAPI.verifyEmail(params);
    return response.data;
  }
);

// action login with github
export const loginWithGithub = createAsyncThunk(
  SLICE_NAME + "/login-with-github",
  async (params: ILoginWithGitHubRequestParam) => {
    const response = await AuthAPI.loginWithGithub(params);
    return response.data;
  }
);
