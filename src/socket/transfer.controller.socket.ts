import socketClient from '.';
import { dispatch } from '@/store';
import { socketActions } from './slice.socket';
// import {
// 	waitForAccept,
// 	transfering,
// 	waitForRecipientReceiveFile,
// 	setProgress,
// 	refuseTransfer,
// 	transferSuccess,
// 	transferError,
// } from '@/modules/transfer/controller/transfer.slice';

// import fileInstance from '@/modules/transfer/utils/cache-file';

// import { SOCKET_EVENTS } from './types';
// import StreamSlicer from '@/utils/stream/slicer.stream';
// import StreamSender from '@/utils/stream/sender.stream';
// import streamReceiver from '@/utils/stream/receiver.stream';
import { setUser } from '@/modules/user/core/user.slice';

// import { sleep } from '@/utils';
import { IUserInfo } from '@/config';
import { toast } from 'react-toastify';

namespace transferController {
	export const handleNewConnection = (payload: {
		action: string;
		userInfo: IUserInfo | null;
		onlineUsers: {
			id: string;
			clientId: string;
			profilePhoto: string;
			username: string;
			email: string;
		}[];
		clientId: string;
	}) => {
		if (!payload) {
			toast.error('Error');
			return;
		}
		if (payload.action === 'login') {
			socketClient.clientId = payload.clientId;
			if (payload.userInfo) {
				dispatch(setUser(payload.userInfo));
			}
		}
		dispatch(socketActions.addDevice(payload.onlineUsers));
	};

	export const handleUserLogout = (userId: string) => {
		dispatch(socketActions.removeDevice(userId));
	};

	// export const handleNewRequestTransfer = (senderEmail: string) => {
	//   dispatch(waitForAccept(senderEmail));
	// };

	// export const handleAcceptRequest = () => {
	//   dispatch(transfering());
	//   if (!fileInstance.file) {
	//     return;
	//   } else {
	//     const stream = fileInstance.file.stream();

	//     const CHUNK_SIZE = 2 ** 20 / 2;
	//     const totalChunk = Math.ceil(fileInstance.file.size / CHUNK_SIZE);
	//     let countChunkId = 1;

	//     // progress
	//     const callbackSend = async (
	//       chunk: Uint8Array,
	//       controller: TransformStreamDefaultController
	//     ) => {
	//       await sleep(1500);
	//       if (socketClient.isCancel) {
	//         controller.terminate();
	//       } else {
	//         socketClient.socket.emit(SOCKET_EVENTS.SEND_FILE, {
	//           fileData: chunk,
	//           fileName: fileInstance.file?.name,
	//           fileType: fileInstance.file?.type,
	//           fileSize: fileInstance.file?.size,
	//           totalChunk,
	//           countChunkId,
	//         });
	//         if (countChunkId === totalChunk) {
	//           dispatch(waitForRecipientReceiveFile());
	//         } else {
	//           dispatch(setProgress(countChunkId / totalChunk));
	//         }
	//         countChunkId++;
	//       }
	//     };
	//     const transformedStream = stream
	//       .pipeThrough(new TransformStream(new StreamSlicer(CHUNK_SIZE)))
	//       .pipeThrough(new TransformStream(new StreamSender(callbackSend)));

	//     // trigger read stream
	//     (async () => {
	//       const reader = transformedStream.getReader();
	//       while (true) {
	//         const { done, value } = await reader.read();
	//         if (done) {
	//           break;
	//         }
	//       }
	//     })();
	//   }
	// };

	// export const handleRefuseRequest = () => {
	//   dispatch(refuseTransfer());
	// };

	// export const handleReceiveFile = async (file: {
	//   fileData: ArrayBuffer;
	//   fileName: string;
	//   fileType: string;
	//   fileSize: number;
	//   countChunkId: number;
	//   totalChunk: number;
	// }) => {
	//   const isDone = file.countChunkId === file.totalChunk;

	//   if (streamReceiver.controller) {
	//     streamReceiver.controller.enqueue(new Uint8Array(file.fileData));
	//   } else {
	//     const newStream = new ReadableStream<Uint8Array>({
	//       start: (_controller) => {
	//         streamReceiver.controller = _controller;
	//         _controller.enqueue(new Uint8Array(file.fileData));
	//       },
	//     });
	//     const headers = new Headers();
	//     headers.set("content-type", file.fileType);
	//     headers.set("content-length", file.fileSize.toString());
	//     const response = new Response(newStream, { headers });
	//     const blob = await response.blob();

	//     if (!socketClient.isCancel) {
	//       const newFile = new File([blob], file.fileName, {
	//         type: file.fileType,
	//       });

	//       dispatch(transferSuccess());
	//       streamReceiver.downloadFile(newFile);
	//     }
	//   }

	//   dispatch(setProgress(file.countChunkId / file.totalChunk));
	//   socketClient.socket.emit(SOCKET_EVENTS.ACK_RECEIVE_FILE, {
	//     done: isDone,
	//     receivedChunk: file.countChunkId,
	//     totalChunk: file.totalChunk,
	//   });

	//   if (isDone && streamReceiver.controller) {
	//     streamReceiver.controller.close();
	//     streamReceiver.controller = undefined;
	//   }
	// };

	// export const handleAcknowledge = (ack: {
	//   done: boolean;
	//   receivedChunk: number;
	//   totalChunk: number;
	// }) => {
	//   const { done, receivedChunk, totalChunk } = ack;
	//   if (done) {
	//     dispatch(transferSuccess());
	//   }
	// };

	// export const handleCancelTransfer = () => {
	//   if (streamReceiver.controller) {
	//     streamReceiver.controller.close();
	//     streamReceiver.controller = undefined;
	//   }
	//   socketClient.isCancel = true;
	//   dispatch(transferError());
	// };
}

export default transferController;
