import { createSlice } from "@reduxjs/toolkit";

import { SOCKET_EVENTS } from "@/socket/config.socket";

interface SliceState {
  transferStatus: string;
  sender: string;
  progress: number;
}

const transferSlice = createSlice({
  name: "transfer",
  initialState: {
    transferStatus: SOCKET_EVENTS.AVAILABLE,
    progress: 0,
  } as SliceState,
  reducers: {
    transferSuccess: (state) => ({
      ...state,
      transferStatus: SOCKET_EVENTS.SUCCESS_TRANSFER,
    }),
    transferError: (state) => ({
      ...state,
      transferStatus: SOCKET_EVENTS.ERROR_TRANSFER,
    }),
    waitForAccept: (state, action) => ({
      ...state,
      transferStatus: SOCKET_EVENTS.WAIT_TRANSFER_ACCEPTED,
      sender: action.payload,
    }),
    availableToTransfer: (state) => ({
      ...state,
      transferStatus: SOCKET_EVENTS.AVAILABLE,
      sender: "",
      progress: 0,
    }),
    transfering: (state) => ({
      ...state,
      transferStatus: SOCKET_EVENTS.TRANSFERING,
    }),
    waitForRecipientReceiveFile: (state) => ({
      ...state,
      transferStatus: SOCKET_EVENTS.WAIT_FOR_RECIPIENT_RECEIVE_FILE,
    }),
    refuseTransfer: (state) => ({
      ...state,
      transferStatus: SOCKET_EVENTS.REFUSE_REQUEST,
    }),
    setProgress: (state, action) => {
      return { ...state, progress: action.payload * 100 };
    },
  },
});

export const transferActions = transferSlice.actions;

export default transferSlice;
