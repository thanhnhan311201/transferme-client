import { useNavigate } from "react-router-dom";

import { CodeResponse } from "@react-oauth/google";

import { useAppDispatch } from "@/states";
import { setAuthenticated } from "../controller/auth.slice";
import socketClient from "@/socket";
import { availableToTransfer } from "@/modules/transfer/controller/transfer.slice";
import { loginWithGoogle } from "../controller/auth.action";

import { TOKEN_EXPIRATION_TIME } from "@/config";
import { PROMISE_STATUS } from "@/types/common.type";
import { ILoginWithGoogleResponseParam } from "../types/responseParam.interface";

const useGoogleLoginSuccess = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return async (
    codeResponse: Omit<
      CodeResponse,
      "error" | "error_description" | "error_uri"
    >
  ) => {
    try {
      const response = await dispatch(
        loginWithGoogle({ authCode: codeResponse.code })
      ).unwrap();

      if (response) {
        document.cookie = `access_token=${
          response.data.token
        }; expires= ${new Date(
          new Date().getTime() + TOKEN_EXPIRATION_TIME * 1000
        ).toUTCString()}`;
        document.cookie = `user_id=${
          response.data.user.id
        }; expires= ${new Date(
          new Date().getTime() + TOKEN_EXPIRATION_TIME * 1000
        ).toUTCString()}`;
        dispatch(
          setAuthenticated({
            id: response.data.user.id,
            email: response.data.user.email,
            name: response.data.user.name,
            picture: response.data.user.picture,
          })
        );
        dispatch(availableToTransfer());
        socketClient.connect({
          token: response.data.token,
        });
        navigate("/transfer");
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export default useGoogleLoginSuccess;
