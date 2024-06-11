import { toast } from 'react-toastify';

import { setUser } from '../user/state/user.slice';
import { dispatch } from '@/store';

import { User } from '../user/@types/user.type';
import { CLIENT_ID } from '@/utils';
import type { IGatewayService } from './@types';

export class GatewayService implements IGatewayService {
	private static instance: GatewayService | null = null;

	private constructor() {}

	public static getInstance(): GatewayService {
		if (!GatewayService.instance) {
			GatewayService.instance = new GatewayService();
		}

		return GatewayService.instance;
	}

	public handleNewConnection(payload: {
		userInfo: User | null;
		clientId: string;
	}): void {
		if (!payload) {
			toast.error('Error');
			return;
		}

		if (payload.userInfo) {
			dispatch(setUser(payload.userInfo));
		}

		localStorage.setItem(CLIENT_ID, payload.clientId);
	}
}
