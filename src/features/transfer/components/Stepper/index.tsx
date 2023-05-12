import * as React from "react";
import { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";

import { motion } from "framer-motion";

import BrowseFile from "./BrowseFile";
import DeviceOption from "./UserOption";
import FileTransfer from "./FileTransfer";
import TransferSuccess from "./TransferSuccess";
import TransferError from "./TransferError";

import fileInstance from "../../utils/cache-file";
import receiverInstance from "../../utils/receiver-instance";

import { RootState } from "../../../../states";

import browseFile from "../../../../images/browse-file.png";
import devices from "../../../../images/devices.png";
import transfer from "../../../../images/transfer.png";
import finish from "../../../../images/finishtransfer.png";

import socketClient from "../../../../socket";

const steps = [
  "Choose file to transfer",
  "Choose device to transfer",
  "Transfer file",
];

const FileTransferStepper: React.FC = () => {
  const onlineUsers = useSelector(
    (state: RootState) => state.socket.onlineUsers
  );
  const [activeStep, setActiveStep] = React.useState(0);
  const [isNext, setIsNext] = useState(false);
  const [isStartTransfer, setIsStartTransfer] = useState<boolean>(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      return prevActiveStep + 1;
    });
  };

  const handleTransferFile = () => {
    setIsStartTransfer(true);
    const receiver = onlineUsers.find(
      (user) => user.email === receiverInstance.receiver
    );
    if (!receiver) {
      return;
    }
    socketClient.requestSendFile(receiver.id);
  };

  const handleCancelTransfer = () => {
    setIsStartTransfer(false);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => {
      return prevActiveStep - 1;
    });
  };

  const handleReset = () => {
    fileInstance.file = null;
    receiverInstance.receiver = "";
    setActiveStep(0);
    setIsNext(false);
    setIsStartTransfer(false);
  };

  const handleAllowToContinue = (isAllow: boolean) => {
    setIsNext(isAllow);
  };

  const stepContent: React.ReactElement[] = useMemo(() => {
    return [
      <BrowseFile onHandleAllowToContinue={handleAllowToContinue} />,
      <DeviceOption
        onHandleAllowToContinue={handleAllowToContinue}
        onlineUsers={onlineUsers}
      />,
      <FileTransfer
        isStartTransfer={isStartTransfer}
        onCancelTransfer={handleCancelTransfer}
      />,
    ];
  }, [isStartTransfer, onlineUsers]);

  useEffect(() => {
    fileInstance.file = null;
    receiverInstance.receiver = "";
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
      }}
    >
      <Box sx={{ width: "50%" }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step) => (
            <Step key={step}>
              <StepLabel>{step}</StepLabel>
              <StepContent>
                <Box
                  sx={{
                    margin: "36px 0",
                  }}
                >
                  <motion.div
                    className="mb-10"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    {stepContent[activeStep]}
                  </motion.div>
                  {!isStartTransfer && (
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.25, delay: 0.25 }}
                      className="flex flex-row"
                    >
                      <Button
                        color="inherit"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{
                          mr: 1,
                          width: "25%",
                          marginRight: "1rem",
                          borderRadius: "8px",
                          "&:hover": {
                            backgroundColor: "#fff",
                            boxShadow:
                              "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)",
                          },
                        }}
                      >
                        Back
                      </Button>
                      {activeStep < steps.length - 1 ? (
                        <Button
                          disabled={!isNext}
                          sx={{
                            width: "75%",
                            padding: "8px",
                            backgroundColor: "#fff",
                            boxShadow:
                              "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)",
                            borderRadius: "8px",
                            "&:hover": {
                              backgroundColor: "#1976d2",
                              color: "#fff",
                            },
                          }}
                          onClick={handleNext}
                        >
                          Next
                        </Button>
                      ) : (
                        <Button
                          sx={{
                            width: "75%",
                            padding: "8px",
                            backgroundColor: "#fff",
                            boxShadow:
                              "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)",
                            borderRadius: "8px",
                            "&:hover": {
                              backgroundColor: "#1976d2",
                              color: "#fff",
                            },
                          }}
                          onClick={handleTransferFile}
                        >
                          Transfer
                        </Button>
                      )}
                    </motion.div>
                  )}
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <TransferSuccess onHandleReset={handleReset} />
        )}
      </Box>
      {activeStep === 0 && (
        <motion.img
          initial={{ opacity: 0, y: 75 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute w-auto h-96 top-8 right-0"
          src={browseFile}
          alt="browse file"
        ></motion.img>
      )}
      {activeStep === 1 && (
        <motion.img
          initial={{ opacity: 0, y: 75 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute w-auto h-96 top-12 right-0"
          src={devices}
          alt="choose device"
        ></motion.img>
      )}
      {activeStep === 2 && (
        <motion.img
          initial={{ opacity: 0, y: 75 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute w-auto h-80 top-32 right-0"
          src={transfer}
          alt="transfer file"
        ></motion.img>
      )}
      {activeStep === 3 && (
        <motion.img
          initial={{ opacity: 0, y: 75 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute w-auto h-88 top-24 right-0"
          src={finish}
          alt="finish transfer"
        ></motion.img>
      )}
    </Box>
  );
};

export default FileTransferStepper;
