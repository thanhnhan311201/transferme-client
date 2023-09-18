import { useCallback, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import socketClient from "../../../socket";

import { RootState } from "../../../states";
import { loginActions } from "../slice/loginSlice";
import { signupActions } from "../slice/signupSlice";

import LoginForm from "../components/LoginForm";
import { AuthAPI } from "../../../api";
import { authActions } from "../slice/authSlice";
import { useGoogleLoginSuccess } from "../hooks";
import { useInput } from "../hooks";
import { ValidationType } from "../hooks";

import { GOOGLE_REDIRECT_URI, GITHUB_CLIENT_ID } from "../../../config";
import { transferActions } from "../../transfer/slice/transferSlice";

const Login: React.FC = () => {
  const isProcessLogin = useSelector(
    (state: RootState) => state.login.loginStatus
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSuccess = useGoogleLoginSuccess();

  useEffect(() => {
    dispatch(loginActions.setNotLogin());
    dispatch(signupActions.setNotSignup());

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    console.log(codeParam);
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

        dispatch(loginActions.processLogin());

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

        dispatch(loginActions.setLoginSuccess());

        socketClient.connect();
        dispatch(authActions.setAuthenticated(response.user));
        dispatch(transferActions.availableToTransfer());
        navigate("/transfer");
      } catch (error) {
        email.inputRef.current!.focus();
        dispatch(loginActions.setLoginFail());
      }
    },
    [email, password]
  );

  return (
    <LoginForm
      email={email}
      password={password}
      onGoogleLogin={handleGoogleLogin}
      onGitHubLogin={handleGitHubLogin}
      onLogin={handleLogin}
      isProcessLogin={isProcessLogin}
    />
  );
};

export default Login;
