import { createSlice } from "@reduxjs/toolkit";

interface SliceState {
  devices: string[];
}

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    devices: [],
  } as SliceState,
  reducers: {
    setDevices: (state, action) => ({ ...state, devices: action.payload }),
    addDevice: (state, action) => ({
      ...state,
      devices: state.devices.concat(action.payload),
    }),
    removeDevice: (state, action) => {
      const newDevices = state.devices.filter(
        (device) => device !== action.payload
      );
      return {
        ...state,
        devices: newDevices,
      };
    },
  },
});

export const socketActions = socketSlice.actions;

export default socketSlice;
