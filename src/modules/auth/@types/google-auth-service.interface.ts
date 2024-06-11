import { SigninWithGoogleResponseParams } from './response-param.type';
import { SigninWithGoogleRequestParams } from './request-param.type';

export interface IGoogleAuthService {
	signin(
		params: SigninWithGoogleRequestParams,
	): Promise<SigninWithGoogleResponseParams>;
}
