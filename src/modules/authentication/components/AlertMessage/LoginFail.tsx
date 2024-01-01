import React from "react";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const LoginFail: React.FC<{
  onClose: () => void;
}> = (props) => {
  return (
    <Alert
      severity="error"
      onClose={props.onClose}
      sx={{ borderRadius: "10px" }}
    >
      <AlertTitle>Error!</AlertTitle>
      That was an error during login. Please double check your email or
      password.
    </Alert>
  );
};

export default LoginFail;
