import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";
import { Middleware, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { GetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

import authReducer from "@/modules/authentication/controller/auth.slice";
import transferReducer from "@/modules/transfer/controller/transfer.slice";
import socketSlice from "@/socket/slice.socket";
import { AuthQueryService } from "@/modules/authentication/controller/auth.query";

const middlewares: Middleware[] = [AuthQueryService.middleware];

const store = configureStore({
  reducer: {
    // main reducer
    auth: authReducer,
    socket: socketSlice.reducer,
    transfer: transferReducer,

    // query service reducer
    [AuthQueryService.reducerPath]: AuthQueryService.reducer,
  },
  middleware: (getDefaultMiddleware: GetDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
});

// use for refetchOnFocus/refetchOnReconnect
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const dispatch = store.dispatch;

export default store;
