import axiosClient from '@/api/axiosClient';
import {
	ISigninRequestParam,
	ISigninWithFacebookRequestParam,
	ISigninWithGitHubRequestParam,
	ISigninWithGoogleRequestParam,
	ISignUpRequestParam,
	IVerifyEmailRequestParam,
} from '../types/requestParam.interface';
import {
	ISignupResponseParam,
	ISigninWithGoogleResponseParam,
	ISigninResponseParam,
	IVerifyEmailResponseParam,
	IVerifyTokenResponseParam,
	ICommonResponse,
	ISigninWithGitHubResponseParam,
	ISigninWithFacebookResponseParam,
} from '../types/responseParam.interface';

class AuthAPI {
	constructor() {}

	public static siginin = (params: ISigninRequestParam) => {
		const url = '/auth/signin';
		return axiosClient.post<any, ISigninResponseParam>(url, params);
	};

	public static signup = (params: ISignUpRequestParam) => {
		const url = '/auth/signup';
		return axiosClient.post<any, ISignupResponseParam>(url, params);
	};

	public static signinWithGoogle = (params: ISigninWithGoogleRequestParam) => {
		const url = '/auth/google';
		return axiosClient.post<any, ISigninWithGoogleResponseParam>(url, params);
	};

	public static verifyToken = () => {
		const url = '/auth/verify-access-token';
		return axiosClient.get<any, IVerifyTokenResponseParam>(url);
	};

	public static verifyEmail = (params: IVerifyEmailRequestParam) => {
		const url = '/auth/verify-email';
		return axiosClient.post<any, IVerifyEmailResponseParam>(url, params);
	};

	public static signinWithGithub = (params: ISigninWithGitHubRequestParam) => {
		const url = '/auth/github';
		return axiosClient.post<any, ISigninWithGitHubResponseParam>(url, params);
	};

	public static signinWithFacebook = (
		params: ISigninWithFacebookRequestParam
	) => {
		const url = '/auth/facebook';
		return axiosClient.post<any, ISigninWithFacebookResponseParam>(url, params);
	};

	public static signout = () => {
		const url = '/auth/signout';
		return axiosClient.post<any, ICommonResponse>(url);
	};
}

export default AuthAPI;
