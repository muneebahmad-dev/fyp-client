import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import OrdersTab from "../Orders/OrdersTab";
import ProfileTab from "../Profile/ProfileTab";
import HomeTab from "../Home/HomeTab";

const Tab = createMaterialTopTabNavigator();

const AdminDashboard = () => {
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
      {/* <Tab.Screen name="Notifications" component={NotificationsTab} /> */}
      <Tab.Screen name="Orders" component={OrdersTab} />
      <Tab.Screen name="Profile" component={ProfileTab} />
    </Tab.Navigator>
  );
};

export default AdminDashboard;
