import React, { useEffect, useState } from "react";
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
import { useToast } from "react-native-toast-notifications";

const OrdersDetail = ({ route }) => {
  const item = route.params.item;

  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Pending");
  const [orderId, setOrderId] = useState();

  const toast = useToast();

  useEffect(() => {
    setOrderId(item._id);
  }, []);

  const updateOrder = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://e-photocopier-server.herokuapp.com/api/user/form/orderUpdate/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status, price }),
        }
      );
      const responseJson = await response.json();
      console.log(responseJson);
      toast.show("Order Updated Successfully!");
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
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
      <TouchableOpacity style={styles.button} onPress={() => updateOrder()}>
        <Text style={styles.btn}> Submit </Text>
      </TouchableOpacity>
      <ActivityIndicator animating={isLoading} color="#2291FF" size="large" />
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
