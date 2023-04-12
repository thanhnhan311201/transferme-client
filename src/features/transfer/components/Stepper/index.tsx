import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { useState, useMemo, useEffect } from "react";

import BrowseFile from "./BrowseFile";
import DeviceOption from "./DeviceOption";
import FileTransfer from "./FileTransfer";
import fileInstance from "../../utils/cache-file";
import deviceInstance from "../../utils/select-device";

const steps = [
  "Choose file to transfer",
  "Choose device to transfer",
  "Transfer",
];

const FileTransferStepper: React.FC = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isNext, setIsNext] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    fileInstance.file = null;
    deviceInstance.device = "";
    setActiveStep(0);
    setIsNext(false);
  };

  const handleAllowToContinue = (isAllow: boolean) => {
    setIsNext(isAllow);
  };

  const stepContent: React.ReactElement[] = useMemo(
    () => [
      <BrowseFile onHandleAllowToContinue={handleAllowToContinue} />,
      <DeviceOption onHandleAllowToContinue={handleAllowToContinue} />,
      <FileTransfer />,
    ],
    []
  );

  return (
    <Box sx={{ width: "100%", height: "100%" }}>
      <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step}>
            <StepLabel>{step}</StepLabel>
            <StepContent>
              <Box
                sx={{
                  margin: "36px 0",
                }}
              >
                <Box
                  sx={{
                    marginBottom: "24px",
                  }}
                >
                  {stepContent[activeStep]}
                </Box>
                <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                  <Button
                    color="inherit"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    sx={{
                      mr: 1,
                      width: "25%",
                      marginRight: "1rem",
                      "&:hover": {
                        backgroundColor: "#fff",
                        boxShadow:
                          "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)",
                        borderRadius: "8px",
                      },
                    }}
                  >
                    Back
                  </Button>
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
                    {activeStep === steps.length - 1 ? "Finish" : "Next"}
                  </Button>
                </Box>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography sx={{ mb: 2 }}>Transfer completed.</Typography>
          <Button
            sx={{
              padding: "8px",
              backgroundColor: "#fff",
              boxShadow:
                "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)",
              borderRadius: "8px",
              "&:hover": {
                backgroundColor: "#fff",
                boxShadow:
                  "0 4px 8px 3px rgba(0, 0, 0, .15), 0 1px 3px rgba(0, 0, 0, .3)",
              },
            }}
            onClick={handleReset}
          >
            Transfer again
          </Button>
        </Paper>
      )}
    </Box>
  );
};

export default FileTransferStepper;
