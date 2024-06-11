export enum SOCKET_EVENTS {
	// general
	NEW_CONNECTION = 'new_connection',
	SIGNOUT = 'signout',

	// Transfer
	TRANSFER_SEND_FILE = 'transfer:send_file',
	TRANSFER_WAIT_TRANSFER_ACCEPTED = 'transfer:wait_transfer_accepted',
	TRANSFER_SUCCESS_TRANSFER = 'transfer:success_transfer',
	TRANSFER_ERROR_TRANSFER = 'transfer:error_transfer',
	TRANSFER_CANCEL_TRANSFER = 'transfer:cancel_transfer',
	TRANSFER_ON_CANCEL_TRANSFER = 'transfer:on_cancel_transfer',
	TRANSFER_REQUEST_SEND_FILE = 'transfer:request_send_file',
	TRANSFER_REPLY_TO_REQUEST = 'transfer:reply_to_request',
	TRANSFER_REFUSE_REQUEST = 'transfer:refuse_request',
	TRANSFER_ACCEPT_REQUEST = 'transfer:accept_request',
	TRANSFER_RECEIVE_FILE = 'transfer:receive_file',
	TRANSFER_ACK_RECEIVE_FILE = 'transfer:ack_receive_file',
	TRANSFER_ON_ACK_RECEIVE_FILE = 'transfer:on_ack_receive_file',
}
