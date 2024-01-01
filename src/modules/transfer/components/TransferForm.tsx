import React from "react";

import { motion } from "framer-motion";

import FileTransferStepper from "./Stepper";

const TransferForm: React.FC = () => {
  return (
    <div className="pb-4 max-w-3xl w-full mx-auto my-0 mt-8">
      <div className="bg-transparent w-full h-full rounded-xl">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75 }}
          className="px-8 py-4 flex flex-col items-center gap-4"
        >
          <span className="font-medium text-2xl text-1f1f1f">TransferMe</span>
          <span className="font-normal text-base text-777">
            Transfer and take your files to infinity and beyond
          </span>
        </motion.div>
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
