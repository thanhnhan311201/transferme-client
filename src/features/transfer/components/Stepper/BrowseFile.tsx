import React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { AiFillFileText } from "react-icons/ai";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { motion, AnimatePresence } from "framer-motion";

import fileInstance from "../../utils/cache-file";
import { formatFileSize, MAX_FILE_SIZE } from "../../utils/general";

const BrowseFile: React.FC<{
  onHandleAllowToContinue: (isAllow: boolean) => void;
}> = (props) => {
  const [error, setError] = useState<string>("");
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) {
      fileInstance.file = null;
      props.onHandleAllowToContinue(false);
      setError("File does not upload!");
      setIsFileUploaded(false);
      return;
    }
    const file = e.target.files[0];
    if (file) {
      fileInstance.file = file;
      setIsLoading(true);
    } else {
      fileInstance.file = null;
      props.onHandleAllowToContinue(false);
      setError("The size of the file must be less than 1MB");
      setIsFileUploaded(false);
    }
  };

  const handleDeleteFile = () => {
    setIsFileUploaded(false);
    props.onHandleAllowToContinue(false);
    fileInstance.file = null;
  };

  useEffect(() => {
    if (!fileInstance.file) {
      setError("File does not upload!");
      setIsFileUploaded(false);
      props.onHandleAllowToContinue(false);
      return;
    }

    setIsLoading(false);
    setError("");
    setIsFileUploaded(true);
    props.onHandleAllowToContinue(true);
  }, [fileInstance.file]);

  return (
    <React.Fragment>
      <Box
        sx={{
          border: "5px dashed #ebebeb",
          borderRadius: "14px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "3rem",
          maxHeight: "13rem",
        }}
      >
        {!isFileUploaded && !fileInstance.file && !isLoading && (
          <motion.div
            key="file_upload_form"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center flex-col py-4"
          >
            <Box
              sx={{
                marginBottom: "15px",
                color: "#1f1f1f",
              }}
            >
              <span>Browse file</span>
            </Box>
            <Button
              sx={{
                padding: 0,
                borderRadius: "0.5rem",
                fontWeight: 400,
                textTransform: "none",
                fontSize: "1rem",
              }}
            >
              <input
                type="file"
                name="transfer-file"
                id="transfer-file"
                className="hidden"
                onChange={handleUploadFile}
                value=""
              />
              <label htmlFor="transfer-file">
                <div className="py-2 px-4 bg-white text-1f1f1f cursor-pointer shadow-btn rounded-lg hover:shadow-user-nav">
                  <div className="flex items-center gap-2">
                    <IconContext.Provider
                      value={{
                        style: {
                          color: "1f1f1f",
                          width: "1rem",
                          height: "1rem",
                        },
                      }}
                    >
                      <AiFillFileText />
                    </IconContext.Provider>
                    <span className="text-base text-1f1f1f">Browse File</span>
                  </div>
                </div>
              </label>
            </Button>
          </motion.div>
        )}
        {!isFileUploaded && !fileInstance.file && isLoading && (
          <motion.div
            key="waiting_upload"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <CircularProgress />
          </motion.div>
        )}
        {isFileUploaded && fileInstance.file && !isLoading && (
          <motion.div
            key="file"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                padding: "1rem",
                borderRadius: "0.5rem",
                backgroundColor: "#ebebeb",
                color: "#1f1f1f",
                border: `2px solid ${error ? "red" : "#fff"}`,
              }}
            >
              <Box
                sx={{
                  width: "10rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <span className="text-sm font-normal text-ellipsis whitespace-nowrap overflow-hidden">
                  {fileInstance.file!.name}
                </span>
                <span className="text-sm font-normal text-0000008a">
                  {formatFileSize(fileInstance.file!.size)}
                </span>
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  cursor: "pointer",
                }}
                onClick={handleDeleteFile}
              >
                <Box
                  sx={{
                    padding: "0.5rem",
                    borderRadius: "50%",
                    "&:hover": {
                      backgroundColor: "#fff",
                    },
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
                    <FaTrashAlt />
                  </IconContext.Provider>
                </Box>
              </Box>
            </Box>
          </motion.div>
        )}
      </Box>
    </React.Fragment>
  );
};

export default BrowseFile;
