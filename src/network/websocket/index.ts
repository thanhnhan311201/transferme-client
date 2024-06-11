import { SocketIoClient } from './socketIO';

import { establishSocketListener } from '@/modules/gateway/gateway.listener';

import { AuthService } from '@/modules/auth/services';
import { IWebsocketClient } from './@types';
import { WEBSOCKET_URL } from '@/config/env';
import { toast } from 'react-toastify';
import { removeCredentialToken } from '@/modules/auth/helpers';
import { setDevices } from '@/modules/gateway/state/gateway.slice';
import { dispatch } from '@/store';
import { setUnauthenticated } from '@/modules/auth/state/auth.slice';
import { removeUser } from '@/modules/user/state/user.slice';

export class WebSocketClient implements IWebsocketClient {
	private static instance: WebSocketClient | null = null;
	private readonly client: IWebsocketClient;

	private constructor(client: IWebsocketClient) {
		this.client = client;
	}

	public static getInstance(): WebSocketClient {
		if (!WebSocketClient.instance) {
			const socketIoClient = new SocketIoClient();
			WebSocketClient.instance = new WebSocketClient(socketIoClient);
		}

		return WebSocketClient.instance;
	}

	public connect(jwtToken: string, url?: string): void {
		this.client.connect(jwtToken, url || WEBSOCKET_URL);
		establishSocketListener(this.client);

		this.client.on('connect_error', async (error) => {
			toast.error(error.message);

			await AuthService.getInstance().signout();
			removeCredentialToken();
			dispatch(setDevices([]));
			dispatch(setUnauthenticated());
			dispatch(removeUser());
		});

		this.client.on('error', (error) => {
			console.log(error);
			if (error instanceof Error) {
				toast.error(error.message);
			}

			toast.error('Internal Servel Error');
		});

		this.client.on('disconnect', (reason) => {
			console.log(reason);
			WebSocketClient.instance = null;
		});
	}

	public disconnect(): void {
		this.client.disconnect();
	}

	public on(event: string, callback: (...args: any[]) => void): void {
		this.client.on(event, callback);
	}

	public emit(event: string, ...args: any[]): void {
		this.client.emit(event, ...args);
	}
}
