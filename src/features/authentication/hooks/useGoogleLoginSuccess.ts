import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TokenResponse } from "@react-oauth/google";

import AuthenticationAPI from "../../../api/authAPI";
import { authActions } from "../slice/authSlice";

const useGoogleLoginSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return async (
    codeResponse: Omit<
      TokenResponse,
      "error" | "error_description" | "error_uri"
    >
  ) => {
    try {
      const params = {
        access_token: codeResponse.access_token,
      };
      const headers = {
        Authorization: `Bearer ${codeResponse.access_token}`,
      };
      const userInfo = await AuthenticationAPI.getGoogleUserInfo(
        params,
        headers
      );

      document.cookie = `accessToken=${
        codeResponse.access_token
      }; expires= ${new Date(
        new Date().getTime() + codeResponse.expires_in * 1000
      ).toUTCString()}`;
      document.cookie = `userId=${userInfo.id}; expires= ${new Date(
        new Date().getTime() + codeResponse.expires_in * 1000
      ).toUTCString()}`;

      dispatch(
        authActions.setAuthenticated({
          id: userInfo.id,
          email: userInfo.email,
          name: userInfo.name,
          picture: userInfo.picture,
        })
      );
      navigate("/transfer");
    } catch (error) {
      console.log(error);
    }
  };
};

export default useGoogleLoginSuccess;
