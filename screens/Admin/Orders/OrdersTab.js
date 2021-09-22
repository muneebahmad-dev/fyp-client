import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const OrdersTab = ({ navigation }) => {
  const [orders, setOrders] = useState("");
  const [urgentOrder, setUrgentOrder] = useState("");

  const [id, setId] = useState("");

  const storage = async () => {
    const userState = await AsyncStorage.getItem("e-photocopier_auth_data");
    const obj = JSON.parse(userState);
    setId(obj._id);
  };

  const getOrders = async () => {
    try {
      const response = await fetch(
        `http://e-photocopier-server.herokuapp.com/api/user/form/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseJson = await response.json();
      const urgentOrder = responseJson.filter((list) => {
        return list.urgent == "urgent" && list.status == "Pending";
      });
      const order = responseJson.filter((list) => {
        return list.urgent == "no" && list.status == "Pending";
      });
      setOrders(order);
      setUrgentOrder(urgentOrder);
    } catch (err) {
      console.log(err);
    }
  };

  const orderDetailHandler = (item) => {
    navigation.navigate("Order Detail", { item: item });
  };

  useEffect(() => {
    storage();
  }, []);
  useEffect(() => {
    getOrders();
  }, [id, orders]);
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
          <Text style={Styles.headerText}>Orders</Text>
          <View style={Styles.headerIconContainer}>
            <TouchableOpacity style={Styles.headerBtn}></TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={Styles.mainContent}>
        <Text style={Styles.orderHeading}>Urgent Orders</Text>
        {urgentOrder.length != 0 ? (
          <FlatList
            data={urgentOrder}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => (
              <View style={Styles.flatlist}>
                <TouchableOpacity
                  onPress={() => orderDetailHandler(item)}
                  style={Styles.orderDetail}
                >
                  <Text numberOfLines={1} style={Styles.orderText}>
                    {" "}
                    Order: {item.fileName}
                  </Text>
                  <Text style={Styles.orderText}>
                    {" "}
                    Order Status: {item.status}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              fontStyle: "italic",
              textAlign: "center",
              margin: "10%",
            }}
          >
            No Urgent Order Found
          </Text>
        )}
        <Text style={Styles.orderHeading}>Normal Orders</Text>
        {orders.length != 0 ? (
          <FlatList
            data={orders}
            keyExtractor={(item) => item._id}
            renderItem={({ item, index }) => (
              <View style={Styles.flatlist}>
                <TouchableOpacity
                  onPress={() => orderDetailHandler(item)}
                  style={Styles.orderDetail}
                >
                  <Text style={Styles.orderText} numberOfLines={1}>
                    {" "}
                    Order ID: {item?.orderId}
                  </Text>
                  <Text style={Styles.orderText} numberOfLines={1}>
                    {" "}
                    Order: {item.fileName}
                  </Text>
                  <Text style={Styles.orderText}>
                    Order Status: {item.status}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        ) : (
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              fontStyle: "italic",
              textAlign: "center",
              margin: "10%",
            }}
          >
            No Orders Found
          </Text>
        )}
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
  orderHeading: {
    fontSize: 27,
    fontWeight: "bold",
  },
  flatlist: {
    backgroundColor: "#2291FF",
    marginTop: "4%",
    borderRadius: 15,
  },
  orderDetail: {
    flexDirection: "column",
    padding: 10,
    height: 80,
  },
  orderText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "bold",
    // paddingRight: 10,
    paddingHorizontal: 10,
    color: "white",
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
    fontWeight: "bold",
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
    flex: 6,
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

export default OrdersTab;
