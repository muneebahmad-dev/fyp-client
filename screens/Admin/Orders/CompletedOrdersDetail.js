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
const CompletedOrdersDetail = ({ route }) => {
  const item = route.params.item;

  const [isLoading, setIsLoading] = useState(false);
  const [price, setPrice] = useState("");
  const [status, setStatus] = useState("Pending");
  const [orderId, setOrderId] = useState();

  const toast = useToast();

  useEffect(() => {
    setOrderId(item._id);
  }, [route]);

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
          <Text style={Styles.headerText}>Order Status</Text>
          <View style={Styles.headerIconContainer}>
            <TouchableOpacity style={Styles.headerBtn}>
              {/* <AntDesign name="setting" size={28} color="white" /> */}
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={Styles.mainContent}>
        <Text style={{ fontSize: 15, color: "black" }}>
          Tap on URL to Download the file
        </Text>
        <TouchableOpacity
          style={Styles.button}
          onPress={() => Linking.openURL(item.filePath)}
        >
          <Text style={Styles.btn}> URL: {item.filePath}</Text>
        </TouchableOpacity>
        <Text style={Styles.heading}>File name: {item.fileName} </Text>
        <Text style={Styles.heading}>Order Status: {item.status}</Text>
        <Text style={Styles.heading}>
          Order Placed Time and Date:{" "}
          {item?.orderUpdatedTimeStamp || item?.orderCreatedTimeStamp}
        </Text>
        <Text style={Styles.heading}>
          Order Instructions: {item?.instructions}
        </Text>
        <Text style={Styles.heading}>Total Pages: {item?.pages}</Text>
        <Text style={Styles.heading}>Total Price Paid: {item?.price}</Text>
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
  heading: { fontSize: 16, marginTop: "2%", fontWeight: "bold" },
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
export default CompletedOrdersDetail;
