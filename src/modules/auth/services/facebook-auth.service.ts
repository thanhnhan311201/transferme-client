import { HttpClient } from '@/network/http';

import type {
	IFacebookAuthService,
	SigninWithFacebookRequestParams,
	SigninWithFacebookResponseParams,
} from '../@types';

export class FacebookAuthService implements IFacebookAuthService {
	private static instance: FacebookAuthService | null = null;
	private httpClientInstance: HttpClient;

	private constructor(httpIns: HttpClient) {
		this.httpClientInstance = httpIns;
	}

	public static getInstance(): FacebookAuthService {
		if (!FacebookAuthService.instance) {
			const _httpClientInstance = HttpClient.getInstance();
			FacebookAuthService.instance = new FacebookAuthService(
				_httpClientInstance,
			);
		}

		return FacebookAuthService.instance;
	}

	public signin = (params: SigninWithFacebookRequestParams) => {
		const url = '/auth/facebook';
		return this.httpClientInstance.post<SigninWithFacebookResponseParams>(
			url,
			params,
		);
	};
}
