import React from "react";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const SignupFail: React.FC<{
  onClose: () => void;
}> = (props) => {
  return (
    <Alert
      severity="error"
      onClose={props.onClose}
      sx={{ borderRadius: "10px" }}
    >
      <AlertTitle>Error!</AlertTitle>
      That was an error during your account creation. Please double check your
      input fields and try again.
    </Alert>
  );
};

export default SignupFail;
