import { User } from '@/modules/user/@types/user.type';

export interface IGatewayService {
	handleNewConnection(payload: {
		action: string;
		userInfo: User | null;
		onlineDevices: (User & { clientId: string })[];
		clientId: string;
	}): void;
	handleUserLogout(clientId: string): void;
	handleNewRequestTransfer(senderEmail: string): void;
	handleAcceptRequest(): void;
	handleRefuseRequest(): void;
	handleReceiveFile(file: {
		fileData: ArrayBuffer;
		fileName: string;
		fileType: string;
		fileSize: number;
		countChunkId: number;
		totalChunk: number;
	}): Promise<void>;
	handleAcknowledge(ack: {
		done: boolean;
		receivedChunk: number;
		totalChunk: number;
	}): void;
	handleCancelTransfer(): void;
}
