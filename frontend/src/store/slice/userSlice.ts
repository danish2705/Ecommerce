import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface userState {
  user: any | null;
  isEmailVerified: boolean;
  isLoginDialogOpen: boolean;
  isLoggedIn: boolean;
}

const initialState: userState = {
  user: null,
  isEmailVerified: false,
  isLoginDialogOpen: false,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
    },
    setEmailVerified: (state, action: PayloadAction<any>) => {
      state.isEmailVerified = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isLoggedIn = false;
      state.isEmailVerified = false;
    },
    toggleLoginDialog: (state) => {
      state.isLoginDialogOpen = !state.isLoginDialogOpen;
    },
    authState: (state) => {
      state.isLoggedIn = true;
    },
  },
});

export const { setUser, setEmailVerified, toggleLoginDialog, authState } = userSlice.actions;
export default userSlice.reducer