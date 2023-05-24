import { useCallback, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

import RegisterForm from "../components/RegisterForm";

import { AuthAPI } from "../../../api";

import { useGoogleLoginSuccess } from "../hooks";
import { useInput } from "../hooks";
import { ValidationType } from "../hooks";

import { REDIRECT_URI } from "../../../config";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const handleSuccess = useGoogleLoginSuccess();

  const email = useInput(ValidationType.IS_EMAIL_VALID);
  const username = useInput(ValidationType.REQUIRED);
  const password = useInput(ValidationType.IS_PASSWORD_VALID);
  const cfmPassword = useInput(ValidationType.IS_PASSWORD_MATCH, {
    password: password.value,
  });

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: (error) => console.log("Login Failed:", error),
    flow: "auth-code",
    redirect_uri: REDIRECT_URI,
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
          email.inputRef.current!.focus();
        }

        // const response = await AuthAPI.signup({
        //   email: email.value,
        //   username: username.value,
        //   password: password.value,
        //   confirmPassword: cfmPassword.value,
        // });
        // console.log(response);
        // navigate("/auth/login");
      } catch (error) {
        console.log(error);
      }
    },
    [email, username, password, cfmPassword, navigate]
  );

  return (
    <RegisterForm
      email={email}
      username={username}
      password={password}
      confirmPassword={cfmPassword}
      onSignup={handleSignup}
      onGoogleLogin={handleGoogleLogin}
    />
  );
};

export default Register;
