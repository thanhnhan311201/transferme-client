import { type Socket } from 'socket.io-client';

import transferController from './transfer.controller.socket';

import { SOCKET_EVENTS } from './types';

const transferEventListener = (socket: Socket) => {
	socket.on(
		SOCKET_EVENTS.ON_RECEIVE_NEW_CONNECTION,
		transferController.handleNewConnection
	);

	socket.on(SOCKET_EVENTS.ON_LOGGED_OUT, transferController.handleUserLogout);

	socket.on(
		SOCKET_EVENTS.WAIT_TRANSFER_ACCEPTED,
		transferController.handleNewRequestTransfer
	);

	socket.on(
		SOCKET_EVENTS.ACCEPT_REQUEST,
		transferController.handleAcceptRequest
	);

	socket.on(
		SOCKET_EVENTS.REFUSE_REQUEST,
		transferController.handleRefuseRequest
	);

	socket.on(SOCKET_EVENTS.RECEIVE_FILE, transferController.handleReceiveFile);

	socket.on(
		SOCKET_EVENTS.ON_ACK_RECEIVE_FILE,
		transferController.handleAcknowledge
	);

	socket.on(
		SOCKET_EVENTS.ON_CANCEL_TRANSFER,
		transferController.handleCancelTransfer
	);
};

export default transferEventListener;
