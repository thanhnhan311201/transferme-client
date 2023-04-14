import React from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

import fileInstance from "../../utils/cache-file";

const TransferProgress = () => {
  return (
    <React.Fragment>
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    </React.Fragment>
  );
};

export default TransferProgress;
