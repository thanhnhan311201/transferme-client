import { dispatch } from "../states";
import { socketActions } from "./slice.socket";
import { transferActions } from "../features/transfer/slice/transferSlice";

import fileInstance from "../features/transfer/utils/cache-file";

import socketClient from ".";

import { IUserInfo } from "../config";

import { SOCKET_EVENTS } from "./config.socket";
import StreamSlicer from "../utils/stream/slicer.stream";
import StreamSender from "../utils/stream/sender.stream";
import streamReceiver from "../utils/stream/receiver.stream";
namespace transferController {
  export const handleNewConnection = (onlineUsers: IUserInfo[]) => {
    dispatch(socketActions.addDevice(onlineUsers));
  };

  export const handleUserLogout = (userId: string) => {
    dispatch(socketActions.removeDevice(userId));
  };

  export const handleNewRequestTransfer = () => {
    dispatch(transferActions.waitForAccept());
    socketClient.replyToRequest(true);
  };

  export const handleAcceptRequest = () => {
    if (!fileInstance.file) {
      return;
    } else {
      const stream = fileInstance.file.stream();

      const CHUNK_SIZE = 2 ** 20 / 2;
      let totalChunk = Math.ceil(fileInstance.file.size / CHUNK_SIZE);
      let countChunkId = 1;

      // progress
      const callbackSend = (chunk: Uint8Array) => {
        console.log(countChunkId / totalChunk);
        socketClient.socket.emit(SOCKET_EVENTS.SEND_FILE, {
          fileData: chunk,
          fileName: fileInstance.file?.name,
          fileType: fileInstance.file?.type,
          fileSize: fileInstance.file?.size,
          totalChunk,
          countChunkId,
        });
        countChunkId++;
      };
      const transformedStream = stream
        .pipeThrough(new TransformStream(new StreamSlicer(CHUNK_SIZE)))
        .pipeThrough(new TransformStream(new StreamSender(callbackSend)));

      // trigger read stream
      (async () => {
        const reader = transformedStream.getReader();
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            console.log("Finished reading stream");
            break;
          }
        }
      })();
    }
  };

  export const handleReceiveFile = (file: {
    fileData: ArrayBuffer;
    fileName: string;
    fileType: string;
    fileSize: number;
    countChunkId: number;
    totalChunk: number;
  }) => {
    streamReceiver.concatChunkAndDownloadFile(file);
  };
}

export default transferController;
