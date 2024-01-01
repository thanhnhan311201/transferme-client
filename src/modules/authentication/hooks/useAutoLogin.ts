import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch } from "@/states";
import socketClient from "@/socket";
import { setUnauthenticated, setUnauthenticating, setAuthenticated } from "../controller/auth.slice";
import { AuthAPI } from "@/api";
import { transferActions } from "@/modules/transfer/slice/transferSlice";

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
        const response = await AuthAPI.verifyToken(accessToken);

        if (!(response.code === 200 && response.status === "success")) {
          document.cookie = `access_token= ; expires= ${new Date(
            new Date().getTime()
          ).toUTCString()}`;
          document.cookie = `user_id= ; expires= ${new Date(
            new Date().getTime()
          ).toUTCString()}`;
          return dispatch(setUnauthenticated());
        }

        dispatch(setAuthenticated(response.user));
        dispatch(transferActions.availableToTransfer());
        socketClient.connect({ token: response.token });
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
      console.log(error);
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
