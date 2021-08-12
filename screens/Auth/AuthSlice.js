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
      // const jsonPayload = JSON.stringify(payload);
      // try {
      //   await AsyncStorage.setItem("e-photocopier_auth_data", jsonPayload);
      // } catch (err) {
      //   console.log(err);
      // }
      console.log(state.authState, "authstate");
    },
    auth_logout: async (state, { payload }) => {
      state.authState = "";
      try {
        await AsyncStorage.removeItem("e-photocopier_auth_data");
        const data = await AsyncStorage.removeItem("e-phtocopier_auth_data");
        console.log(data, "after removing");
      } catch (err) {
        console.log(err);
      }
      console.log(state.authState);
    },
  },
});
export const { auth_login, auth_logout } = AuthSlice.actions;
export default AuthSlice.reducer;
