// Login.js
import * as Font from "expo-font";
import { useDispatch, useSelector } from "react-redux";
import { auth_login } from "./AuthSlice";
import React, { useState } from "react";
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import logo from "../../assets/photo-white.png";
import jwtDecode from "jwt-decode";
import { useToast } from "react-native-toast-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const login = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://e-photocopier-server.herokuapp.com/api/user/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      const responseJson = await response.json();
      if (responseJson?.token) {
        const decodedToken = jwtDecode(responseJson.token);
        const responseStr = JSON.stringify(decodedToken);
        await AsyncStorage.setItem("e-photocopier_auth_data", responseStr);

        if (decodedToken?.verified === false) {
          navigation.navigate("Verify OTP", { id: decodedToken?._id });
        } else {
          if (decodedToken.role === "user") {
            navigation.navigate("Home");
          }
          if (decodedToken.role == "admin") {
            navigation.navigate("Admin Home");
          }
          dispatch(auth_login(decodedToken));
        }
      }
      if (responseJson?.message) {
        setError(responseJson.message);
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 305, height: 159 }} />
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(e) => setEmail(e)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(e) => {
          setPassword(e);
        }}
      />
      <Text>{error}</Text>
      <TouchableOpacity style={styles.button} onPress={login}>
        <Text style={styles.btn}> Sign In </Text>
      </TouchableOpacity>

      <ActivityIndicator animating={isLoading} color="white" size={"large"} />
      <View style={styles.signupbtn}>
        <Text style={styles.acc}>Did you Forgot your Password?</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Forgot Password")}
        >
          <Text style={styles.btn}> Forgot Password </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const SignUpScreen = ({ navigation }) => {
  const toast = useToast();
  const [name, setName] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const image =
    "https://e-fyp.s3.amazonaws.com/19d623ee-bad5-4717-ab96-592daeef1f92-dummyimage.png";
  const signup = async (e) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "https://e-photocopier-server.herokuapp.com/api/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            username,
            password,
            phonenumber,
            image,
          }),
        }
      );
      const responseJson = await response.json();
      if (responseJson._id) {
        const id = responseJson._id;
        toast.show("OTP has been sent to the entered Email, Kindly verify");
        navigation.navigate("Verify OTP", { id: id });
      } else {
        setError(responseJson);
      }
    } catch (err) {
      // setError(err);
      // console.error(err);
    }
    setIsLoading(false);
  };
  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 205, height: 109 }} />
      <Text style={styles.headers}>Create New Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(e) => setName(e)}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(e) => setusername(e)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(e) => {
          setpassword(e);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(e) => {
          setemail(e);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChangeText={(e) => {
          setphonenumber(e);
        }}
      />
      <TouchableOpacity style={styles.button} onPress={() => signup()}>
        <Text style={styles.btn}> Sign Up </Text>
      </TouchableOpacity>
      <ActivityIndicator size={"large"} animating={isLoading} color="white" />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("LogIn")}
      >
        <Text style={styles.btn}> Go To Sign In </Text>
      </TouchableOpacity>
    </View>
  );
};
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
  },
  headers: {
    fontSize: 34,
    color: "white",
    fontWeight: "bold",
    marginBottom: "6%",
  },
  // signinbtn: {
  //   marginTop: "7%",
  // },
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
  button: {
    alignItems: "center",
    backgroundColor: "white",
    marginTop: "7%",
    padding: 9,
    paddingHorizontal: "10%",
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
    marginHorizontal: "10%",
  },
});
