import { type Socket } from "socket.io-client";

import transferController from "./transfer.controller.socket";

import { SOCKET_EVENTS } from "./config.socket";

const transferEventListener = (socket: Socket) => {
  socket.on(
    SOCKET_EVENTS.NEW_CONNECTION,
    transferController.handleNewConnection
  );

  socket.on(SOCKET_EVENTS.USER_LOGOUT, transferController.handleUserLogout);
};

export default transferEventListener;
