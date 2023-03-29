import { AxiosResponse } from "axios";
import axiosClient from ".";

namespace AuthenticationAPI {
  export const login = (userLoginInfo: { email: string; password: string }) => {
    const url = "/auth/login";
    const requestBody = JSON.stringify(userLoginInfo);
    return axiosClient.post<any, { user: any; token: string }>(
      url,
      requestBody
    );
  };
}

export default AuthenticationAPI;
