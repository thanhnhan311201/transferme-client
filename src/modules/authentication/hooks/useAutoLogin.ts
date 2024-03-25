import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/states";
import socketClient from "@/socket";
import {
  setUnauthenticated,
  setUnauthenticating,
  setAuthenticated,
} from "../controller/auth.slice";
import { availableToTransfer } from "@/modules/transfer/controller/transfer.slice";
import { verifyToken } from "../controller/auth.action";

const useAutoLogin = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useCallback(async () => {
    try {
      dispatch(setUnauthenticating());
      const allCookies: string[] = document.cookie.split(";");
      const tokenCookie: string | undefined = allCookies.find((cookie) =>
        cookie.trim().startsWith("access_token")
      );
      if (tokenCookie) {
        const accessToken = tokenCookie.split("=")[1];
        const response = await dispatch(
          verifyToken({ token: accessToken })
        ).unwrap();

        if (!response) {
          document.cookie = `access_token= ; expires= ${new Date(
            new Date().getTime()
          ).toUTCString()}`;
          document.cookie = `user_id= ; expires= ${new Date(
            new Date().getTime()
          ).toUTCString()}`;
          return dispatch(setUnauthenticated());
        }

        dispatch(setAuthenticated(response.data.user));
        dispatch(availableToTransfer());
        socketClient.connect({
          token: response.data.token,
        });
        navigate("/transfer");
      } else {
        dispatch(setUnauthenticated());
        document.cookie = `access_token= ; expires= ${new Date(
          new Date().getTime()
        ).toUTCString()}`;
        document.cookie = `user_id= ; expires= ${new Date(
          new Date().getTime()
        ).toUTCString()}`;
      }
    } catch (error) {
      dispatch(setUnauthenticated());
      document.cookie = `access_token= ; expires= ${new Date(
        new Date().getTime()
      ).toUTCString()}`;
      document.cookie = `user_id= ; expires= ${new Date(
        new Date().getTime()
      ).toUTCString()}`;
    }
  }, [dispatch, navigate]);
};

export default useAutoLogin;
