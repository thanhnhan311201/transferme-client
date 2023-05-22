import axiosClient from "./axiosClient";

// interface IProfile {
//   email: string;
//   family_name: string;
//   given_name: string;
//   id: string;
//   locale: string;
//   name: string;
//   picture: string;
//   verified_email: boolean;
// }

interface IAuthResponse {
  status: string;
  code: number;
  token: string;
  user: { email: string; name: string; id: string; picture: string };
}

namespace AuthAPI {
  export const login = (userLoginInfo: { email: string; password: string }) => {
    const url = "/user/login";
    const requestBody = JSON.stringify(userLoginInfo);
    return axiosClient.post<any, IAuthResponse>(url, requestBody);
  };

  export const signup = (userSignupInfo: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }) => {
    const url = "/user/signup";
    const requestBody = JSON.stringify(userSignupInfo);
    return axiosClient.post(url, requestBody);
  };

  export const loginWithGoogle = (authCode: string) => {
    const url = "/user/google";
    const requestBody = JSON.stringify({ authCode: authCode });
    return axiosClient.post<any, IAuthResponse>(url, requestBody);
  };

  export const verifyToken = (token: string) => {
    const url = "/user/verify-token";
    const requestBody = JSON.stringify({ token: token });
    return axiosClient.post<any, IAuthResponse>(url, requestBody);
  };
}

export default AuthAPI;
