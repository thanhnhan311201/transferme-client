import { type Socket } from "socket.io-client";

import transferController from "./transfer.controller.socket";

import { SOCKET_EVENTS } from "./config.socket";

const transferEventListener = (socket: Socket) => {
  socket.on(
    SOCKET_EVENTS.NEW_CONNECTION,
    transferController.handleNewConnection
  );

  socket.on(SOCKET_EVENTS.USER_LOGOUT, transferController.handleUserLogout);

  socket.on(
    SOCKET_EVENTS.WAIT_TRANSFER_ACCEPTED,
    transferController.handleNewRequestTransfer
  );

  socket.on(
    SOCKET_EVENTS.ACCEPT_REQUEST,
    transferController.handleAcceptRequest
  );

  socket.on(SOCKET_EVENTS.RECEIVE_FILE, transferController.handleReceiveFile);
};

export default transferEventListener;
