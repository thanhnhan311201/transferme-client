import React from "react";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { IconContext } from "react-icons";
import { MdOutlineErrorOutline } from "react-icons/md";
import { TbReload } from "react-icons/tb";
import { ImCancelCircle } from "react-icons/im";

const TransferError: React.FC<{onHandleNext: () => void}> = (props) => {
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
              color: "#b91c1c",
              marginTop: "0.125rem",
            },
          }}
        >
          <MdOutlineErrorOutline />
        </IconContext.Provider>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
        >
          <p className="text-red-700 text-base font-medium">Error</p>
          <p className="text-sm">Your file has been transferred failed!</p>
        </Box>
      </Box>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, minmax(0, 1fr));",
          gap: "1rem",
        }}
      >
        <Button
          sx={{
            textAlign: "center",
            color: "#b91c1c",
            borderRadius: "8px",
            "&:hover": {
              backgroundColor: "#fff",
              boxShadow:
                "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)",
            },
            display: "flex",
            gap: "1rem",
          }}
        >
          <IconContext.Provider
            value={{
              style: {
                width: "1rem",
                height: "1rem",
              },
            }}
          >
            <ImCancelCircle />
          </IconContext.Provider>
          Cancel
        </Button>
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
        >
          <IconContext.Provider
            value={{
              style: {
                width: "1rem",
                height: "1rem",
              },
            }}
          >
            <TbReload />
          </IconContext.Provider>
          Transfer again
        </Button>
      </Box>
    </Paper>
  );
};

export default TransferError;
