import RegisterForm from "../components/RegisterForm";
import {
  GoogleLogin,
  CredentialResponse,
  useGoogleLogin,
} from "@react-oauth/google";

const Register: React.FC = () => {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => console.log(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });
  return <RegisterForm onLogin={login} />;
};

export default Register;
