import { CommonResponse } from '@/@types';
import {
	SignUpRequestParams,
	SigninRequestParams,
	VerifyEmailRequestParams,
} from './request-param.type';
import { SigninResponseParams } from './response-param.type';

export interface IAuthService {
	signin(params: SigninRequestParams): Promise<SigninResponseParams>;
	signup(params: SignUpRequestParams): Promise<CommonResponse>;
	signout(): Promise<CommonResponse>;
	verifyToken(): Promise<CommonResponse>;
	verifyEmail(params: VerifyEmailRequestParams): Promise<CommonResponse>;
}
