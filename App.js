import React, { useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import store from "./redux/store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, SignUpScreen } from "./screens/Auth/Authentication";
import Dashboard from "./screens/User/Dashboard/Dashboard";
import WelcomeScreen from "./screens/Welcome/Welcome";
import { Provider } from "react-redux";
import AdminDashboard from "./screens/Admin/AdminDashboard";
import ForgotPasswordScreen from "./screens/Auth/ForgotPassword";
import OrdersDetail from "./screens/Admin/Orders/OrderDetails";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ToastProvider } from "react-native-toast-notifications";
import ChangePasswordScreen from "./screens/Auth/ChangePassword";
import CompletedOrdersDetail from "./screens/Admin/Orders/CompletedOrdersDetail";
import VerifyUser from "./screens/Auth/VerifyOTP";

// import firebase from "@react-native-firebase/app";
// import "@react-native-firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyCzFC6z3PUnpdbFhMooSJlsKk2fZHlh-CQ",
//   authDomain: "e-photocopier.firebaseapp.com",
//   projectId: "e-photocopier",
//   storageBucket: "e-photocopier.appspot.com",
//   messagingSenderId: "770827431066",
//   appId: "1:770827431066:web:4f06cdeaa8012711bf8323",
//   measurementId: "G-MQ8XH6DJXG",
// };

// firebase.initializeApp(firebaseConfig);

const Stack = createStackNavigator();

const App = ({ navigation }) => {
  // useEffect(async () => {
  //   const getStorage = await AsyncStorage.getItem("e-photocopier_auth_data");
  //   if (getStorage) {
  //     const obj = JSON.parse(getStorage);
  //     if (obj.role == "user") {
  //       navigation.navigate("Home");
  //     }
  //     if (obj.role == "admin") {
  //       navigation.navigate("Admin Home");
  //     }
  //   }
  // }, []);
  return (
    <Provider store={store}>
      <ToastProvider>
        <NavigationContainer styles={styles.container}>
          <Stack.Navigator tintColor={"white"}>
            <Stack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{
                headerStyle: {
                  backgroundColor: "#2291FF",
                },
                headerTitleStyle: {
                  color: "white",
                },
                headerTintColor: "#ffffff",
              }}
            />
            <Stack.Screen
              name="LogIn"
              component={LoginScreen}
              options={{
                headerStyle: {
                  backgroundColor: "#2291FF",
                },
                headerTitleStyle: {
                  color: "white",
                },
                headerTintColor: "#ffffff",
              }}
            />
            <Stack.Screen
              name="Signup"
              component={SignUpScreen}
              options={{
                headerStyle: {
                  backgroundColor: "#2291FF",
                },
                headerTitleStyle: {
                  color: "white",
                },
                headerTintColor: "#ffffff",
              }}
            />
            <Stack.Screen
              name="Forgot Password"
              component={ForgotPasswordScreen}
              options={{
                headerStyle: {
                  backgroundColor: "#2291FF",
                },
                headerTitleStyle: {
                  color: "white",
                },
                headerTintColor: "#ffffff",
              }}
            />
            <Stack.Screen
              name="Home"
              component={Dashboard}
              options={{
                headerStyle: {
                  backgroundColor: "#2291FF",
                },
                headerTitleStyle: {
                  color: "white",
                },
                headerLeft: () => null,
                headerTintColor: "#ffffff",
              }}
            />

            <Stack.Screen
              name="Admin Home"
              component={AdminDashboard}
              options={{
                headerStyle: {
                  backgroundColor: "#2291FF",
                },
                headerTitleStyle: {
                  color: "white",
                },
                headerLeft: () => null,
                headerTintColor: "#ffffff",
              }}
            />
            <Stack.Screen
              name="Order Detail"
              component={OrdersDetail}
              options={{
                headerStyle: {
                  backgroundColor: "#2291FF",
                },
                headerTitleStyle: {
                  color: "white",
                },
                headerTintColor: "#ffffff",
              }}
            />
            <Stack.Screen
              name="Orders Detail"
              component={CompletedOrdersDetail}
              options={{
                headerStyle: {
                  backgroundColor: "#2291FF",
                },
                headerTitleStyle: {
                  color: "white",
                },
                headerTintColor: "#ffffff",
              }}
            />
            <Stack.Screen
              name="Change Password"
              component={ChangePasswordScreen}
              options={{
                headerStyle: {
                  backgroundColor: "#2291FF",
                },
                headerTitleStyle: {
                  color: "white",
                },
                headerTintColor: "#ffffff",
              }}
            />
            <Stack.Screen
              name="Verify OTP"
              component={VerifyUser}
              options={{
                headerStyle: {
                  backgroundColor: "#2291FF",
                },
                headerTitleStyle: {
                  color: "white",
                },
                headerTintColor: "#ffffff",
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ToastProvider>
    </Provider>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textstyles: {
    color: "white",
  },
});
export default App;
