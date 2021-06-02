import Input from "antd-mobile/lib/input-item/Input";
import React from "react";
import { RadioButton } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import NotificationsTab from "../screens/NotificationsTab";
import OrdersTab from "../screens/OrdersTab";
import ProfileTab from "../screens/ProfileTab";
import HomeTab from "../screens/HomeTab";

const Tab = createMaterialTopTabNavigator();

const Dashboard = () => {
  const [checked, setChecked] = React.useState("");
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
      <Tab.Screen name="Notifications" component={NotificationsTab} />
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
