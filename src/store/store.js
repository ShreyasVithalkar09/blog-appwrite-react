import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import postSlice from "./features/postSlice";

const store = configureStore({
  devTools: true,
  reducer: {
    auth: authSlice,
    post: postSlice,
  },
});

export default store;
