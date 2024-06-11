import { createApi } from '@reduxjs/toolkit/query/react';

import axiosBaseQuery from '@/network/query';

import { GitHubAuthService } from '../services';

import type {
	SigninWithGitHubRequestParams,
	SigninWithGitHubResponseParams,
} from '../@types';

export const GitHubAuthQueryService = createApi({
	reducerPath: 'githubAuthQuery',
	baseQuery: axiosBaseQuery(),
	tagTypes: [],
	endpoints: () => ({}),
});

const githubAuthQueryApi = GitHubAuthQueryService.injectEndpoints({
	endpoints: (build) => ({
		signinWithGithub: build.mutation<
			SigninWithGitHubResponseParams,
			SigninWithGitHubRequestParams
		>({
			async queryFn(arg: SigninWithGitHubRequestParams) {
				try {
					const res = await GitHubAuthService.getInstance().signin(arg);
					return { data: res };
				} catch (error) {
					return { error };
				}
			},
		}),
	}),
});

export const { useSigninWithGithubMutation } = githubAuthQueryApi;
