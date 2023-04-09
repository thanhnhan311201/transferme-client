import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useState, useMemo } from "react";

import BrowseFile from "./BrowseFile";
import DeviceOption from "./DeviceOption";
import FileTransfer from "./FileTransfer";

const steps = [
  "Choose file to transfer",
  "Choose device to transfer",
  "Transfer",
];

const FileTransferStepper: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isNext, setIsNext] = useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setIsNext(false);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleAllowToContinue = (isAllow: boolean) => {
    setIsNext(isAllow);
  };

  const stepContent: React.ReactElement[] = useMemo(
    () => [
      <BrowseFile
        onHandleAllowToContinue={handleAllowToContinue}
      />,
      <DeviceOption />,
      <FileTransfer />,
    ],
    []
  );

  return (
    <Box sx={{ width: "100%" }}>
      <Box
        sx={{
          borderBottom: "1px solid #e5e7eb",
          paddingBottom: "16px",
          marginBottom: "32px",
        }}
      >
        <Stepper className="max-w-3/4" activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
      {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>Transfer completed.</Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
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
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <Box
            sx={{
              marginBottom: "32px",
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
                  backgroundColor: "#fff",
                  boxShadow:
                    "0 4px 8px 3px rgba(0, 0, 0, .15), 0 1px 3px rgba(0, 0, 0, .3)",
                },
              }}
              onClick={handleNext}
            >
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default FileTransferStepper;
