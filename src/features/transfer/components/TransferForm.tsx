import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import FileTransferStepper from "./Stepper";

import browseFile from "../../../images/browse-file.png";
import transfer from "../../../images/transfer.png";

const TransferForm: React.FC = () => {
  const [step, setStep] = useState<number>(0);

  const handleSetStep = (newStep: number) => {
    setStep(newStep);
  };

  return (
    <div className="pb-4">
      <div className="bg-white w-full h-full rounded-xl">
        <div className="border-b border-solid border-e5e7eb">
          <div className="pl-8 py-4">
            <span className="font-medium text-2xl text-1f1f1f">
              Transfer file
            </span>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75 }}
          className="w-full pl-8 pt-6 grid grid-cols-2 gap-8"
        >
          <FileTransferStepper onSetStep={handleSetStep} />
          {step === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center"
            >
              <img
                className="w-3/4 -translate-y-16"
                src={browseFile}
                alt="browse file"
              />
            </motion.div>
          )}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center"
            >
              <img
                className="w-3/4 translate-y-4"
                src={browseFile}
                alt="browse file"
              />
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center justify-center"
            >
              <img
                className="w-3/4 translate-y-32"
                src={transfer}
                alt="browse file"
              />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default TransferForm;
