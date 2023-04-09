import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../features/authentication/slice/authSlice";
import socketSlice from "../features/transfer/slice/socketSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    socket: socketSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
