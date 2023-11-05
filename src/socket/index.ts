import io, { type Socket } from "socket.io-client";

import { dispatch } from "../states";
import { socketActions } from "./slice.socket";
import { authActions } from "../features/authentication/slice/authSlice";
import { transferActions } from "../features/transfer/slice/transferSlice";

import transferEventListener from "./transfer.listener.socket";

import { BASE_URL_SERVER } from "../config";
import { SOCKET_EVENTS } from "./config.socket";

class SocketClient {
  private _socket: Socket | null = null;
  private _isCancel: boolean = false;
  private _clientId: string = "";

  connect(params: { token: string }) {
    this._socket = io(BASE_URL_SERVER, {
      withCredentials: true,
      auth: {
        token: params.token
      }
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

      dispatch(socketActions.setDevices([]));
      dispatch(authActions.setUnauthenticated());
    });

    this._socket.on("error", (error) => {
      if (error instanceof Error) {
        console.log(error.message);
      }
      console.log("Internal Servel Error");
    });

    this._socket.on("disconnect", (reason) => {
      document.cookie = `access_token= ; expires= ${new Date(
        new Date().getTime()
      ).toUTCString()}`;
      document.cookie = `user_id= ; expires= ${new Date(
        new Date().getTime()
      ).toUTCString()}`;

      this._socket = null;
      dispatch(socketActions.setDevices([]));
      dispatch(authActions.setUnauthenticated());
    });
  }

  transfer(): void {
    this._socket?.emit(SOCKET_EVENTS.SUCCESS_TRANSFER);
  }

  get socket(): Socket {
    if (!this._socket) {
      throw new Error("Socket not initialize!");
    }
    return this._socket;
  }

  requestSendFile(userId: string) {
    this._socket?.emit(SOCKET_EVENTS.REQUEST_SEND_FILE, userId);
  }

  replyToRequest(confirm: boolean) {
    this.socket.emit(SOCKET_EVENTS.REPLY_TO_REQUEST, confirm);
    if (confirm) {
      dispatch(transferActions.transfering());
    } else {
      dispatch(transferActions.availableToTransfer());
    }
  }

  cancelTransfer() {
    this._isCancel = true;
    this.socket.emit(SOCKET_EVENTS.CANCEL_TRANSFER);
  }

  get isCancel(): boolean {
    return this._isCancel;
  }

  set isCancel(cfm: boolean) {
    this._isCancel = cfm;
  }

  get clientId(): string {
    return this._clientId;
  }

  set clientId(newId: string) {
    this._clientId = newId;
  }

  disconnect() {
    dispatch(socketActions.setDevices([]));
    this._socket?.disconnect();
  }
}

const socketClient = new SocketClient();

// @ts-ignore
window._socket = socketClient;

export default socketClient;
