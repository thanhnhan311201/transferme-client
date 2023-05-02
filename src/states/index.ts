import { configureStore } from "@reduxjs/toolkit";

import authSlice from "../features/authentication/slice/authSlice";

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
