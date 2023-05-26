import React from "react";
import { motion } from "framer-motion";
import FileTransferStepper from "./Stepper";

const TransferForm: React.FC = () => {
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
          className="w-full px-8 pt-6"
        >
          <FileTransferStepper />
        </motion.div>
      </div>
    </div>
  );
};

export default TransferForm;
