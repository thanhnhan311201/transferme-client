import io, { type Socket } from "socket.io-client";

import { dispatch } from "../states";
import { socketActions } from "./slice.socket";

import { BASE_URL_SERVER } from "../config";
import { SOCKET_EVENTS } from "./config.socket";

class SocketClient {
  private socket: Socket | null = null;
  private socketName: string = "";

  connect() {
    this.socket = io(BASE_URL_SERVER, {
      withCredentials: true,
    });

    this.socket.on(
      SOCKET_EVENTS.NEW_CONNECTION,
      (data: { socketNames: string[]; socketName: string }) => {
        if (data.socketName) {
          this.socketName = data.socketName;
        }
        dispatch(
          socketActions.addDevice(
            data.socketNames.filter((name) => name !== data.socketName)
          )
        );
      }
    );

    this.socket.on(SOCKET_EVENTS.USER_LOGOUT, (socketName: string) => {
      dispatch(socketActions.removeDevice(socketName));
    });
  }

  getSocketName(): string {
    return this.socketName;
  }

  disconnect() {
    dispatch(socketActions.setDevices([]));
    this.socketName = "";
    this.socket?.disconnect();
  }
}

const socketClient = new SocketClient();

// @ts-ignore
window._socket = socketClient;

export default socketClient;
