import * as React from "react";
import { StyleSheet, Text } from "react-native";
import store from "./redux/store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, SignUpScreen } from "./screens/Auth/Authentication";
import Dashboard from "./screens/Dashboard/Dashboard";
import WelcomeScreen from "./screens/Welcome/Welcome";
import { Provider } from "react-redux";
import AdminDashboard from "./screens/Admin/AdminDashboard";

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

const App = (props) => {
  return (
    <Provider store={store}>
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

              headerTintColor: "#ffffff",
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
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
