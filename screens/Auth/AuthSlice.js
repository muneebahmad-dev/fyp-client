import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage, {
  useAsyncStorage,
} from "@react-native-async-storage/async-storage";

export const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    authState: "",
  },
  reducers: {
    auth_login: async (state, { payload }) => {
      state.authState = payload;
    },
    auth_logout: async (state, { payload }) => {
      state.authState = "";
      try {
        await AsyncStorage.removeItem("e-photocopier_auth_data");
        const data = await AsyncStorage.removeItem("e-phtocopier_auth_data");
      } catch (err) {
        console.log(err);
      }
    },
  },
});
export const { auth_login, auth_logout } = AuthSlice.actions;
export default AuthSlice.reducer;
