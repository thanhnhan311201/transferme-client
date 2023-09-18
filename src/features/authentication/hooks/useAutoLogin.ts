import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authActions } from "../slice/authSlice";

import socketClient from "../../../socket";

import { AuthAPI } from "../../../api/";
import { transferActions } from "../../transfer/slice/transferSlice";

const useAutoLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useCallback(async () => {
    try {
      dispatch(authActions.setUnauthenticating());
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
          return dispatch(authActions.setUnauthenticated());
        }

        dispatch(authActions.setAuthenticated(response.user));
        dispatch(transferActions.availableToTransfer());
        socketClient.connect();
        navigate("/transfer");
      } else {
        dispatch(authActions.setUnauthenticated());
        document.cookie = `access_token= ; expires= ${new Date(
          new Date().getTime()
        ).toUTCString()}`;
        document.cookie = `user_id= ; expires= ${new Date(
          new Date().getTime()
        ).toUTCString()}`;
      }
    } catch (error) {
      console.log(error);
      dispatch(authActions.setUnauthenticated());
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
