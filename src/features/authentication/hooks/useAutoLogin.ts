import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authActions } from "../slice/authSlice";

import socketClient from "../../../socket";

import { AuthAPI } from "../../../api/";

const useAutoLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useCallback(async () => {
    try {
      dispatch(authActions.setUnauthenticating());
      const allCookies: string[] = document.cookie.split(";");
      const tokenCookie: string | undefined = allCookies.find((cookie) =>
        cookie.trim().startsWith("accessToken")
      );
      if (tokenCookie) {
        const accessToken = tokenCookie.split("=")[1];
        const response = await AuthAPI.verifyToken(accessToken);

        if (!(response.code === 200 && response.status === "success")) {
          document.cookie = `accessToken= ; expires= ${new Date(
            new Date().getTime()
          ).toUTCString()}`;
          document.cookie = `userId= ; expires= ${new Date(
            new Date().getTime()
          ).toUTCString()}`;
          return dispatch(authActions.setUnauthenticated());
        }

        dispatch(authActions.setAuthenticated(response.user));
        socketClient.connect();
        navigate("/transfer");
      } else {
        dispatch(authActions.setUnauthenticated());
        document.cookie = `accessToken= ; expires= ${new Date(
          new Date().getTime()
        ).toUTCString()}`;
        document.cookie = `userId= ; expires= ${new Date(
          new Date().getTime()
        ).toUTCString()}`;
        console.log("Not authenticated.");
      }
    } catch (error) {
      console.log(error);
      dispatch(authActions.setUnauthenticated());
      document.cookie = `accessToken= ; expires= ${new Date(
        new Date().getTime()
      ).toUTCString()}`;
      document.cookie = `userId= ; expires= ${new Date(
        new Date().getTime()
      ).toUTCString()}`;
    }
  }, []);
};

export default useAutoLogin;
