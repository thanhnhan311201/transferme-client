import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

import authReducer from "@/modules/authentication/controller/auth.slice";
import socketSlice from "@/socket/slice.socket";
import transferSlice from "@/modules/transfer/slice/transferSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    socket: socketSlice.reducer,
    transfer: transferSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const dispatch = store.dispatch;

export default store;
