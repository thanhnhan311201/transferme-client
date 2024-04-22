import io, { type Socket } from "socket.io-client";

import { dispatch } from "../store";
import { socketActions } from "./slice.socket";
import { transfering, availableToTransfer } from "@/modules/transfer/controller/transfer.slice";
import { setUnauthenticated } from "@/modules/authentication/controller/auth.slice";
import transferEventListener from "./transfer.listener.socket";

import { BASE_URL_SERVER } from "@/config";
import { SOCKET_EVENTS } from "./config.socket";
import { removeCredentialToken } from "@/modules/authentication/utils";

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

      removeCredentialToken()
      dispatch(socketActions.setDevices([]));
      dispatch(setUnauthenticated());
    });

    this._socket.on("error", (error) => {
      if (error instanceof Error) {
        console.log(error.message);
      }
      console.log("Internal Servel Error");
    });

    this._socket.on("disconnect", (reason) => {
      removeCredentialToken()
      this._socket = null;
      dispatch(socketActions.setDevices([]));
      dispatch(setUnauthenticated());
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
      dispatch(transfering());
    } else {
      dispatch(availableToTransfer());
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
