import { createApi } from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '@/service/axiosBaseQuery';

import AuthAPI from './auth.service';

import {
	ISigninResponseParam,
	ISigninWithFacebookResponseParam,
	ISigninWithGitHubResponseParam,
	ISigninWithGoogleResponseParam,
	ISignupResponseParam,
} from '../types/responseParam.interface';
import {
	ISignUpRequestParam,
	ISigninRequestParam,
	ISigninWithFacebookRequestParam,
	ISigninWithGitHubRequestParam,
	ISigninWithGoogleRequestParam,
} from '../types/requestParam.interface';

export const AuthQueryService = createApi({
	reducerPath: 'authQuery',
	baseQuery: axiosBaseQuery(),
	tagTypes: [],
	endpoints: () => ({}),
});

const authQueryApi = AuthQueryService.injectEndpoints({
	endpoints: (build) => ({
		signin: build.mutation<ISigninResponseParam, ISigninRequestParam>({
			async queryFn(arg: ISigninRequestParam) {
				try {
					const res = await AuthAPI.siginin(arg);
					return { data: res };
				} catch (error) {
					return { error };
				}
			},
		}),

		signup: build.mutation<ISignupResponseParam, ISignUpRequestParam>({
			async queryFn(arg: ISignUpRequestParam) {
				try {
					const res = await AuthAPI.signup(arg);
					return { data: res };
				} catch (error) {
					return { error };
				}
			},
		}),

		signinWithGoogle: build.mutation<
			ISigninWithGoogleResponseParam,
			ISigninWithGoogleRequestParam
		>({
			async queryFn(arg: ISigninWithGoogleRequestParam) {
				try {
					const res = await AuthAPI.signinWithGoogle(arg);
					return { data: res };
				} catch (error) {
					return { error };
				}
			},
		}),

		signinWithGithub: build.mutation<
			ISigninWithGitHubResponseParam,
			ISigninWithGitHubRequestParam
		>({
			async queryFn(arg: ISigninWithGitHubRequestParam) {
				try {
					const res = await AuthAPI.signinWithGithub(arg);
					return { data: res };
				} catch (error) {
					return { error };
				}
			},
		}),

		signinWithFacebook: build.mutation<
			ISigninWithFacebookResponseParam,
			ISigninWithFacebookRequestParam
		>({
			async queryFn(arg: ISigninWithFacebookRequestParam) {
				try {
					const res = await AuthAPI.signinWithFacebook(arg);
					return { data: res };
				} catch (error) {
					return { error };
				}
			},
		}),
	}),
});

export const {
	useSigninMutation,
	useSignupMutation,
	useSigninWithGoogleMutation,
	useSigninWithFacebookMutation,
	useSigninWithGithubMutation,
} = authQueryApi;
