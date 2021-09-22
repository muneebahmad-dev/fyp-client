import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useConfirmPayment } from "@stripe/stripe-react-native";
import { CreditCardInput } from "react-native-credit-card-input";
import { useToast } from "react-native-toast-notifications";
import { TouchableOpacity } from "react-native-gesture-handler";

const PaymentCheckout = ({ route }) => {
  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const toast = useToast();
  const orderId = Math.floor(100000 + Math.random() * 900000);

  const { confirmPayment, loading } = useConfirmPayment();
  var stripe = require("stripe-client")(
    "pk_test_51JSIrsJjrHq2X63xPAZocPXOwO3f9AhBm98P9PmMcafYWsIamiZtEADfWUggNOxw57UHSxvGScLu4Pgi6EF7PGz400Jzohpu3N"
  );

  const submitHandler = async () => {
    console.log(route.params.file);
    const formData = new FormData();
    formData.append("file", {
      uri: route.params.file.uri,
      type: "image/jpg",
      name: route.params.file.name,
    });
    formData.append("user", route.params.id);
    formData.append("instructions", route.params.instructions);
    formData.append("pages", route.params.pages);
    formData.append("urgent", route.params.urgent);
    formData.append("documentType", route.params.documentType);
    formData.append("orderId", orderId);

    try {
      const response = await fetch(
        "http://e-photocopier-server.herokuapp.com/api/user/form/fileupload",
        {
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const responseJson = await response.json();
      console.log(responseJson);
      if (responseJson._id) {
        toast.show("Order placed Successfully!");
      }

      setEmail("");
      setCardDetails("");
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPaymentIntentClientSecret = async () => {
    const reqBody = { pages: route.params.pages, orderId: orderId };
    const response = await fetch(
      "https://e-photocopier-server.herokuapp.com/api/user/form/orderPayment",
      {
        method: "POST",
        body: reqBody,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    setIsLoading(true);
    const expiry = cardDetails.values.expiry;
    const exp_month = expiry.split("/")[0];
    const exp_year = expiry.split("/")[1];

    var information = {
      card: {
        number: cardDetails.values.number,
        exp_month: exp_month,
        exp_year: exp_year,
        cvc: cardDetails.values.cvc,
      },
    };
    const card = await stripe.createToken(information);
    const token = card.id;
    // 1.Gather the customer's billing information (e.g., email)
    if (!cardDetails?.valid || !email) {
      Alert.alert("Please enter Complete card details and Email");
      return;
    }
    const billingDetails = {
      email: email,
    };
    //2.Fetch the intent client secret from the backend
    try {
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();
      //2. confirm the payment
      if (error) {
        console.log("Unable to process payment");
      } else {
        const { paymentIntent, error } = await confirmPayment(clientSecret, {
          type: "Card",
          billingDetails: billingDetails,
          token: token,
        });
        if (error) {
          console.log(error, "error");
          alert(`Payment Confirmation Error ${error.message}`);
        } else if (paymentIntent) {
          submitHandler();
          toast.show("Payment Successful");
          console.log("Payment successful ", paymentIntent);
        }
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
    //3.Confirm the payment with the card details
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="E-mail"
        keyboardType="email-address"
        onChange={(value) => setEmail(value.nativeEvent.text)}
        style={styles.input}
      />
      <CreditCardInput
        autoFocus
        requiresCVC
        cardScale={1.0}
        validColor={"black"}
        invalidColor={"red"}
        placeholderColor={"darkgray"}
        onChange={(e) => setCardDetails(e)}
      />
      <TouchableOpacity style={styles.button} onPress={handlePayPress}>
        <Text style={styles.btn}> Pay </Text>
      </TouchableOpacity>
      <ActivityIndicator animating={isLoading} color="#2291FF" size={"large"} />
    </View>
  );
};
export default PaymentCheckout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    margin: 20,
  },
  input: {
    backgroundColor: "#efefefef",
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 20,
    height: 50,
    padding: 10,
  },
  card: {
    backgroundColor: "#efefefef",
  },
  cardContainer: {
    height: 50,
    marginVertical: 30,
  },
  button: {
    alignItems: "center",
    backgroundColor: "#2291FF",
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
    color: "#FFFF",
    fontWeight: "bold",
    marginHorizontal: "10%",
  },
});
