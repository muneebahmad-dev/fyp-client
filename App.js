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
import { StripeProvider } from "@stripe/stripe-react-native";

import firebase from "firebase/app";
import PaymentCheckout from "./screens/User/Home/paymentCheckout";

const Stack = createStackNavigator();

const App = ({ navigation }) => {
  useEffect(() => {
    var firebaseConfig = {
      apiKey: "AIzaSyDIWaM09fJjY0hn0kXBhI-Ds-k9IUv2SyE",
      authDomain: "e-photocopier-d4555.firebaseapp.com",
      projectId: "e-photocopier-d4555",
      storageBucket: "e-photocopier-d4555.appspot.com",
      messagingSenderId: "775987527894",
      appId: "1:775987527894:web:bad64589e8a70da5890977",
      measurementId: "G-ZZP2W5EWHZ",
    };
    firebase.initializeApp(firebaseConfig);
    // if (firebase.app.length === 0) {
    //   firebase.initializeApp(firebaseConfig);
    // }
  }, []);
  return (
    <Provider store={store}>
      <ToastProvider>
        <StripeProvider publishableKey="pk_test_51JSIrsJjrHq2X63xPAZocPXOwO3f9AhBm98P9PmMcafYWsIamiZtEADfWUggNOxw57UHSxvGScLu4Pgi6EF7PGz400Jzohpu3N">
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
              <Stack.Screen
                name="Payment Checkout"
                component={PaymentCheckout}
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
        </StripeProvider>
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
