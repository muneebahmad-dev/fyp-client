import * as React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { List } from "react-native-paper";
const NotificationsTab = (props) => {
  return (
    <View>
      <Text>
        {" "}
        <List.Item
          title="Order#1"
          description="Your Order Has been delivered"
          left={(props) => <List.Icon {...props} icon="gmail" />}
        />
        <List.Item
          title="Order#1"
          description="Your Order Has been Successfully placed"
          left={(props) => <List.Icon {...props} icon="gmail" />}
        />
        <List.Item
          title="Order#2"
          description="Your Order Has been delivered"
          left={(props) => <List.Icon {...props} icon="gmail" />}
        />
        <List.Item
          title="Order#2"
          description="Your Order Has been Successfully placed"
          left={(props) => <List.Icon {...props} icon="gmail" />}
        />
        <List.Item
          title="Order#3"
          description="Your Order Has been delivered"
          left={(props) => <List.Icon {...props} icon="gmail" />}
        />
        <List.Item
          title="Order#3"
          description="Your Order Has been Successfully placed"
          left={(props) => <List.Icon {...props} icon="gmail" />}
        />
        <List.Item
          title="Order#4"
          description="Your Order Has been delivered"
          left={(props) => <List.Icon {...props} icon="gmail" />}
        />
        <List.Item
          title="Order#4"
          description="Your Order Has been Successfully placed"
          left={(props) => <List.Icon {...props} icon="gmail" />}
        />
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
});
export default NotificationsTab;
