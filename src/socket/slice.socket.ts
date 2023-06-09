import { createSlice } from "@reduxjs/toolkit";

interface SliceState {
  onlineUsers: { id: string; clientId: string; picture: string }[];
}

const socketSlice = createSlice({
  name: "socket",
  initialState: {
    onlineUsers: [],
  } as SliceState,
  reducers: {
    setDevices: (state, action) => ({ ...state, onlineUsers: action.payload }),
    addDevice: (state, action) => ({
      ...state,
      onlineUsers: state.onlineUsers.concat(action.payload),
    }),
    removeDevice: (state, action) => {
      const removedUser = state.onlineUsers.filter(
        (user) => user.id !== action.payload
      );
      return {
        ...state,
        onlineUsers: removedUser,
      };
    },
  },
});

export const socketActions = socketSlice.actions;

export default socketSlice;
