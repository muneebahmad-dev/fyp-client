import React, { useEffect, useState } from "react";
import { Alert, TouchableHighlight } from "react-native";
import { Image } from "react-native";
import {
  SafeAreaView,
  View,
  TextInput,
  ActivityIndicator,
  Linking,
  TouchableOpacity,
  StyleSheet,
  Text,
} from "react-native";
import { auth_logout } from "../../Auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  }, [route]);

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
    <SafeAreaView style={Styles.container}>
      <View style={Styles.headerContainer}>
        <View style={Styles.headerTopContainer}>
          <TouchableOpacity
            style={Styles.headerBtn}
            //  onPress={() => this.props.navigation.openDrawer()}
          >
            {/* <Octicons name="three-bars" size={28} color="white" /> */}
          </TouchableOpacity>
          <Text style={Styles.headerText}>Change Order Status</Text>
          <View style={Styles.headerIconContainer}>
            <TouchableOpacity style={Styles.headerBtn}>
              {/* <AntDesign name="setting" size={28} color="white" /> */}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={Styles.mainContent}>
        <Text style={{ fontSize: 17, color: "black" }}>
          Tap on Order Name to Download the file
        </Text>
        <TouchableOpacity
          style={Styles.button}
          onPress={() => Linking.openURL(item.filePath)}
        >
          <Text style={Styles.btn}> Order Name: {item.filePath}</Text>
        </TouchableOpacity>
        <Text style={{ fontSize: 17, marginTop: "2%" }}>
          Order Created Time: {item.orderCreatedTimeStamp}
        </Text>
        <View style={{ marginTop: "15%", marginLeft: "5%" }}>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            Placed the Order :
          </Text>
        </View>
        <View style={{ marginTop: "2%", marginLeft: "8%" }}>
          <View style={Styles.input}>
            <TextInput
              style={Styles.input}
              placeholder="Price"
              autoCapitalize="none"
              placeholderTextColor="#2291FF"
              onChangeText={(e) => {
                setPrice(e);
              }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginTop: "10%",
            justifyContent: "center",
          }}
        >
          <RadioButton
            title="Pending"
            value="Pending"
            status={status === "Pending" ? "checked" : "unchecked"}
            onPress={() => setStatus("Pending")}
          />
          <Text
            style={{
              fontSize: 20,
              marginRight: "3%",
            }}
          >
            {" "}
            Pending{" "}
          </Text>

          <RadioButton
            title="Placed"
            value="Placed"
            status={status === "Placed" ? "checked" : "unchecked"}
            onPress={() => setStatus("Placed")}
          />
          <Text style={{ fontSize: 20 }}> Placed </Text>
        </View>
        <View style={Styles.logoutBtn}>
          <TouchableOpacity style={Styles.button} onPress={() => updateOrder()}>
            <Text style={Styles.btn}> Change Status </Text>
          </TouchableOpacity>
        </View>
        <ActivityIndicator animating={isLoading} color="#2291FF" size="large" />
      </View>
    </SafeAreaView>
  );
};
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    marginTop: -69,
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
  logoutBtn: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  headerContainer: {
    paddingTop: 69,
    flex: 1,
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "column",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    backgroundColor: "#2291FF",
  },
  headerTopContainer: {
    paddingTop: 35,
    flex: 0.6,
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "row",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#2291FF",
    marginTop: "7%",
    padding: 15,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  btn: {
    color: "white",
    fontWeight: "bold",
    marginHorizontal: "10%",
  },
  headerImageContainer: {
    flex: 0.3,
    alignItems: "center",
  },
  headerBtn: {
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    fontSize: 22,
    color: "white",
    marginBottom: "6%",
  },
  headerIconContainer: {
    display: "flex",
    flexDirection: "row",
  },
  ImageContainer: {
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
  },
  Image: {
    width: 110,
    height: 110,
    resizeMode: "cover",
    borderRadius: 150 / 2,
    borderWidth: 4,
    backgroundColor: "grey",
  },
  mainContent: {
    flex: 4,
    paddingTop: 20,
  },
  IdMain: {
    flex: 1.5,
    justifyContent: "center",
  },
  IdDetails: {
    flex: 1,
    marginLeft: 10,
  },
  stats: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly",
    marginLeft: 5,
    marginRight: 5,
  },
  nhead: {
    color: "#afb8c4",
    fontSize: 15,
  },
  numbers: {
    fontSize: 25,
    color: "#53e3ab",
    fontWeight: "bold",
    textAlign: "center",
  },
  scrollHorizontal: {
    flex: 2,
    marginTop: 10,
  },
  svhButton: {
    backgroundColor: "#FFCD00",
    height: 45,
    width: 100,
    alignItems: "center",
    borderRadius: 5,
    marginLeft: 12.5,
    marginRight: 12.5,
    justifyContent: "center",
  },
  svhbuttonText: {
    fontSize: 18,
  },
  featuredContainer: {
    width: "100%",
    flex: 6,
  },
  featuredItemContainer: {
    margin: 10,
    height: 100,
    borderRadius: 5,
    flexDirection: "row",
    backgroundColor: "lightgrey",
    marginHorizontal: "auto",
  },
  featuredImage: {
    borderRadius: 5,
    resizeMode: "cover",
    padding: 5,
    width: "40%",
    height: 100,
  },
  featuredItemDetails: {
    width: "58%",
    paddingLeft: 10,
  },
  featuredHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  featuredHeadingText: {
    fontSize: 17,
    fontWeight: "bold",
    flexWrap: "wrap",
    width: "95%",
  },
  featuredHeadingIcon: {
    width: "20%",
    alignItems: "flex-end",
  },
  featuredDescription: {
    // marginVertical: 5
  },
  featuredDescriptionText: {
    fontSize: 14,
  },
  featuredDescriptionBottomText: {
    fontSize: 12,
    textAlign: "right",
  },
});
export default OrdersDetail;
