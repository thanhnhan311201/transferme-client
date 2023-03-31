import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { authActions } from "../slice/authSlice";

import AuthenticationAPI from "../../../api/authAPI";

const useAutoLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useCallback(async () => {
    const allCookies: string[] = document.cookie.split(";");
    const tokenCookie: string | undefined = allCookies.find((cookie) =>
      cookie.trim().startsWith("accessToken")
    );
    if (tokenCookie) {
      const accessToken = tokenCookie.split("=")[1];
      const response = await AuthenticationAPI.verifyToken(accessToken);

      dispatch(authActions.setAuthenticated(response.user));
      navigate("/transfer");
    } else {
      console.log("Not authenticated.");
    }
  }, [dispatch, navigate]);
};

export default useAutoLogin;
