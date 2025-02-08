import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  TokenAuth: localStorage.getItem("TokenAuth")
    ? JSON.parse(localStorage.getItem("TokenAuth"))
    : null,
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthToken: (state, action) => {
      state.TokenAuth = action.payload.body.token;
      localStorage.setItem(
        "TokenAuth",
        JSON.stringify(action.payload.body.token)
      );
    },
    // setUserInfo: (state, action) => {
    //   state.userInfo = action.payload.body;
    // },
    logout: (state) => {
      state.TokenAuth = null;
      state.userInfo = null;
      localStorage.removeItem("TokenAuth");
    },
  },
});

export const { setAuthToken, logout, setUserInfo } = authSlice.actions;

export default authSlice.reducer;
