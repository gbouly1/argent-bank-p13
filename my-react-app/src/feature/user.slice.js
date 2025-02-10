import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null, // Informations utilisateur
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    updateUserName: (state, action) => {
      const { firstName, lastName } = action.payload;
      if (state.userInfo) {
        state.userInfo.firstName = firstName;
        state.userInfo.lastName = lastName;
      }
    },
    resetUserInfo: (state) => {
      state.userInfo = null; // Réinitialise les infos utilisateur
    },
    logout: (state) => {
      state.TokenAuth = null;
      state.userInfo = null;
      localStorage.removeItem("TokenAuth");
    },
  },
});

export const { setUserInfo, updateUserName, resetUserInfo, logout } =
  userSlice.actions;
export default userSlice.reducer;
