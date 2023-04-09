import { useCallback } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import RegisterForm from "../components/RegisterForm";
import { AuthAPI } from "../../../api";
import { useGoogleLoginSuccess } from "../hooks";
import { useInput } from "../hooks";

import { REDIRECT_URI } from "../../../config";

const Register: React.FC = () => {
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
  const {
    value: confirmPasswordValue,
    handleValueChange: handleConfirmPasswordChange,
    reset: resetConfirmPassword,
  } = useInput();

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: handleSuccess,
    onError: (error) => console.log("Login Failed:", error),
    flow: "auth-code",
    redirect_uri: REDIRECT_URI,
  });

  const handleSignup = useCallback(() => {
    const signup = async () => {
      try {
        const response = await AuthAPI.signup({
          email: emailValue,
          password: passwordValue,
          confirmPassword: confirmPasswordValue,
        });
        console.log(response);
        navigate("/auth/login");
      } catch (error) {
        console.log(error);
      }
    };
    signup();
  }, [emailValue, passwordValue, confirmPasswordValue, navigate]);

  return (
    <RegisterForm
      email={emailValue}
      onHandleEmail={handleEmailChange}
      password={passwordValue}
      onHandlePassword={handlePasswordChange}
      confirmPassword={confirmPasswordValue}
      onHandleConfirmPassword={handleConfirmPasswordChange}
      onSignup={handleSignup}
      onGoogleLogin={handleGoogleLogin}
    />
  );
};

export default Register;
