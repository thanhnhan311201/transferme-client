import {
	useDispatch,
	useSelector,
	type TypedUseSelectorHook,
} from 'react-redux';
import {
	Middleware,
	StateFromReducersMapObject,
	configureStore,
} from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { GetDefaultMiddleware } from '@reduxjs/toolkit/dist/getDefaultMiddleware';

import authReducer from '@/modules/auth/state/auth.slice';
import userReducer from '@/modules/user/state/user.slice';
import transferReducer from '@/modules/transfer/state/transfer.slice';
import { default as transferReducerV2 } from '@/modules/transfer-v2/state/transfer.slice';
import themeReducer from '@/modules/common/state/theme.slice';
import searchReducer from '@/modules/search/core/search.slice';
import socketReducer from '@/modules/gateway/state/gateway.slice';
import { AuthQueryService } from '@/modules/auth/query';
import { GoogleAuthQueryService } from '@/modules/auth/query';
import { FacebookAuthQueryService } from '@/modules/auth/query/facebook-auth.query';
import { GitHubAuthQueryService } from '@/modules/auth/query';

const middlewares: Middleware[] = [
	AuthQueryService.middleware,
	GoogleAuthQueryService.middleware,
	FacebookAuthQueryService.middleware,
	GitHubAuthQueryService.middleware,
];
const reducers = {
	// main reducer
	auth: authReducer,
	socket: socketReducer,
	transfer: transferReducer,
	transferV2: transferReducerV2,
	user: userReducer,
	theme: themeReducer,
	search: searchReducer,

	// query service reducer
	[AuthQueryService.reducerPath]: AuthQueryService.reducer,
	[GoogleAuthQueryService.reducerPath]: GoogleAuthQueryService.reducer,
	[FacebookAuthQueryService.reducerPath]: FacebookAuthQueryService.reducer,
	[GitHubAuthQueryService.reducerPath]: GitHubAuthQueryService.reducer,
};

const store = configureStore({
	reducer: reducers,
	middleware: (getDefaultMiddleware: GetDefaultMiddleware) =>
		getDefaultMiddleware().concat(middlewares),
});

// use for refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch);

export type RootState = StateFromReducersMapObject<typeof reducers>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const dispatch = store.dispatch;

export default store;
