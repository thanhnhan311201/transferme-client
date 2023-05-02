import io, { type Socket } from "socket.io-client";

import { BASE_URL_SERVER } from "../config";
import { SOCKET_EVENTS } from "./config.socket";

class SocketClient {
  private socket: Socket | null = null;
  private socketName: string = "";
  private devices: string[] = [];

  connect() {
    this.socket = io(BASE_URL_SERVER, {
      withCredentials: true,
    });

    this.socket.on(
      SOCKET_EVENTS.NEW_CONNECTION,
      (socketNames: string[], socketName?: string) => {
        if (socketName) {
          this.socketName = socketName;
        }
        this.devices = this.devices.concat(socketNames);
      }
    );
  }

  getSocketName(): string {
    return this.socketName;
  }

  getDevices(): string[] {
    return this.devices;
  }

  disconnect() {
    this.devices = [];
    this.socketName = "";
    this.socket?.disconnect();
  }
}

const socketClient = new SocketClient();

// @ts-ignore
window._socket = socketClient;

export default socketClient;
