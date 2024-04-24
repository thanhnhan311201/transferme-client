import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/store";
import socketClient from "@/socket";
import {
  setUnauthenticated,
  setUnauthenticating,
  setAuthenticated,
} from "../controller/auth.slice";
import { availableToTransfer } from "@/modules/transfer/controller/transfer.slice";
import AuthAPI from "../controller/auth.service";

import { removeCredentialToken } from "../utils";
import { getCookieValue } from "@/utils";
import { accessTokenStorage } from "@/utils/JWTStorage";

const useAutoSignin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useCallback(async () => {
    try {
      dispatch(setUnauthenticating());
      const accessToken = accessTokenStorage.get()
      if (accessToken) {
        const response = await AuthAPI.verifyToken({ token: accessToken });
        if (!response || response.status === "error") {
          removeCredentialToken()
          return dispatch(setUnauthenticated());
        }

        dispatch(setAuthenticated());
        dispatch(availableToTransfer());
        socketClient.connect({
          token: response.data.accessToken,
        });
        navigate("/transfer");
      } else {
        dispatch(setUnauthenticated());
        removeCredentialToken()
      }
    } catch (error) {
      dispatch(setUnauthenticated());
      removeCredentialToken()
    }
  }, [dispatch, navigate]);
};

export default useAutoSignin;
