import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../features/authentication/slice/authSlice";
import socketSlice from "../socket/slice.socket";
import transferSlice from "../features/transfer/slice/transferSlice";
import loginSlice from "../features/authentication/slice/loginSlice";
import signupSlice from "../features/authentication/slice/signupSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    socket: socketSlice.reducer,
    transfer: transferSlice.reducer,
    login: loginSlice.reducer,
    signup: signupSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const dispatch = store.dispatch;

export default store;
