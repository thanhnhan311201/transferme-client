import NewPassForm from "../components/NewPassForm";
import {
  GoogleLogin,
  CredentialResponse,
  useGoogleLogin,
} from "@react-oauth/google";

const NewPass: React.FC = () => {
  return <NewPassForm />;
};

export default NewPass;
