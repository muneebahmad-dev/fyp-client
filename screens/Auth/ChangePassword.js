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

const ChangePasswordScreen = ({ navigation }) => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();

  const storage = async () => {
    const storage = await AsyncStorage.getItem("e-photocopier_auth_data");
    const obj = JSON.parse(storage);
    setId(obj._id);
  };

  const changePasswordApi = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        "http://e-photocopier-server.herokuapp.com/api/user/changePassword",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, password }),
        }
      );

      toast.show("Password Changed Successfully!");
    } catch (err) {
      setError(err);
      console.log(err);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    storage();
  }, []);
  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 305, height: 159 }} />
      <View style={styles.btnview}>
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
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => changePasswordApi()}
      >
        <Text style={styles.btn}> Change Password </Text>
      </TouchableOpacity>
      <ActivityIndicator animating={isLoading} size="large" color="white" />
    </View>
  );
};

export default ChangePasswordScreen;

const styles = StyleSheet.create({
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
  input: {
    height: 50,
    width: 300,
    borderRadius: 5,
    color: "white",
    borderBottomColor: "white",
    borderBottomWidth: 1,
    justifyContent: "center",
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
