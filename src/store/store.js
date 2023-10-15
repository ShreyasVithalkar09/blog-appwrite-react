import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";

const store = configureStore({
  devTools: true,
  reducer: {
    auth: authSlice,
  },
});

export default store;
