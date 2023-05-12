import React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import receiverInstance from "../../utils/receiver-instance";

import { IUserInfo } from "../../../../config";

const DeviceOption: React.FC<{
  onHandleAllowToContinue: (isAllow: boolean) => void;
  onlineUsers: IUserInfo[];
}> = (props) => {
  const [device, setDevice] = useState<string>(receiverInstance.receiver);

  const handleChange = (e: SelectChangeEvent) => {
    setDevice(e.target.value);

    if (e.target.value) {
      receiverInstance.receiver = e.target.value;
      props.onHandleAllowToContinue(true);
    } else {
      props.onHandleAllowToContinue(false);
      receiverInstance.receiver = "";
    }
  };

  useEffect(() => {
    if (!receiverInstance.receiver) {
      props.onHandleAllowToContinue(false);
      return;
    }

    props.onHandleAllowToContinue(true);
  }, [receiverInstance.receiver]);

  return (
    <React.Fragment>
      <Box>
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
            {props.onlineUsers.map((user) => (
              <MenuItem key={user.id} value={user.email}>
                {user.email}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </React.Fragment>
  );
};

export default DeviceOption;
