import { GatewayController } from './gateway.controller';

import { SOCKET_EVENTS } from './@types';
import { IWebsocketClient } from '@/network/websocket/@types';

const gatewayControllerInstance = GatewayController.getInstance();

export const establishSocketListener = (socketClient: IWebsocketClient) => {
	socketClient.on(
		SOCKET_EVENTS.NEW_CONNECTION,
		gatewayControllerInstance.handleNewConnection,
	);
};
