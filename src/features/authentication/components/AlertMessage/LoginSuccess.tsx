import React from "react";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

const LoginSuccess: React.FC<{
  onClose: () => void;
}> = (props) => {
  return (
    <Alert
      severity="success"
      onClose={props.onClose}
      sx={{ borderRadius: "10px" }}
    >
      <AlertTitle>Success!</AlertTitle>
      Login successfully.
    </Alert>
  );
};

export default LoginSuccess;
