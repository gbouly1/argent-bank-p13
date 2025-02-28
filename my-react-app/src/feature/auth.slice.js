import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  TokenAuth: localStorage.getItem("TokenAuth")
    ? JSON.parse(localStorage.getItem("TokenAuth"))
    : null,
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
    logout: (state) => {
      state.TokenAuth = null;
      localStorage.removeItem("TokenAuth");
    },
  },
});

export const { setAuthToken, logout } = authSlice.actions;

export default authSlice.reducer;
