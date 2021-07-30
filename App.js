import * as React from "react";
import { StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen, SignUpScreen } from "./Components/Authentication";
import Dashboard from "./Components/Dashboard";
import WelcomeScreen from "./screens/Welcome";

const Stack = createStackNavigator();

const App = (props) => {
  return (
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
            headerTintColor: "#ffffff",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
