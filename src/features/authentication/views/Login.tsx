import { useState, useEffect, useCallback } from "react";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import LoginForm from "../components/LoginForm";
import useInput from "../hooks/useInput";
import AuthenticationAPI from "../../../api/authAPI";
import { authActions } from "../slice/authSlice";

interface IProfile {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  locale: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

const Login: React.FC = () => {
  const [user, setUser] = useState<TokenResponse>();
  const [profile, setProfile] = useState<IProfile>();

  const dispatch = useDispatch();

  const navigate = useNavigate();

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

  const fetchUserInfo = useCallback(async () => {
    if (user) {
      const response = await fetch(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${user.access_token}`,
            Accept: "application/json",
          },
        }
      );
      const data = await response.json();
      setProfile(data);
    }
  }, [user]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  const handleLogin = () => {
    const login = async () => {
      try {
        const response = await AuthenticationAPI.login({
          email: emailValue,
          password: passwordValue,
        });
        document.cookie = `accessToken=${response.token}; userId=${response.user.id}`;
        dispatch(authActions.setAuthenticated(response.user));
        navigate("/transfer");
      } catch (error) {
        console.log(error);
      }
    };
    login();
  };

  return (
    <LoginForm
      email={emailValue}
      onHandleEmail={handleEmailChange}
      password={passwordValue}
      onHandlePassword={handlePasswordChange}
      onGoogleLogin={loginWithGoogle}
      onLogin={handleLogin}
    />
  );
};

export default Login;
