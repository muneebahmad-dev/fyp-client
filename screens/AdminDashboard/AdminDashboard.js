import React, { useEffect } from "react";
import { BackHandler, Alert } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import OrdersTab from "../Orders/OrdersTab";
import ProfileTab from "../Profile/ProfileTab";
import HomeTab from "../Home/HomeTab";
import ChatTab from "../Orders/ChatTab";
import { useDispatch } from "react-redux";
import { auth_logout } from "../Auth/AuthSlice";

const Tab = createMaterialTopTabNavigator();

const AdminDashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(auth_logout);
    navigation.navigate("LogIn");
  };
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold On!", "Are you sure you want to logout?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "YES",
          onPress: () => logoutHandler(),
        },
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
      {/* <Tab.Screen name="Home" component={HomeTab} /> */}
      <Tab.Screen name="Orders" component={OrdersTab} />
      <Tab.Screen name="Chat" component={ChatTab} />
      <Tab.Screen name="Profile" component={ProfileTab} />
    </Tab.Navigator>
  );
};

export default AdminDashboard;
