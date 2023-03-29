import ResetTokenForm from "../components/ResetTokenForm";
import {
  GoogleLogin,
  CredentialResponse,
  useGoogleLogin,
} from "@react-oauth/google";

const ResetToken: React.FC = () => {
  return <ResetTokenForm />;
};

export default ResetToken;
