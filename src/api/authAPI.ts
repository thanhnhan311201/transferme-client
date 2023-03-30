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

namespace AuthenticationAPI {
  export const login = (userLoginInfo: { email: string; password: string }) => {
    const url = "/auth/login";
    const requestBody = JSON.stringify(userLoginInfo);
    return axiosClient.post<any, { user: any; token: string }>(
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

  export const getGoogleUserInfo = (
    params: { [key: string]: string },
    headers: Record<string, string>
  ) => {
    const url = "/userinfo";
    return axiosClient.get<any, IProfile>(url, {
      baseURL: "https://www.googleapis.com/oauth2/v1",
      headers: { ...headers },
      params,
    });
  };
}

export default AuthenticationAPI;
