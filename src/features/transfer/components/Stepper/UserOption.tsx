import React from "react";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import receiverInstance from "../../utils/receiver-instance";

import { IUserInfo } from "../../../../config";

const UserOption: React.FC<{
  onHandleAllowToContinue: (isAllow: boolean) => void;
  onlineUsers: IUserInfo[];
}> = (props) => {
  const [user, setuser] = useState<string>(receiverInstance.receiver);

  const handleChange = (e: SelectChangeEvent) => {
    setuser(e.target.value);

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
          <InputLabel id="select-user-error-label">Select user *</InputLabel>
          <Select
            labelId="select-user-error-label"
            id="user-option-error"
            value={user}
            label="Select user *"
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

export default UserOption;
