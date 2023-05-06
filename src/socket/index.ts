import io, { type Socket } from "socket.io-client";

import { dispatch } from "../states";
import { socketActions } from "./slice.socket";
import { authActions } from "../features/authentication/slice/authSlice";

import transferEventListener from "./transfer.listener.socket";

import { BASE_URL_SERVER } from "../config";
import { SOCKET_EVENTS } from "./config.socket";

class SocketClient {
  private _socket: Socket | null = null;
  private _socketName: string = "";

  connect() {
    this._socket = io(BASE_URL_SERVER, {
      withCredentials: true,
    });

    transferEventListener(this._socket);

    this._socket.on("connect_error", (error) => {
      console.log(error);

      document.cookie = `access_token= ; expires= ${new Date(
        new Date().getTime()
      ).toUTCString()}`;
      document.cookie = `user_id= ; expires= ${new Date(
        new Date().getTime()
      ).toUTCString()}`;

      dispatch(authActions.setUnauthenticated());
    });
  }

  transfer(): void {
    this._socket?.emit(SOCKET_EVENTS.SUCCESS_TRANSFER);
  }

  get socketName(): string {
    return this._socketName;
  }

  set socketName(newSocketName: string) {
    this._socketName = newSocketName;
  }

  get socket(): Socket {
    if (!this._socket) {
      throw new Error("Socket not initialize!");
    }
    return this._socket;
  }

  disconnect() {
    dispatch(socketActions.setDevices([]));
    this._socketName = "";
    this._socket?.disconnect();
  }
}

const socketClient = new SocketClient();

// @ts-ignore
window._socket = socketClient;

export default socketClient;
