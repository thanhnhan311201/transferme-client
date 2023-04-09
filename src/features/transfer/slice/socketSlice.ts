import { createSlice } from "@reduxjs/toolkit";
import io, { type Socket } from "socket.io-client";

import { BASE_URL_SERVER } from "../../../config";

interface SliceState {
  isConnected: boolean;
  socketId: string;
  data: any;
}

let socket: Socket;

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    isConnected: false,
    socketId: "",
    data: undefined,
  } as SliceState,
  reducers: {
    connect: (state) => {
      socket = io(BASE_URL_SERVER);
      // socket.on("connect", () => {
      //   state.socketId = socket.id;
      // });

      return { ...state, isConnected: true };
    },
    sendData: (state, action) => {
      socket.emit(action.payload.eventName, action.payload.data);

      return { ...state };
    },
    receiveData: (state, action) => {
      socket.on(action.payload.eventName, (data: any) => {
        state.data = data;
      });

      return { ...state };
    },
    disconnect: (state) => {
      socket.disconnect();

      return { ...state, isConnected: false, socketId: "" };
    },
  },
});

export const socketActions = socketSlice.actions;

export default socketSlice;
