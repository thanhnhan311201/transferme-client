import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../features/authentication/slice/authSlice";
import socketSlice from "../socket/slice.socket";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    socket: socketSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export const dispatch = store.dispatch;

export default store;
