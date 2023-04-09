import React from "react";

import FileTransferStepper from "./Stepper";

const TransferForm: React.FC = () => {
  return (
    <div className="p-4 pt-0 pl-0">
      <div className="bg-white w-full h-full rounded-xl">
        <div className="border-b border-solid border-e5e7eb">
          <div className="pl-10 py-4">
            <span className="font-medium text-2xl text-1f1f1f">
              Transfer file
            </span>
          </div>
        </div>
        <div className="max-w-1/2 pl-10 pt-6 overflow-y-auto">
            <FileTransferStepper />
        </div>
      </div>
    </div>
  );
};

export default TransferForm;
