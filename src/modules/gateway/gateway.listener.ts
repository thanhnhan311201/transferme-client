import { GatewayController } from './gateway.controller';

import { SOCKET_EVENTS } from './@types';
import { IWebsocketClient } from '@/network/websocket/@types';

const gatewayControllerInstance = GatewayController.getInstance();

export const establishSocketListener = (socketClient: IWebsocketClient) => {
	socketClient.on(
		SOCKET_EVENTS.NEW_CONNECTION,
		gatewayControllerInstance.handleNewConnection,
	);

	socketClient.on(
		SOCKET_EVENTS.SIGNOUT,
		gatewayControllerInstance.handleUserLogout,
	);

	socketClient.on(
		SOCKET_EVENTS.TRANSFER_WAIT_TRANSFER_ACCEPTED,
		gatewayControllerInstance.handleNewRequestTransfer,
	);

	socketClient.on(
		SOCKET_EVENTS.TRANSFER_ACCEPT_REQUEST,
		gatewayControllerInstance.handleAcceptRequest,
	);

	socketClient.on(
		SOCKET_EVENTS.TRANSFER_REFUSE_REQUEST,
		gatewayControllerInstance.handleRefuseRequest,
	);

	socketClient.on(
		SOCKET_EVENTS.TRANSFER_RECEIVE_FILE,
		gatewayControllerInstance.handleReceiveFile,
	);

	socketClient.on(
		SOCKET_EVENTS.TRANSFER_ON_ACK_RECEIVE_FILE,
		gatewayControllerInstance.handleAcknowledge,
	);

	socketClient.on(
		SOCKET_EVENTS.TRANSFER_ON_CANCEL_TRANSFER,
		gatewayControllerInstance.handleCancelTransfer,
	);
};
