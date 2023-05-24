import { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Player } from "@lottiefiles/react-lottie-player";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";
import LinearProgress from "@mui/material/LinearProgress";

import { IconContext } from "react-icons";
import { BiTransferAlt } from "react-icons/bi";

import TransferProgressWithLabel from "../components/Stepper/TransferProgress";

import socketClient from "../../../socket";

import { transferActions } from "../slice/transferSlice";
import { RootState } from "../../../states";

import { SOCKET_EVENTS } from "../../../socket/config.socket";

import transferFiles from "../../../lotties/transfer-files.json";

const ReceivingWindow: React.FC = () => {
  const transferStatus = useSelector(
    (state: RootState) => state.transfer.transferStatus
  );
  const sender = useSelector((state: RootState) => state.transfer.sender);
  const progress = useSelector((state: RootState) => state.transfer.progress);

  const dispatch = useDispatch();

  const handleRefuse = () => {
    socketClient.replyToRequest(false);
  };

  const handleCancel = () => {
    socketClient.cancelTransfer();
    dispatch(transferActions.transferError());
  };

  const handleReset = () => {
    dispatch(transferActions.availableToTransfer());
  };

  const handleAccept = () => {
    dispatch(transferActions.transfering());
    socketClient.replyToRequest(true);
  };

  return (
    <>
      {ReactDOM.createPortal(
        <Box>
          <Backdrop
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={transferStatus !== SOCKET_EVENTS.AVAILABLE}
          >
            <motion.div
              key="receiving_window"
              initial={{ opacity: 0, y: -150 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -150 }}
              transition={{ duration: 0.5 }}
              className="w-50rem bg-gradient-to-r from-primary-color--tint-5 to-primary-color pl-8 pr-16 py-4 rounded-3xl z-50 shadow-xl"
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: "2rem",
                  color: "#fff",
                }}
              >
                <Player
                  autoplay
                  loop
                  speed={1.5}
                  src={transferFiles}
                  style={{ height: "300px", width: "auto" }}
                />
                {transferStatus === SOCKET_EVENTS.WAIT_TRANSFER_ACCEPTED && (
                  <motion.div
                    key="transfer_request"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 flex flex-col"
                  >
                    <h2 className="text-2xl font-medium mb-2">
                      Hey, You Just Received A File Transfer Request!
                    </h2>
                    <span className="text-base font-normal mb-10">
                      Do you want to receive files from the{" "}
                      <strong>{sender}?</strong>
                    </span>
                    <Box
                      sx={{
                        display: "flex",
                        gap: "1rem",
                        alignItems: "center",
                        fontSize: ".875rem",
                      }}
                    >
                      <Button
                        sx={{
                          width: "50%",
                          padding: "6px 8px",
                          backgroundColor: "transparent",
                          borderRadius: "8px",
                          border: "2px solid #fff",
                          color: "#fff",
                          textTransform: "none",
                          "&:hover": {
                            backgroundColor: "#fff",
                            color: "#1565c0",
                          },
                        }}
                        onClick={handleRefuse}
                      >
                        No, I don't want it
                      </Button>
                      <Button
                        sx={{
                          width: "50%",
                          padding: "6px 8px",
                          backgroundColor: "#fff",
                          borderRadius: "8px",
                          border: "2px solid #fff",
                          color: "#1565c0",
                          textTransform: "none",
                          "&:hover": {
                            bachkgroundColor: "transparent",
                            color: "#fff",
                          },
                        }}
                        onClick={handleAccept}
                      >
                        Yes, Send it to me
                      </Button>
                    </Box>
                  </motion.div>
                )}
                {transferStatus === SOCKET_EVENTS.TRANSFERING && (
                  <motion.div
                    key="transfer_progress"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 flex flex-col"
                  >
                    <h2 className="text-2xl font-medium mb-8">
                      Transfering...
                    </h2>
                    <Box
                      sx={{
                        marginBottom: "3rem",
                      }}
                    >
                      <TransferProgressWithLabel value={progress} />
                    </Box>
                    <Button
                      sx={{
                        width: "100%",
                        padding: "6px 8px",
                        backgroundColor: "transparent",
                        borderRadius: "8px",
                        color: "#999",
                        textTransform: "none",
                        "&:hover": {
                          backgroundColor: "#fff",
                          color: "#b91c1c",
                        },
                      }}
                      onClick={handleCancel}
                    >
                      Cancel
                    </Button>
                  </motion.div>
                )}
                {transferStatus ===
                  SOCKET_EVENTS.WAIT_FOR_RECIPIENT_RECEIVE_FILE && (
                  <motion.div
                    key="waiting_for_success"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 flex flex-col"
                  >
                    <h2 className="text-2xl font-medium mb-8">
                      Waiting for the recipient to receive the file
                      successfully...
                    </h2>

                    <Box
                      sx={{
                        marginBottom: "3rem",
                      }}
                    >
                      <LinearProgress color="inherit" />
                    </Box>
                  </motion.div>
                )}
                {transferStatus === SOCKET_EVENTS.SUCCESS_TRANSFER && (
                  <motion.div
                    key="transfer_success"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 flex flex-col"
                  >
                    <h2 className="text-2xl font-medium mb-2">Successfully!</h2>
                    <span className="text-base font-normal mb-10">
                      Your file has been transferred successfully!
                    </span>
                    <Button
                      sx={{
                        width: "100%",
                        textAlign: "center",
                        backgroundColor: "#fff",
                        color: "#1565c0",
                        borderRadius: "8px",
                        textTransform: "none",
                        border: "2px solid #fff",
                        "&:hover": {
                          bachkgroundColor: "transparent",
                          color: "#fff",
                        },
                        display: "flex",
                        gap: "1rem",
                      }}
                      onClick={handleReset}
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
                      Finish
                    </Button>
                  </motion.div>
                )}
                {transferStatus === SOCKET_EVENTS.ERROR_TRANSFER && (
                  <motion.div
                    key="transfer_error"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5 }}
                    className="flex-1 flex flex-col"
                  >
                    <h2 className="text-2xl font-medium mb-2">Error!</h2>
                    <span className="text-base font-normal mb-10">
                      Your file has been transferred unsuccessfully!
                    </span>
                    <Button
                      sx={{
                        width: "100%",
                        textAlign: "center",
                        backgroundColor: "#fff",
                        color: "#1565c0",
                        borderRadius: "8px",
                        textTransform: "none",
                        border: "2px solid #fff",
                        "&:hover": {
                          bachkgroundColor: "transparent",
                          color: "#fff",
                        },
                        display: "flex",
                        gap: "1rem",
                      }}
                      onClick={handleReset}
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
                      Finish
                    </Button>
                  </motion.div>
                )}
              </Box>
            </motion.div>
          </Backdrop>
        </Box>,
        document.getElementById("modal-root") as Element
      )}
    </>
  );
};

export default ReceivingWindow;
