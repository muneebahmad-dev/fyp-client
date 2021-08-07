import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    authState: null,
  },
  reducers: {
    auth_login: (state, { payload }) => {
      state.authState = payload;
      AsyncStorage.setItem("e-photocopier_auth", payload);
      console.log(payload, "payload");
      console.log("async storage", AsyncStorage.getItem("e-photocopier_auth"));
    },
    auth_logout: (state, { payload }) => {
      state.authState = null;
    },
  },
});
export const { auth_login, auth_logout } = AuthSlice.actions;
export default AuthSlice.reducer;
