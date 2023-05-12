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

import { REDIRECT_URI } from "../../../config";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSuccess = useGoogleLoginSuccess();

  const {
    value: emailValue,
    handleValueChange: handleEmailChange,
    reset: resetEmail,
  } = useInput();
  const {
    value: passwordValue,
    handleValueChange: handlePasswordChange,
    reset: resetPassword,
  } = useInput();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: (error) => console.log("Login Failed:", error),
    flow: "auth-code",
    redirect_uri: REDIRECT_URI,
  });

  const handleLogin = useCallback(() => {
    const login = async () => {
      try {
        const response = await AuthAPI.login({
          email: emailValue,
          password: passwordValue,
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
        navigate("/transfer");
      } catch (error) {
        console.log(error);
      }
    };
    login();
  }, [emailValue, passwordValue, dispatch, navigate]);

  return (
    <LoginForm
      email={emailValue}
      onHandleEmail={handleEmailChange}
      password={passwordValue}
      onHandlePassword={handlePasswordChange}
      onGoogleLogin={handleGoogleLogin}
      onLogin={handleLogin}
    />
  );
};

export default Login;
