import axiosClient from "@/api/axiosClient";
import {
  ILoginRequestParam,
  ILoginWithGoogleRequestParam,
  ISignUpRequestParam,
  IVerifyEmailRequestParam,
  IVerifyTokenRequestParam,
} from "../types/requestParam.interface";
import {
  ISignupResponseParam,
  ILoginWithGoogleResponseParam,
  ILoginResponseParam,
  IVerifyEmailResponseParam,
  IVerifyTokenResponseParam,
} from "../types/responseParam.interface";

namespace AuthAPI {
  export const login = (params: ILoginRequestParam) => {
    const url = "/auth/signin";
    const requestBody = JSON.stringify(params);

    return axiosClient.post<ILoginResponseParam>(url, requestBody);
  };

  export const signup = (params: ISignUpRequestParam) => {
    const url = "/auth/signup";
    const requestBody = JSON.stringify(params);
    return axiosClient.post<ISignupResponseParam>(url, requestBody);
  };

  export const loginWithGoogle = (params: ILoginWithGoogleRequestParam) => {
    const url = "/auth/google";
    const requestBody = JSON.stringify({ authCode: params.authCode });
    return axiosClient.post<ILoginWithGoogleResponseParam>(url, requestBody);
  };

  export const verifyToken = (params: IVerifyTokenRequestParam) => {
    const url = "/auth/verify-token";
    const requestBody = JSON.stringify({ token: params.token });
    return axiosClient.post<IVerifyTokenResponseParam>(url, requestBody);
  };

  export const verifyEmail = (params: IVerifyEmailRequestParam) => {
    const url = "/auth/verify-email";
    const requestBody = JSON.stringify({ email: params.email });
    return axiosClient.post<IVerifyEmailResponseParam>(url, requestBody);
  };
}

export default AuthAPI;
