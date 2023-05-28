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

import { REDIRECT_URI } from "../../../config";
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
  }, []);

  const email = useInput(ValidationType.IS_EMAIL_VALID);
  const password = useInput(ValidationType.IS_PASSWORD_VALID);

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: (error) => console.log("Login Failed:", error),
    flow: "auth-code",
    redirect_uri: REDIRECT_URI,
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
      onLogin={handleLogin}
      isProcessLogin={isProcessLogin}
    />
  );
};

export default Login;
