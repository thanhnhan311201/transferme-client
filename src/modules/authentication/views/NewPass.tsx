import NewPassForm from "../components/Forms/NewPassForm";

import AuthLayout from "../components/Layout";

const NewPass: React.FC = () => {
  return (
    <AuthLayout>
      <NewPassForm />;
    </AuthLayout>
  );
};

export default NewPass;
