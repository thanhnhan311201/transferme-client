import { createSlice } from "@reduxjs/toolkit";

import { SOCKET_EVENTS } from "../../../socket/config.socket";

interface SliceState {
  transferStatus: string;
}

const transferSlice = createSlice({
  name: "transfer",
  initialState: {
    transferStatus: SOCKET_EVENTS.AVAILABLE,
  } as SliceState,
  reducers: {
    transferSuccess: (state) => ({
      transferStatus: SOCKET_EVENTS.SUCCESS_TRANSFER,
    }),
    transferError: (state) => ({
      transferStatus: SOCKET_EVENTS.ERROR_TRANSFER,
    }),
    waitForAccept: (state) => ({
      transferStatus: SOCKET_EVENTS.WAIT_TRANSFER_ACCEPTED,
    }),
    availableToTransfer: (state) => ({
      transferStatus: SOCKET_EVENTS.AVAILABLE,
    }),
    transfering: (state) => ({ transferStatus: SOCKET_EVENTS.TRANSFERING }),
  },
});

export const transferActions = transferSlice.actions;

export default transferSlice;
