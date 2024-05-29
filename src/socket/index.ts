import io, { type Socket } from 'socket.io-client';

import { dispatch } from '../store';
import { socketActions } from './slice.socket';
import {
	transfering,
	availableToTransfer,
} from '@/modules/transfer/controller/transfer.slice';
import { setUnauthenticated } from '@/modules/authentication/controller/auth.slice';
import transferEventListener from './transfer.listener.socket';

import { WEBSOCKET_URL } from '@/config';
import { SOCKET_EVENTS } from './types';
import { removeCredentialToken } from '@/modules/authentication/utils';
import { removeUser } from '@/modules/user/controller/user.slice';
import { toast } from 'react-toastify';
import AuthAPI from '@/modules/authentication/controller/auth.service';

class SocketClient {
	private _socket: Socket | null = null;
	private _isCancel: boolean = false;
	private _clientId: string = '';

	connect(params: { token: string }) {
		this._socket = io(WEBSOCKET_URL, {
			withCredentials: true,
			auth: {
				token: params.token,
			},
		});

		transferEventListener(this._socket);

		this._socket.on('connect_error', async (error) => {
			toast.error(error.message);

			await AuthAPI.signout();
			removeCredentialToken();
			dispatch(socketActions.setDevices([]));
			dispatch(setUnauthenticated());
			dispatch(removeUser());
		});

		this._socket.on('error', (error) => {
			if (error instanceof Error) {
				toast.error(error.message);
			}
			toast.error('Internal Servel Error');
		});

		this._socket.on('disconnect', (reason) => {
			console.log(reason);
			this._socket = null;
		});
	}

	transfer(): void {
		this._socket?.emit(SOCKET_EVENTS.SUCCESS_TRANSFER);
	}

	get socket(): Socket {
		if (!this._socket) {
			throw new Error('Socket not initialize!');
		}
		return this._socket;
	}

	requestSendFile(payload: { receivedClientId: string }) {
		this._socket?.emit(SOCKET_EVENTS.REQUEST_SEND_FILE, payload);
	}

	replyToRequest(confirm: boolean) {
		this.socket.emit(SOCKET_EVENTS.REPLY_TO_REQUEST, { confirm });
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

	async disconnect() {
		dispatch(socketActions.setDevices([]));
		this._socket?.disconnect();
	}
}

const socketClient = new SocketClient();

(window as any)._socket = socketClient;

export default socketClient;
