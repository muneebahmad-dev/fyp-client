import React, { useState } from "react";
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Linking,
} from "react-native";
import { RadioButton } from "react-native-paper";

const OrdersDetail = ({ route }) => {
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Pending");
  const item = route.params.item;
  return (
    <View style={styles.container}>
      <View style={styles.btnview}>
        <Text>Orders</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => Linking.openURL(item.filePath)}
      >
        <Text style={styles.btn}> {item.filePath}</Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Price"
        autoCapitalize="none"
        placeholderTextColor="#2291FF"
        onChangeText={(e) => {
          setPrice(e);
        }}
      />
      <View style={{ flexDirection: "row" }}>
        <RadioButton
          title="Pending"
          value="Pending"
          status={status === "Pending" ? "checked" : "unchecked"}
          onPress={() => setStatus("Pending")}
        />
        <Text style={{ fontSize: 20, marginRight: "3%" }}> Pending </Text>

        <RadioButton
          title="Placed"
          value="Placed"
          status={status === "Placed" ? "checked" : "unchecked"}
          onPress={() => setStatus("Placed")}
        />
        <Text style={{ fontSize: 20 }}> Placed </Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.btn}> Submit </Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrdersDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    marginTop: "-40%",
  },
  input: {
    height: 50,
    width: 300,
    borderRadius: 5,
    color: "#2291FF",
    borderBottomColor: "#2291FF",
    borderBottomWidth: 1,
    justifyContent: "center",
  },
  btnview: {
    marginTop: "20%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#2291FF",
    marginTop: "7%",
    padding: 9,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 7,
  },
  btn: {
    color: "#fff",
    fontWeight: "bold",
    paddingHorizontal: "10%",
  },
});
