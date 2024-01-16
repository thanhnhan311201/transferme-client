import { useCallback, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import socketClient from "@/socket";

import { AuthAPI } from "@/api";
import { useAppSelector, useAppDispatch } from "@/states";
import { availableToTransfer } from "@/modules/transfer/controller/transfer.slice";
import { useGoogleLoginSuccess } from "../hooks";
import { useInput } from "../hooks";
import { ValidationType } from "../hooks";
import {
  setIdleStatusLogin,
  setIdleStatusSignup,
  processLogin,
  setLoginSuccess,
  setLoginFail,
  setAuthenticated,
} from "../controller/auth.slice";

import LoginForm from "../components/Forms/LoginForm";
import AuthLayout from "../components/Layout";

import { GOOGLE_REDIRECT_URI, GITHUB_CLIENT_ID } from "@/config";

const Login: React.FC = () => {
  const { loginStatus } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSuccess = useGoogleLoginSuccess();

  useEffect(() => {
    dispatch(setIdleStatusLogin());
    dispatch(setIdleStatusSignup());

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
  }, [dispatch]);

  const email = useInput(ValidationType.IS_EMAIL_VALID);
  const password = useInput(ValidationType.IS_PASSWORD_VALID);

  const handleGitHubLogin = useCallback(() => {
    localStorage.setItem("loginWith", "GitHub");
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}`
    );
  }, []);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: (error) => console.log("Login Failed:", error),
    flow: "auth-code",
    redirect_uri: GOOGLE_REDIRECT_URI,
  });

  const handleLogin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();

        email.setIsTouched();
        password.setIsTouched();

        if (!email.isValid || !password.isValid) {
          if (!email.isValid) {
            email.inputRef.current!.focus();
          } else if (!password.isValid) {
            password.inputRef.current!.focus();
          }
          return;
        }

        dispatch(processLogin());

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

        dispatch(setLoginSuccess());

        socketClient.connect({ token: response.token });
        dispatch(setAuthenticated(response.user));
        dispatch(availableToTransfer());
        navigate("/transfer");
      } catch (error) {
        email.inputRef.current!.focus();
        dispatch(setLoginFail());
      }
    },
    [email, password]
  );

  return (
    <AuthLayout>
      <LoginForm
        email={email}
        password={password}
        onGoogleLogin={handleGoogleLogin}
        onGitHubLogin={handleGitHubLogin}
        onLogin={handleLogin}
        loginStatus={loginStatus}
      />
    </AuthLayout>
  );
};

export default Login;
