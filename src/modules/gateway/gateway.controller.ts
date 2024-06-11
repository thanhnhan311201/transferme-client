import { GatewayService } from './gateway.service';

import { User } from '../user/@types';

const gatewayServiceInstance = GatewayService.getInstance();

export class GatewayController {
	private static instance: GatewayController | null = null;

	private constructor() {}

	public static getInstance(): GatewayController {
		if (!GatewayController.instance) {
			GatewayController.instance = new GatewayController();
		}

		return GatewayController.instance;
	}

	public handleNewConnection(payload: {
		action: string;
		userInfo: User | null;
		onlineDevices: (User & { clientId: string })[];
		clientId: string;
	}): void {
		gatewayServiceInstance.handleNewConnection(payload);
	}

	public handleUserLogout(clientId: string) {
		gatewayServiceInstance.handleUserLogout(clientId);
	}

	public handleNewRequestTransfer(senderEmail: string) {
		gatewayServiceInstance.handleNewRequestTransfer(senderEmail);
	}

	public handleAcceptRequest = () => {
		gatewayServiceInstance.handleAcceptRequest();
	};

	public handleRefuseRequest = () => {
		gatewayServiceInstance.handleRefuseRequest();
	};

	public handleReceiveFile = async (file: {
		fileData: ArrayBuffer;
		fileName: string;
		fileType: string;
		fileSize: number;
		countChunkId: number;
		totalChunk: number;
	}) => {
		gatewayServiceInstance.handleReceiveFile(file);
	};

	public handleAcknowledge = (ack: {
		done: boolean;
		receivedChunk: number;
		totalChunk: number;
	}) => {
		gatewayServiceInstance.handleAcknowledge(ack);
	};

	public handleCancelTransfer = () => {
		gatewayServiceInstance.handleCancelTransfer();
	};
}
