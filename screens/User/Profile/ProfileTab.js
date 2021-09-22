import React, { useEffect, useState } from "react";
import { Alert, Linking, ActivityIndicator } from "react-native";
import { Image } from "react-native";
import { SafeAreaView, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { StyleSheet, Text } from "react-native";
import { auth_logout } from "../../Auth/AuthSlice";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
const ProfileTab = ({ navigation }) => {
  const [id, setId] = useState("");
  const [userData, setUserData] = useState("");
  const [image, setImage] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const profileId = useSelector((state) => state);

  const storage = async () => {
    try {
      const userState = await AsyncStorage.getItem("e-photocopier_auth_data");
      const obj = JSON.parse(userState);
      console.log(obj, "async");
      setId(obj._id);
      getUser();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    storage();
  }, [id, userData]);

  const logoutHandler = () => {
    Alert.alert("Hold On", "Are you sure you want to logout?", [
      {
        text: "Cancel",
        onPress: () => null,
        style: "cancel",
      },
      {
        text: "YES",
        onPress: async () => {
          navigation.navigate("Welcome");
          try {
            await AsyncStorage.removeItem("e-photocopier_auth_data");
          } catch (err) {
            console.log(err);
          }
        },
      },
    ]);

    // dispatch(auth_logout());
    return true;
  };

  const getUser = async () => {
    try {
      const response = await fetch(
        `http://e-photocopier-server.herokuapp.com/api/user/getUserById/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseJson = await response.json();
      setUserData(responseJson?.message);
      // console.log(responseJson, "hello");
    } catch (err) {
      console.log(err);
    }
  };

  const changeProfileImg = async (result) => {
    setIsLoading(true);
    const formData = new FormData();
    console.log(result, "image");
    // setIsLoading(true);
    formData.append("file", {
      uri: result?.uri,
      type: "image/jpg",
      name: result?.name || "profileImg",
    });
    formData.append("userId", id);
    try {
      const response = await fetch(
        "http://e-photocopier-server.herokuapp.com/api/user/uploadProfileImg",
        {
          method: "PATCH",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const responseJson = await response.json();
      console.log(responseJson);
      setImage(" ");
    } catch (err) {
      console.log(err);
    }
    setIsLoading(false);
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
    });
    if (result) changeProfileImg(result);
    setImage(result);
  };
  // console.log(userData, "ss");
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
          <Text style={Styles.headerText}>User Profile</Text>
          <View style={Styles.headerIconContainer}>
            <TouchableOpacity style={Styles.headerBtn}>
              {/* <AntDesign name="setting" size={28} color="white" /> */}
            </TouchableOpacity>
          </View>
        </View>
        <View style={Styles.headerImageContainer}>
          <View style={Styles.ImageContainer}>
            <TouchableOpacity onPress={() => pickImage()}>
              <Image
                source={{
                  uri: userData.image ? userData?.image : image?.uri,
                }}
                style={Styles.Image}
              />
              <ActivityIndicator
                animating={isLoading}
                color="#2291FF"
                size={"large"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={Styles.mainContent}>
        <View style={Styles.IdMain}>
          <View style={Styles.InvSpace}></View>
          <View style={Styles.IdDetails}>
            <Text
              style={{
                fontSize: 22,
                color: "black",
                marginTop: 60,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Name:</Text> {userData.name}
            </Text>
            <Text
              style={{
                fontSize: 22,

                color: "black",
                marginTop: 20,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Email:</Text>{" "}
              {userData.email}
            </Text>
            <TouchableOpacity
              onPress={() => Linking.openURL(`tel:${userData.phonenumber}`)}
            >
              <Text
                style={{
                  fontSize: 22,

                  color: "black",
                  marginTop: 20,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Phone Number:</Text>{" "}
                {userData.phonenumber}
              </Text>
            </TouchableOpacity>

            {userData?.role == "user" && (
              <Text
                style={{
                  fontSize: 22,

                  color: "black",
                  marginTop: 20,
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Orders:</Text>{" "}
                {userData?.order?.length}
              </Text>
            )}
            <Text
              style={{
                fontSize: 22,

                color: "black",
                marginTop: 20,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Username:</Text>{" "}
              {userData.username}
            </Text>
          </View>
        </View>
        <View style={Styles.logoutBtn}>
          <TouchableOpacity
            style={Styles.button}
            onPress={() => navigation.navigate("Change Password")}
          >
            <Text style={Styles.btn}> Change Password </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.button}
            onPress={() => logoutHandler()}
          >
            <Text style={Styles.btn}> Logout </Text>
          </TouchableOpacity>
        </View>
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
    padding: 9,
    paddingLeft: 20,
    paddingRight: 20,
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
    flex: 1,
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
    flex: 3,
    // paddingTop: 20,
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
export default ProfileTab;
