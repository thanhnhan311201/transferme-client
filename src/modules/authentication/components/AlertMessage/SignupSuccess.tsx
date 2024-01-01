import React from "react";

import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const SignupSuccess: React.FC<{
  onNavigateLoginPage: () => void;
  onClose: () => void;
}> = (props) => {
  return (
    <Alert
      severity="success"
      onClose={props.onClose}
      sx={{ borderRadius: "10px" }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: ".5rem",
        }}
      >
        <AlertTitle>Success!</AlertTitle>
        Your account has been successfully created.
        <Button
          sx={{ alignSelf: "end", borderRadius: "10px" }}
          color="inherit"
          onClick={props.onNavigateLoginPage}
        >
          GO TO LOGIN PAGE
        </Button>
      </Box>
    </Alert>
  );
};

export default SignupSuccess;
