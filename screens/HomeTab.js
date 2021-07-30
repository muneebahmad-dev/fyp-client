import React, { useState } from "react";
import * as DocumentPicker from "expo-document-picker";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Button, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RadioButton, TextInput } from "react-native-paper";
const HomeTab = (props) => {
  const [documentType, setDocumentType] = useState("blackWhite");
  const [urgent, setUrgent] = useState("urgentNo");
  const [file, setFile] = useState("");

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    setFile(result);
    console.log(result);
  };

  const submitHandler = () => {
    console.log(
      "urgent: ",
      urgent,
      " document type: ",
      documentType,
      "filename",
      file
    );
  };
  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        <Text>
          <AntDesign name="cloudupload" size={34} color="black" />
        </Text>{" "}
        Upload Document
      </Text>

      <Text style={styles.text}>
        <Text>
          <Ionicons name="document" size={24} color="black" />{" "}
        </Text>
        {""}
        Document Type{" "}
      </Text>
      <View
        style={{ flexDirection: "row", fontSize: 20, alignItems: "center" }}
      >
        <RadioButton
          title="Color"
          value="color"
          status={documentType === "color" ? "checked" : "unchecked"}
          onPress={() => setDocumentType("color")}
        />
        <Text style={{ fontSize: 20, marginRight: "3%" }}> Color </Text>

        <RadioButton
          title="Black and White"
          value="blackWhite"
          status={documentType === "blackWhite" ? "checked" : "unchecked"}
          onPress={() => setDocumentType("blackWhite")}
        />
        <Text style={{ fontSize: 20 }}> Black/White </Text>
      </View>

      <Text style={styles.text}>
        <AntDesign name="upcircle" size={24} color="black" /> Urgent Service{" "}
      </Text>
      <View style={{ flexDirection: "row", fontSize: 20 }}>
        <RadioButton
          title="urgent"
          value="urgent"
          status={urgent === "urgent" ? "checked" : "unchecked"}
          onPress={() => setUrgent("urgent")}
        />
        <Text style={{ padding: 3, fontSize: 20, marginRight: "3%" }}>
          {" "}
          Yes{" "}
        </Text>
        {/* </View>
      
      <View  style={{ flexDirection:'row', fontSize: 20 }}> */}
        <RadioButton
          title="urgent"
          value="urgentNo"
          status={urgent === "urgentNo" ? "checked" : "unchecked"}
          onPress={() => setUrgent("urgentNo")}
        />
        <Text style={{ padding: 3, fontSize: 20 }}> No </Text>
      </View>

      <Text style={styles.text}>
        <MaterialCommunityIcons name="file-upload" size={24} color="black" />{" "}
        Upload File
      </Text>
      <Text>{file.name}</Text>
      <TouchableOpacity style={styles.buttonDocs} onPress={pickDocument}>
        <Text style={styles.btn}> Upload File </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={submitHandler}>
        <Text style={styles.btn}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: "8%",
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    marginBottom: "10%",
    marginTop: "10%",
    fontSize: 20,
  },
  btn: {
    color: "#ffffff",
    fontWeight: "bold",
    marginHorizontal: "10%",
  },
  buttonDocs: {
    alignItems: "center",
    backgroundColor: "#2291FF",
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
  button: {
    alignItems: "center",
    backgroundColor: "#2291FF",
    marginTop: "10%",
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
});
export default HomeTab;
