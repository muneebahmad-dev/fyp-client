// Login.js
import * as Font from "expo-font";
import React, { useState } from "react";
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import logo from "../assets/photo-white.png";

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const login = async () => {
    navigation.navigate("Home");
    // try {
    //   const response = await fetch(
    //     "http://e-photocopier-server.herokuapp.com/api/login",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ email, password }),
    //     }
    //   );

    //   const responseJson = await response.json();
    //   if (responseJson?.token) {
    //     setToken(responseJson?.token);
    //     navigation.navigate("Home");
    //     console.log("You are logged in");
    //   } else {
    //     setError(responseJson?.message);
    //     console.log(responseJson?.message);
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
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
      <View style={styles.signupbtn}>
        <Text style={styles.acc}>Don't Have an Account?</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Signup")}
        >
          <Text style={styles.btn}> Sign Up </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  const [phonenumber, setphonenumber] = useState("");
  const signup = async (e) => {
    try {
      const response = await fetch(
        "https://e-photocopier-server.herokuapp.com/api/signup",
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
          }),
        }
      );
      navigation.navigate("LogIn");
    } catch (err) {
      console.error(err.message);
    }
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
        onChange={(e) => setName(e.target.value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChange={(e) => setusername(e.target.value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        autoCapitalize="none"
        placeholderTextColor="white"
        onChange={(e) => {
          setpassword(e.target.value);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChange={(e) => {
          setemail(e.target.value);
        }}
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        autoCapitalize="none"
        placeholderTextColor="white"
        onChange={(e) => {
          setphonenumber(e.target.value);
        }}
      />
      <TouchableOpacity style={styles.button} onPress={() => signup}>
        <Text style={styles.btn}> Sign Up </Text>
      </TouchableOpacity>
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
    marginHorizontal: "10%",
  },
});
