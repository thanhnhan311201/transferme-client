import { HttpClient } from '@/network/http';

import type {
	IGitHubAuthService,
	SigninWithGitHubRequestParams,
	SigninWithGitHubResponseParams,
} from '../@types';

export class GitHubAuthService implements IGitHubAuthService {
	private static instance: GitHubAuthService | null = null;
	private httpClientInstance: HttpClient;

	private constructor(httpIns: HttpClient) {
		this.httpClientInstance = httpIns;
	}

	public static getInstance(): GitHubAuthService {
		if (!GitHubAuthService.instance) {
			const _httpClientInstance = HttpClient.getInstance();
			GitHubAuthService.instance = new GitHubAuthService(_httpClientInstance);
		}

		return GitHubAuthService.instance;
	}

	public signin = (params: SigninWithGitHubRequestParams) => {
		const url = '/auth/github';
		return this.httpClientInstance.post<SigninWithGitHubResponseParams>(
			url,
			params,
		);
	};
}
