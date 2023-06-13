import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGoogleLogin } from "@react-oauth/google";

import RegisterForm from "../components/RegisterForm";

import { AuthAPI } from "../../../api";

import { RootState } from "../../../states";
import { loginActions } from "../slice/loginSlice";
import { signupActions } from "../slice/signupSlice";

import { useGoogleLoginSuccess } from "../hooks";
import { useInput } from "../hooks";
import { ValidationType } from "../hooks";

import { GOOGLE_REDIRECT_URI, GITHUB_CLIENT_ID } from "../../../config";

const Register: React.FC = () => {
  const handleSuccess = useGoogleLoginSuccess();

  const isProcessSignup = useSelector(
    (state: RootState) => state.signup.signupStatus
  );
  const dispatch = useDispatch();

  const email = useInput(ValidationType.IS_EMAIL_VALID, {
    isCheckEmailExist: true,
  });
  const username = useInput(ValidationType.REQUIRED);
  const password = useInput(ValidationType.IS_PASSWORD_VALID);
  const cfmPassword = useInput(ValidationType.IS_PASSWORD_MATCH, {
    password: password.value,
  });

  useEffect(() => {
    dispatch(loginActions.setNotLogin());
    dispatch(signupActions.setNotSignup());
  }, [dispatch]);

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

  const handleSignup = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      try {
        e.preventDefault();

        email.setIsTouched();
        username.setIsTouched();
        password.setIsTouched();
        cfmPassword.setIsTouched();

        if (
          !email.isValid ||
          !username.isValid ||
          !password.isValid ||
          !cfmPassword.isValid
        ) {
          if (!username.isValid) {
            username.inputRef.current!.focus();
          } else if (!email.isValid) {
            email.inputRef.current!.focus();
          } else if (!password.isValid) {
            password.inputRef.current!.focus();
          } else if (!cfmPassword.isValid) {
            cfmPassword.inputRef.current!.focus();
          }
          return;
        }

        dispatch(signupActions.processSignup());

        const response = await AuthAPI.signup({
          email: email.value,
          username: username.value,
          password: password.value,
          confirmPassword: cfmPassword.value,
        });
        if (response.code === 201) {
          dispatch(signupActions.setSignupSuccess());
          email.resetValue();
          username.resetValue();
          password.resetValue();
          cfmPassword.resetValue();
        }
      } catch (error: any) {
        dispatch(signupActions.setSignupFail());
      }
    },
    [email, username, password, cfmPassword]
  );

  return (
    <RegisterForm
      email={email}
      username={username}
      password={password}
      confirmPassword={cfmPassword}
      onSignup={handleSignup}
      onGoogleLogin={handleGoogleLogin}
      onGitHubLogin={handleGitHubLogin}
      isProcessSignup={isProcessSignup}
    />
  );
};

export default Register;
