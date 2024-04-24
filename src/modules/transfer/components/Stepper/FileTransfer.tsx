import React from "react"

import { motion, AnimatePresence } from "framer-motion";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";
import { BiTransferAlt } from "react-icons/bi";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { IconContext } from "react-icons";

import fileInstance from "../../utils/cache-file";
import { formatFileSize } from "@/utils";

const FileTransfer: React.FC<{
  isStartTransfer: boolean;
  onCancelTransfer: () => void;
}> = (props) => {
  return (
    <React.Fragment>
      <Box
        sx={{
          padding: "1rem 1.5rem",
          backgroundColor: "#edf7ed",
          fontSize: "0.875rem",
          fontFamily: "inherit",
          borderRadius: "4px",
          color: "#1e4620",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <IconContext.Provider
          value={{
            style: {
              width: "1.5rem",
              height: "1.5rem",
            },
          }}
        >
          <BiTransferAlt />
        </IconContext.Provider>
        <Box
          sx={{
            padding: "8px 0",
            color: "#1f1f1f",
            flexGrow: 1,
          }}
        >
          <strong>{`${fileInstance.file!.name} (${formatFileSize(
            fileInstance.file!.size
          )})`}</strong>{" "}
          was loaded successfully and is ready for transfer!
        </Box>
      </Box>
      <AnimatePresence>
        {props.isStartTransfer && (
          <>
            <motion.div
              key="waiting_progress"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -25 }}
              transition={{ duration: 0.25 }}
              className="mt-4"
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "start",
                  gap: "1rem",
                }}
              >
                <Button
                  color="inherit"
                  sx={{
                    borderRadius: "8px",
                    backgroundColor: "#fff",
                    color: "#b91c1c",
                    "&:hover": {
                      boxShadow:
                        "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)",
                      backgroundColor: "#fff",
                    },
                  }}
                  onClick={props.onCancelTransfer}
                >
                  Cancel
                </Button>
                <Box
                  sx={{
                    flex: "1 1 0%",
                    width: "auto",
                    boxShadow:
                      "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);",
                    padding: "1rem 1.5rem",
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    gap: ".5rem",
                  }}
                >
                  <LinearProgress />
                  <Box
                    sx={{
                      fontSize: "0.75rem",
                    }}
                  >
                    Waiting for the recipient to accept to send the file...
                  </Box>
                </Box>
              </Box>
            </motion.div>
            <motion.div
              key="waiting_alert"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.25 }}
              className="mt-6"
            >
              <Box
                sx={{
                  padding: "1rem 1.5rem",
                  backgroundColor: "#fff",
                  border: "1px solid #1d4ed8",
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                  borderRadius: "4px",
                }}
              >
                <IconContext.Provider
                  value={{
                    style: {
                      width: "1.5rem",
                      height: "1.5rem",
                      color: "#1d4ed8",
                    },
                  }}
                >
                  <AiOutlineInfoCircle />
                </IconContext.Provider>
                <Box
                  sx={{
                    fontSize: "0.875rem",
                    color: "#1f1f1f",
                  }}
                >
                  Don't close the page while file are transferring!
                </Box>
              </Box>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </React.Fragment>
  );
};

export default FileTransfer;
