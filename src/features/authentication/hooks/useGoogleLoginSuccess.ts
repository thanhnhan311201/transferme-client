import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CodeResponse } from "@react-oauth/google";

import { AuthAPI } from "../../../api";
import { authActions } from "../slice/authSlice";
import { socketActions } from "../../transfer/slice/socketSlice";

import { TOKEN_EXPIRATION_TIME } from "../../../config";

const useGoogleLoginSuccess = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return async (
    codeResponse: Omit<
      CodeResponse,
      "error" | "error_description" | "error_uri"
    >
  ) => {
    try {
      const response = await AuthAPI.loginWithGoogle(codeResponse.code);
      document.cookie = `accessToken=${response.token}; expires= ${new Date(
        new Date().getTime() + TOKEN_EXPIRATION_TIME * 1000
      ).toUTCString()}`;
      document.cookie = `userId=${response.user.id}; expires= ${new Date(
        new Date().getTime() + TOKEN_EXPIRATION_TIME * 1000
      ).toUTCString()}`;

      dispatch(socketActions.connect());
      dispatch(
        socketActions.sendData({
          eventName: "login",
          data: "Log in successfully!",
        })
      );
      dispatch(
        authActions.setAuthenticated({
          id: response.user.id,
          email: response.user.email,
          name: response.user.name,
          picture: response.user.picture,
        })
      );
      navigate("/transfer");
    } catch (error) {
      console.log(error);
    }
  };
};

export default useGoogleLoginSuccess;
