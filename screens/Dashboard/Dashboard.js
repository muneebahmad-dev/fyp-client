import Input from "antd-mobile/lib/input-item/Input";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import NotificationsTab from "../Orders/NotificationsTab";
import OrdersTab from "../Orders/OrdersTab";
import ProfileTab from "../Profile/ProfileTab";
import HomeTab from "../Home/HomeTab";

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
