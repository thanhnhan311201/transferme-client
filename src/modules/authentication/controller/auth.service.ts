import axiosClient from "@/api/axiosClient";
import {
  ILoginRequestParam,
  ILoginWithGoogleRequestParam,
  ISignUpRequestParam,
  IVerifyEmailRequestParam,
  IVerifyTokenRequestParam,
} from "../types/requestParam.interface";
import { ICommonResponse } from "../types/responseParam.interface";

namespace AuthAPI {
  export const login = (params: ILoginRequestParam) => {
    const url = "/user/login";
    const requestBody = JSON.stringify(params);

    return axiosClient.post<ILoginRequestParam>(url, requestBody);
  };

  export const signup = (params: ISignUpRequestParam) => {
    const url = "/user/signup";
    const requestBody = JSON.stringify(params);
    return axiosClient.post<ICommonResponse>(url, requestBody);
  };

  export const loginWithGoogle = (params: ILoginWithGoogleRequestParam) => {
    const url = "/user/google";
    const requestBody = JSON.stringify({ authCode: params.authCode });
    return axiosClient.post<ILoginWithGoogleRequestParam>(url, requestBody);
  };

  export const verifyToken = (params: IVerifyTokenRequestParam) => {
    const url = "/user/verify-token";
    const requestBody = JSON.stringify({ token: params.token });
    return axiosClient.post<IVerifyTokenRequestParam>(url, requestBody);
  };

  export const verifyEmail = (params: IVerifyEmailRequestParam) => {
    const url = "/user/verify-email";
    const requestBody = JSON.stringify({ email: params.email });
    return axiosClient.post<IVerifyEmailRequestParam>(url, requestBody);
  };
}

export default AuthAPI;
