import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { useConfirmPayment } from "@stripe/stripe-react-native";
import { CreditCardInput } from "react-native-credit-card-input";

const PaymentCheckout = (props) => {
  const [email, setEmail] = useState();
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();
  var stripe = require("stripe-client")(
    "pk_test_51JSIrsJjrHq2X63xPAZocPXOwO3f9AhBm98P9PmMcafYWsIamiZtEADfWUggNOxw57UHSxvGScLu4Pgi6EF7PGz400Jzohpu3N"
  );

  const fetchPaymentIntentClientSecret = async () => {
    const response = await fetch(
      "https://e-photocopier-server.herokuapp.com/api/user/form/orderPayment",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
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
          alert("Payment Successful");
          console.log("Payment successful ", paymentIntent);
        }
      }
    } catch (e) {
      console.log(e);
    }
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
      <Button onPress={handlePayPress} title="Pay" disabled={loading} />
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
});
