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
}
