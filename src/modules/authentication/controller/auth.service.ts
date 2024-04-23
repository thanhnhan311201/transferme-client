import axiosClient from "@/api/axiosClient";
import {
  ISigninRequestParam,
  ISigninWithFacebookRequestParam,
  ISigninWithGitHubRequestParam,
  ISigninWithGoogleRequestParam,
  ISignUpRequestParam,
  IVerifyEmailRequestParam,
  IVerifyTokenRequestParam,
} from "../types/requestParam.interface";
import {
  ISignupResponseParam,
  ISigninWithGoogleResponseParam,
  ISigninResponseParam,
  IVerifyEmailResponseParam,
  IVerifyTokenResponseParam,
  ICommonResponse,
  ISigninWithGitHubResponseParam,
  ISigninWithFacebookResponseParam,
} from "../types/responseParam.interface";

namespace AuthAPI {
  export const siginin = (params: ISigninRequestParam) => {
    const url = "/auth/signin";
    return axiosClient.post<any, ISigninResponseParam>(url, params);
  };

  export const signup = (params: ISignUpRequestParam) => {
    const url = "/auth/signup";
    return axiosClient.post<any, ISignupResponseParam>(url, params);
  };

  export const signinWithGoogle = (params: ISigninWithGoogleRequestParam) => {
    const url = "/auth/google";
    return axiosClient.post<any, ISigninWithGoogleResponseParam>(url, params);
  };

  export const verifyToken = (params: IVerifyTokenRequestParam) => {
    const url = "/auth/verify-token";
    return axiosClient.post<any, IVerifyTokenResponseParam>(url, params);
  };

  export const verifyEmail = (params: IVerifyEmailRequestParam) => {
    const url = "/auth/verify-email";
    return axiosClient.post<any, IVerifyEmailResponseParam>(url, params);
  };

  export const signinWithGithub = (params: ISigninWithGitHubRequestParam) => {
    const url = "/auth/github";
    return axiosClient.post<any, ISigninWithGitHubResponseParam>(url, params);
  };

  export const signinWithFacebook = (
    params: ISigninWithFacebookRequestParam
  ) => {
    const url = "/auth/facebook";
    return axiosClient.post<any, ISigninWithFacebookResponseParam>(url, params);
  };

  export const signout = () => {
    const url = "/auth/signout";
    return axiosClient.post<any, ICommonResponse>(url);
  };
}

export default AuthAPI;
