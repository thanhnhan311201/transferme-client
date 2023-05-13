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

  export const handleNewRequestTransfer = (senderEmail: string) => {
    dispatch(transferActions.waitForAccept(senderEmail));
  };

  export const handleAcceptRequest = () => {
    dispatch(transferActions.transfering());
    if (!fileInstance.file) {
      return;
    } else {
      const stream = fileInstance.file.stream();

      const CHUNK_SIZE = 2 ** 20 / 2;
      const totalChunk = Math.ceil(fileInstance.file.size / CHUNK_SIZE);
      let countChunkId = 1;

      // progress
      const callbackSend = (chunk: Uint8Array) => {
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
          if (done || socketClient.isCancel) {
            break;
          }
        }
      })();
    }
  };

  export const handleRefuseRequest = () => {
    dispatch(transferActions.refuseTransfer());
  };

  export const handleReceiveFile = (file: {
    fileData: ArrayBuffer;
    fileName: string;
    fileType: string;
    fileSize: number;
    countChunkId: number;
    totalChunk: number;
  }) => {
    console.log(file);
    if (streamReceiver.controller) {
      streamReceiver.controller.enqueue(new Uint8Array(file.fileData));
      dispatch(
        transferActions.setProgress(file.countChunkId / file.totalChunk)
      );
      const isDone = file.countChunkId === file.totalChunk;
      if (isDone) {
        streamReceiver.controller.close();
        streamReceiver.controller = undefined;
      }
      socketClient.socket.emit(SOCKET_EVENTS.ACK_RECEIVE_FILE, {
        done: isDone,
        receivedChunk: file.countChunkId,
        totalChunk: file.totalChunk,
      });
    } else {
      (async () => {
        const newStream = new ReadableStream<Uint8Array>({
          start: (_controller) => {
            streamReceiver.controller = _controller;
            _controller.enqueue(new Uint8Array(file.fileData));
            dispatch(
              transferActions.setProgress(file.countChunkId / file.totalChunk)
            );

            const isDone = file.countChunkId === file.totalChunk;
            if (isDone) {
              streamReceiver.controller.close();
              streamReceiver.controller = undefined;
            }
            socketClient.socket.emit(SOCKET_EVENTS.ACK_RECEIVE_FILE, {
              done: isDone,
              receivedChunk: file.countChunkId,
              totalChunk: file.totalChunk,
            });
          },
        });

        const headers = new Headers();
        headers.set("content-type", file.fileType);
        headers.set("content-length", file.fileSize.toString());
        const response = new Response(newStream, { headers });
        const blob = await response.blob();
        const newFile = new File([blob], file.fileName, {
          type: file.fileType,
        });

        dispatch(transferActions.transferSuccess());
        streamReceiver.downloadFile(newFile);
      })();
    }
  };

  export const handleAcknowledge = (ack: {
    done: boolean;
    receivedChunk: number;
    totalChunk: number;
  }) => {
    const { done, receivedChunk, totalChunk } = ack;
    if (done) {
      dispatch(transferActions.transferSuccess());
    } else {
      dispatch(transferActions.setProgress(receivedChunk / totalChunk));
    }
  };

  export const handleCancelTransfer = () => {
    dispatch(transferActions.transferError())
  }
}

export default transferController;
