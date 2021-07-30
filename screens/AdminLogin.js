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
const AdminLogin = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [error, setError] = useState("");
  const login = async () => {
    try {
      const response = await fetch(
        "http://e-photocopier-server.herokuapp.com/api/login",
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
        setToken(responseJson?.token);
        navigation.navigate("Home");
        console.log("You are logged in");
      } else {
        setError(responseJson?.message);
        console.log(responseJson?.message);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 305, height: 159 }} />
      {/* <Text style={styles.headers}>E-Photocopier Admin</Text> */}
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
      <TouchableOpacity
        style={styles.button}
        //onPress={login}
        onPress={login}
      >
        <Text style={styles.btn}> Sign In </Text>
      </TouchableOpacity>
      {/* <Text style={styles.signinbtn}>
          {" "}
          <Button
            style={styles.signbtn}
            title="SIGN IN"
            onPress={() => navigation.navigate("Home")}
          />{" "}
        </Text> */}
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
export default AdminLogin;

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
  },
});
