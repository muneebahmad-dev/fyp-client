import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "../screens/Auth/AuthSlice";

export default configureStore({
  reducer: AuthReducer,
});
