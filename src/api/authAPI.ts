import axiosClient from ".";

interface IProfile {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

interface IUserInfoResponse {
  email: string;
  name: string;
  id: string;
  picture: string;
}

namespace AuthenticationAPI {
  export const login = (userLoginInfo: { email: string; password: string }) => {
    const url = "/auth/login";
    const requestBody = JSON.stringify(userLoginInfo);
    return axiosClient.post<any, { user: IUserInfoResponse; token: string }>(
      url,
      requestBody
    );
  };

  export const signup = (userSignupInfo: {
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    const url = "/auth/signup";
    const requestBody = JSON.stringify(userSignupInfo);
    return axiosClient.post(url, requestBody);
  };

  export const loginWithGoogle = (authCode: string) => {
    const url = "/auth/google";
    const requestBody = JSON.stringify({ authCode: authCode });
    return axiosClient.post<any, { user: IUserInfoResponse; token: string }>(
      url,
      requestBody
    );
  };

  export const verifyToken = (token: string) => {
    const url = "/auth/verify-token";
    const requestBody = JSON.stringify({ token: token });
    return axiosClient.post<any, { user: IUserInfoResponse; message: string }>(
      url,
      requestBody
    );
  };
}

export default AuthenticationAPI;
