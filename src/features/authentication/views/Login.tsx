import { useCallback } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import socketClient from "../../../socket";

import LoginForm from "../components/LoginForm";
import { AuthAPI } from "../../../api";
import { authActions } from "../slice/authSlice";
import { useGoogleLoginSuccess } from "../hooks";
import { useInput } from "../hooks";
import { ValidationType } from "../hooks";

import { REDIRECT_URI } from "../../../config";
import { transferActions } from "../../transfer/slice/transferSlice";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSuccess = useGoogleLoginSuccess();

  const email = useInput(ValidationType.IS_EMAIL_VALID);
  const password = useInput(ValidationType.IS_PASSWORD_VALID);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: (error) => console.log("Login Failed:", error),
    flow: "auth-code",
    redirect_uri: REDIRECT_URI,
  });

  const handleLogin = useCallback(async () => {
    try {
      const response = await AuthAPI.login({
        email: email.value,
        password: password.value,
      });
      document.cookie = `access_token=${response.token}; expires= ${new Date(
        new Date().getTime() + 3599 * 1000
      ).toUTCString()}`;
      document.cookie = `user_id=${response.user.id}; expires= ${new Date(
        new Date().getTime() + 3599 * 1000
      ).toUTCString()}`;

      // TODO: save
      // jwtStorage.set();

      socketClient.connect();
      dispatch(authActions.setAuthenticated(response.user));
      dispatch(transferActions.availableToTransfer());
      navigate("/transfer");
    } catch (error) {
      console.log(error);
    }
  }, [email.value, password.value, dispatch, navigate]);

  return (
    <LoginForm
      email={email}
      password={password}
      onGoogleLogin={handleGoogleLogin}
      onLogin={handleLogin}
    />
  );
};

export default Login;
