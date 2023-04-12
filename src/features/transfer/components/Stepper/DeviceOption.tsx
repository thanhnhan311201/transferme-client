import React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import deviceInstance from "../../utils/select-device";

const devices: string[] = ["jdlkqwd!@3fjlk_401d", "jdlkqwd!@3fjlk_458d"];

const DeviceOption: React.FC<{
  onHandleAllowToContinue: (isAllow: boolean) => void;
}> = (props) => {
  const [device, setDevice] = useState<string>(deviceInstance.device);

  const handleChange = (e: SelectChangeEvent) => {
    setDevice(e.target.value);

    if (e.target.value) {
      deviceInstance.device = e.target.value;
      props.onHandleAllowToContinue(true);
    } else {
      props.onHandleAllowToContinue(false);
      deviceInstance.device = "";
    }
  };

  useEffect(() => {
    if (!deviceInstance.device) {
      props.onHandleAllowToContinue(false);
      return;
    }

    props.onHandleAllowToContinue(true);
  }, [deviceInstance.device]);

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FormControl fullWidth>
          <InputLabel id="select-device-error-label">
            Select device *
          </InputLabel>
          <Select
            labelId="select-device-error-label"
            id="device-option-error"
            value={device}
            label="Select device *"
            onChange={handleChange}
          >
            <MenuItem value={""}>None</MenuItem>
            {devices.map((device: string) => (
              <MenuItem key={device} value={device}>
                {device}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </React.Fragment>
  );
};

export default DeviceOption;
