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
  },
});

export const { setUserInfo, updateUserName } = userSlice.actions;
export default userSlice.reducer;
