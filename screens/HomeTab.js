import * as React from "react";
import * as DocumentPicker from "expo-document-picker";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Button, StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RadioButton, TextInput } from "react-native-paper";
const HomeTab = (props) => {
  const [checked, setChecked] = React.useState("first");
  const [Document, setDocument] = React.useState("first");

  const pickDocument = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    alert(result.uri);
    console.log(result);
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
          value="first"
          status={checked === "first" ? "checked" : "unchecked"}
          onPress={() => setChecked("first")}
        />
        <Text style={{ fontSize: 20, marginRight: "3%" }}> Color </Text>

        <RadioButton
          title="Black and White"
          value="second"
          status={checked === "second" ? "checked" : "unchecked"}
          onPress={() => setChecked("second")}
        />
        <Text style={{ fontSize: 20 }}> Black/White </Text>
      </View>

      <Text style={styles.text}>
        <AntDesign name="upcircle" size={24} color="black" /> Urgent Service{" "}
      </Text>
      <View style={{ flexDirection: "row", fontSize: 20 }}>
        <RadioButton
          title="Color"
          value="first"
          status={Document === "first" ? "checked" : "unchecked"}
          onPress={() => setDocument("first")}
        />
        <Text style={{ padding: 3, fontSize: 20, marginRight: "3%" }}>
          {" "}
          Yes{" "}
        </Text>
        {/* </View>
      
      <View  style={{ flexDirection:'row', fontSize: 20 }}> */}
        <RadioButton
          title="Black and White"
          value="second"
          status={Document === "second" ? "checked" : "unchecked"}
          onPress={() => setDocument("second")}
        />
        <Text style={{ padding: 3, fontSize: 20 }}> No </Text>
      </View>

      <Text style={styles.text}>
        <MaterialCommunityIcons name="file-upload" size={24} color="black" />{" "}
        Upload File
      </Text>
      <View>
        <Button title="Select Document" onPress={pickDocument} />
      </View>
      <Text style={{ marginTop: "15%" }}>
        <Button title="Submit" />
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: "8%",
    flex: 1,
    alignItems: "center",
    //justifyContent: "center",
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
});
export default HomeTab;
