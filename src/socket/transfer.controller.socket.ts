import { dispatch } from "../states";
import { socketActions } from "./slice.socket";

import socketClient from ".";

import { SOCKET_EVENTS } from "./config.socket";

namespace transferController {
  export const handleNewConnection = (data: {
    socketNames: string[];
    socketName: string;
  }) => {
    if (data.socketName) {
      socketClient.socketName = data.socketName;
    }
    dispatch(
      socketActions.addDevice(
        data.socketNames.filter((name) => name !== data.socketName)
      )
    );
  };

  export const handleUserLogout = (socketName: string) => {
    dispatch(socketActions.removeDevice(socketName));
  };
}

export default transferController;
