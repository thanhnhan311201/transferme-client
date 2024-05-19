import { createSlice } from "@reduxjs/toolkit";

export interface IUserInfo {
  id: string;
  email: string;
  username: string;
  profilePhoto: string;
}

interface ISliceState {
  userInfo: IUserInfo | null;
}

const SLICE_NAME = "user";

const initialState: ISliceState = {
  userInfo: null,
};

const userSlice = createSlice({
  name: SLICE_NAME,
  initialState: initialState,
  reducers: {
    setUser: (
      state,
      action: {
        payload: IUserInfo;
        type: string;
      }
    ) => ({
      ...state,
      userInfo: action.payload,
    }),
    removeUser: (state) => ({
      ...state,
      userInfo: null,
    }),
  },
});

export const { removeUser, setUser } = userSlice.actions;

const userReducer = userSlice.reducer;
export default userReducer;
