import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CodeResponse } from "@react-oauth/google";

import { AuthAPI } from "../../../api";
import { authActions } from "../slice/authSlice";

import socketClient from "../../../socket";

import { TOKEN_EXPIRATION_TIME } from "../../../config";
import { transferActions } from "../../transfer/slice/transferSlice";

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
      document.cookie = `access_token=${response.token}; expires= ${new Date(
        new Date().getTime() + TOKEN_EXPIRATION_TIME * 1000
      ).toUTCString()}`;
      document.cookie = `user_id=${response.user.id}; expires= ${new Date(
        new Date().getTime() + TOKEN_EXPIRATION_TIME * 1000
      ).toUTCString()}`;
      dispatch(
        authActions.setAuthenticated({
          id: response.user.id,
          email: response.user.email,
          name: response.user.name,
          picture: response.user.picture,
        })
      );
      dispatch(transferActions.availableToTransfer());
      socketClient.connect();
      navigate("/transfer");
    } catch (error) {
      console.log(error);
    }
  };
};

export default useGoogleLoginSuccess;
