import { SigninWithGitHubResponseParams } from './response-param.type';
import { SigninWithGitHubRequestParams } from './request-param.type';

export interface IGitHubAuthService {
	signin(
		params: SigninWithGitHubRequestParams,
	): Promise<SigninWithGitHubResponseParams>;
}
