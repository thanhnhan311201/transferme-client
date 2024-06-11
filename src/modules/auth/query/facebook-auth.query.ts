import { createApi } from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '@/network/query';

import { FacebookAuthService } from '../services';

import type {
	SigninWithFacebookRequestParams,
	SigninWithFacebookResponseParams,
} from '../@types';

export const FacebookAuthQueryService = createApi({
	reducerPath: 'facebookAuthQuery',
	baseQuery: axiosBaseQuery(),
	tagTypes: [],
	endpoints: () => ({}),
});

const facebookAuthQueryApi = FacebookAuthQueryService.injectEndpoints({
	endpoints: (build) => ({
		signinWithFacebook: build.mutation<
			SigninWithFacebookResponseParams,
			SigninWithFacebookRequestParams
		>({
			async queryFn(arg: SigninWithFacebookRequestParams) {
				try {
					const res = await FacebookAuthService.getInstance().signin(arg);
					return { data: res };
				} catch (error) {
					return { error };
				}
			},
		}),
	}),
});

export const { useSigninWithFacebookMutation } = facebookAuthQueryApi;
