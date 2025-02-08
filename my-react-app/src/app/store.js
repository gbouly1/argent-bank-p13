import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feature/auth.slice";
import userReducer from "../feature/user.slice";

const store = configureStore({
  reducer: {
    auth: authReducer, // Gestion du token
    user: userReducer, // Gestion des infos utilisateur
  },
});

export default store;
