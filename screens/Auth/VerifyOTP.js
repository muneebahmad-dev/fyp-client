import AsyncStorage from "@react-native-async-storage/async-storage";
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
} from "react-native";
import { useToast } from "react-native-toast-notifications";
import logo from "../../assets/photo-white.png";

const VerifyUser = ({ route, navigation }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const id = route.params.id;

  const verifyOtp = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://e-photocopier-server.herokuapp.com/api/user/verifyUser",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, otp }),
        }
      );
      const responseJson = await response.json();
      if (responseJson) {
        toast.show("Account Created Successfully!");
        navigation.navigate("LogIn");
      }
    } catch (err) {
      toast.show("Entered OTP is not correct!");
    }
    setIsLoading(false);
  };
  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 305, height: 159 }} />
      <View style={styles.btnview}>
        <TextInput
          style={styles.input}
          placeholder="Enter OTP"
          secureTextEntry={true}
          autoCapitalize="none"
          placeholderTextColor="white"
          onChangeText={(e) => {
            setOtp(e);
          }}
        />
        <Text>{error}</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        disabled={!otp}
        onPress={verifyOtp}
      >
        <Text style={styles.btn}> Verify OTP </Text>
      </TouchableOpacity>
      <ActivityIndicator animating={isLoading} size="large" color="white" />
    </View>
  );
};

export default VerifyUser;

const styles = StyleSheet.create({
  input: {
    height: 50,
    width: 300,
    borderRadius: 5,
    color: "white",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2291FF",
    marginTop: "-40%",
  },
  headers: {
    fontSize: 34,
    color: "white",
    fontWeight: "bold",
    marginBottom: "6%",
  },
  signupbtn: {
    color: "#2291FF",
    fontWeight: "bold",
  },
  acc: {
    marginTop: 100,
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    marginBottom: "4%",
  },
  btnview: {
    marginTop: "20%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "white",
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
    color: "#2291FF",
    fontWeight: "bold",
    paddingHorizontal: "10%",
  },
});
