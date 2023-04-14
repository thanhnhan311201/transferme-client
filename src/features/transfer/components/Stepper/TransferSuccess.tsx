import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { IconContext } from "react-icons";
import { FiCheckCircle } from "react-icons/fi";
import { BiTransferAlt } from "react-icons/bi";

const TransferSuccess: React.FC<{ onHandleReset: () => void }> = (props) => {
  return (
    <Paper
      square
      elevation={0}
      sx={{
        p: 3,
        marginTop: "1rem",
        backgroundColor: "#fff",
        boxShadow: "rgba(149, 157, 165, 0.4) 0px 8px 24px",
        borderRadius: "0.5rem",
      }}
    >
      <Box
        sx={{
          padding: "0 1rem",
          display: "flex",
          gap: "0.75rem",
          marginBottom: "1rem",
        }}
      >
        <IconContext.Provider
          value={{
            style: {
              width: "1.25rem",
              height: "1.25rem",
              color: "#4caf50",
              marginTop: "0.125rem",
            },
          }}
        >
          <FiCheckCircle />
        </IconContext.Provider>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
        >
          <p className="text-4caf50 text-base font-medium">Success</p>
          <p className="text-sm">
            Your file has been transferred successfully!
          </p>
        </Box>
      </Box>
      <Button
        sx={{
          width: "100%",
          textAlign: "center",
          backgroundColor: "#1976d2",
          color: "#fff",
          borderRadius: "8px",
          "&:hover": {
            backgroundColor: "#fff",
            color: "#1976d2",
            boxShadow:
              "0 4px 8px 3px rgba(0, 0, 0, .15), 0 1px 3px rgba(0, 0, 0, .3)",
          },
          display: "flex",
          gap: "1rem",
        }}
        onClick={props.onHandleReset}
      >
        <IconContext.Provider
          value={{
            style: {
              width: "1rem",
              height: "1rem",
            },
          }}
        >
          <BiTransferAlt />
        </IconContext.Provider>
        Transfer more files
      </Button>
    </Paper>
  );
};

export default TransferSuccess;
