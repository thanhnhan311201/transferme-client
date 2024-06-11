import { SigninWithFacebookResponseParams } from './response-param.type';
import { SigninWithFacebookRequestParams } from './request-param.type';

export interface IFacebookAuthService {
	signin(
		params: SigninWithFacebookRequestParams,
	): Promise<SigninWithFacebookResponseParams>;
}
