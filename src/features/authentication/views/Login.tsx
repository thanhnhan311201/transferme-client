import LoginForm from "../components/LoginForm";
import {
  GoogleLogin,
  CredentialResponse,
  TokenResponse,
  useGoogleLogin,
} from "@react-oauth/google";
import { useState, useEffect, useCallback } from "react";

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
      console.log(data);
      setProfile(data);
    }
  }, [user]);

  useEffect(() => {
    fetchUserInfo();
  }, [fetchUserInfo]);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });
  return <LoginForm onLogin={login} />;
};

export default Login;
