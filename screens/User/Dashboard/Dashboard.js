import Input from "antd-mobile/lib/input-item/Input";
import React, { useEffect } from "react";
import { StyleSheet, BackHandler, Alert } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import OrdersTab from "../Orders/OrdersTab";
import ProfileTab from "../Profile/ProfileTab";
import HomeTab from "../Home/HomeTab";
import ChatTab from "../Chat/ChatTab";
import { useDispatch } from "react-redux";
import { auth_logout } from "../../Auth/AuthSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Tab = createMaterialTopTabNavigator();

const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const logoutHandler = async () => {
    // dispatch(auth_logout);
    try {
      await AsyncStorage.removeItem("e-photocopier_auth_data");
    } catch (err) {
      console.log(err);
    }
    navigation.navigate("Welcome");
  };
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold On!", "Are you sure you want to logout?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        { text: "YES", onPress: () => logoutHandler() },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, []);
  return (
    <Tab.Navigator
      tabBarOptions={{
        labelStyle: {
          fontSize: 11,
          margin: 0,
          padding: 0,
        },
      }}
    >
      <Tab.Screen name="Home" component={HomeTab} />
      <Tab.Screen name="Chat" component={ChatTab} />
      <Tab.Screen name="Orders" component={OrdersTab} />
      <Tab.Screen name="Profile" component={ProfileTab} />
    </Tab.Navigator>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    width: 22,
  },
});
