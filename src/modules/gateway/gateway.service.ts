import { toast } from 'react-toastify';

import { setUser } from '../user/state/user.slice';
import { User } from '../user/@types/user.type';
import { IGatewayService, SOCKET_EVENTS } from './@types';
import { dispatch } from '@/store';
import { addDevice, removeDevice, setDevices } from './state/gateway.slice';
import {
	availableToTransfer,
	refuseTransfer,
	setProgress,
	transferError,
	transferSuccess,
	transfering,
	waitForAccept,
	waitForRecipientReceiveFile,
} from '../transfer/state/transfer.slice';
import { WebSocketClient } from '@/network/websocket';
import { StreamReceiverService } from '../stream/receiver.stream';
import { StreamSlicer } from '../stream/slicer.stream';
import { StreamSender } from '../stream/sender.stream';

import { CacheFile } from '../transfer/utils/cache-file';
import { sleep } from '@/helpers/general.helper';
import { CLIENT_ID } from '@/utils';
import { TRANSFERRING_STATUS } from '../transfer/types/transferring-status.type';

const streamReceiverInstance = StreamReceiverService.getInstance();

export class GatewayService implements IGatewayService {
	private static instance: GatewayService | null = null;
	private _transferStatus: TRANSFERRING_STATUS = TRANSFERRING_STATUS.AVAILABLE;

	private constructor() {}

	public static getInstance(): GatewayService {
		if (!GatewayService.instance) {
			GatewayService.instance = new GatewayService();
		}

		return GatewayService.instance;
	}

	get transferStatus(): TRANSFERRING_STATUS {
		return this._transferStatus;
	}

	set transferStatus(status: TRANSFERRING_STATUS) {
		this._transferStatus = status;
	}

	public handleNewConnection(payload: {
		action: string;
		userInfo: User | null;
		onlineDevices: (User & { clientId: string })[];
		clientId: string;
	}): void {
		if (!payload) {
			toast.error('Error');
			return;
		}

		if (payload.action === 'login') {
			if (payload.userInfo) {
				dispatch(setUser(payload.userInfo));
			}
			localStorage.setItem(CLIENT_ID, payload.clientId);
		}
		dispatch(addDevice(payload.onlineDevices));
	}

	public handleUserLogout(clientId: string) {
		dispatch(removeDevice(clientId));
	}

	public handleNewRequestTransfer(senderEmail: string) {
		dispatch(waitForAccept(senderEmail));
	}

	public handleAcceptRequest() {
		const uploadedFile = CacheFile.getInstance().file;

		dispatch(transfering());
		if (!uploadedFile) {
			return;
		} else {
			const stream = uploadedFile.stream();

			const CHUNK_SIZE = 2 ** 20 / 2;
			const totalChunk = Math.ceil(uploadedFile.size / CHUNK_SIZE);
			let countChunkId = 1;

			// progress
			const callbackSend = async (
				chunk: Uint8Array,
				controller: TransformStreamDefaultController,
			) => {
				await sleep(1500);
				if (this._transferStatus === TRANSFERRING_STATUS.CANCEL_TRANSFERRING) {
					controller.terminate();
				} else {
					WebSocketClient.getInstance().emit(SOCKET_EVENTS.TRANSFER_SEND_FILE, {
						file: {
							fileData: chunk,
							fileName: uploadedFile.name,
							fileType: uploadedFile.type,
							fileSize: uploadedFile.size,
							totalChunk,
							countChunkId,
						},
					});
					if (countChunkId === totalChunk) {
						dispatch(waitForRecipientReceiveFile());
					} else {
						dispatch(setProgress(countChunkId / totalChunk));
					}
					countChunkId++;
				}
			};
			const transformedStream = stream
				.pipeThrough(new TransformStream(new StreamSlicer(CHUNK_SIZE)))
				.pipeThrough(new TransformStream(new StreamSender(callbackSend)));

			// trigger read stream
			(async () => {
				const reader = transformedStream.getReader();
				// eslint-disable-next-line no-constant-condition
				while (true) {
					const { done } = await reader.read();
					if (done) {
						break;
					}
				}
			})();
		}
	}

	public handleRefuseRequest() {
		dispatch(refuseTransfer());
	}

	public async handleReceiveFile(file: {
		fileData: ArrayBuffer;
		fileName: string;
		fileType: string;
		fileSize: number;
		countChunkId: number;
		totalChunk: number;
	}) {
		const isDone = file.countChunkId === file.totalChunk;

		if (streamReceiverInstance.controller) {
			streamReceiverInstance.controller.enqueue(new Uint8Array(file.fileData));
		} else {
			const newStream = new ReadableStream<Uint8Array>({
				start: (_controller) => {
					streamReceiverInstance.controller = _controller;
					_controller.enqueue(new Uint8Array(file.fileData));
				},
			});
			const headers = new Headers();
			headers.set('content-type', file.fileType);
			headers.set('content-length', file.fileSize.toString());
			const response = new Response(newStream, { headers });
			const blob = await response.blob();

			if (this._transferStatus !== TRANSFERRING_STATUS.CANCEL_TRANSFERRING) {
				const newFile = new File([blob], file.fileName, {
					type: file.fileType,
				});

				dispatch(transferSuccess());
				streamReceiverInstance.downloadFile(newFile);
			}
		}

		dispatch(setProgress(file.countChunkId / file.totalChunk));
		WebSocketClient.getInstance().emit(
			SOCKET_EVENTS.TRANSFER_ACK_RECEIVE_FILE,
			{
				ack: {
					done: isDone,
					receivedChunk: file.countChunkId,
					totalChunk: file.totalChunk,
				},
			},
		);

		if (isDone && streamReceiverInstance.controller) {
			streamReceiverInstance.controller.close();
			streamReceiverInstance.controller = null;
		}
	}

	public handleAcknowledge(ack: {
		done: boolean;
		receivedChunk: number;
		totalChunk: number;
	}) {
		const { done } = ack;
		if (done) {
			dispatch(transferSuccess());
		}
	}

	public handleCancelTransfer() {
		if (streamReceiverInstance.controller) {
			streamReceiverInstance.controller.close();
			streamReceiverInstance.controller = null;
		}
		this._transferStatus = TRANSFERRING_STATUS.CANCEL_TRANSFERRING;
		dispatch(transferError());
	}

	public transfer(): void {
		WebSocketClient.getInstance().emit(SOCKET_EVENTS.TRANSFER_SUCCESS_TRANSFER);
	}

	public requestSendFile(clientId: string) {
		WebSocketClient.getInstance().emit(
			SOCKET_EVENTS.TRANSFER_REQUEST_SEND_FILE,
			{ receivedClientId: clientId },
		);
	}

	public replyToRequest(confirm: boolean) {
		WebSocketClient.getInstance().emit(
			SOCKET_EVENTS.TRANSFER_REPLY_TO_REQUEST,
			{ confirm },
		);
		if (confirm) {
			dispatch(transfering());
		} else {
			dispatch(availableToTransfer());
		}
	}

	public cancelTransfer() {
		this._transferStatus = TRANSFERRING_STATUS.CANCEL_TRANSFERRING;
		WebSocketClient.getInstance().emit(SOCKET_EVENTS.TRANSFER_CANCEL_TRANSFER);
	}

	public disconnect() {
		dispatch(setDevices([]));
		WebSocketClient.getInstance().disconnect();
	}
}
