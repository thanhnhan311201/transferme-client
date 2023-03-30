import { useCallback } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import LoginForm from "../components/LoginForm";
import useInput from "../hooks/useInput";
import AuthenticationAPI from "../../../api/authAPI";
import { authActions } from "../slice/authSlice";
import useGoogleLoginSuccess from "../hooks/useGoogleLoginSuccess";

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
  });

  const handleLogin = useCallback(() => {
    const login = async () => {
      try {
        const response = await AuthenticationAPI.login({
          email: emailValue,
          password: passwordValue,
        });
        document.cookie = `accessToken=${response.token}; expires= ${new Date(
          new Date().getTime() + 3600 * 1000
        ).toUTCString()}`;
        document.cookie = `userId=${response.user.id}; expires= ${new Date(
          new Date().getTime() + 3600 * 1000
        ).toUTCString()}`;

        dispatch(authActions.setAuthenticated(response.user));
        navigate("/transfer");
      } catch (error) {
        console.log(error);
      }
    };
    login();
  }, [emailValue, passwordValue]);

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
