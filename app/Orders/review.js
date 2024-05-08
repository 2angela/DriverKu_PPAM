import { useState, useEffect } from "react";
import firestore from "@react-native-firebase/firestore";
import { useAuth } from "../../auth/AuthProvider";
import { View, StyleSheet, Text, Image } from "react-native";
import { Button, IconButton, TextInput } from "react-native-paper";
import StarRating from "react-native-star-rating-widget";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Review({ navigation, route }) {
  const { user } = useAuth();
  const [rating, setRating] = useState();
  const [review, setReview] = useState("");
  const [customer, setCustomer] = useState("");
  const [filled, setFilled] = useState(false);
  const [date, setDate] = useState();
  const [driverID, setDriverID] = useState();
  const { orderID } = route.params;

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const customerRef = firestore().collection("Customer").doc(user?.uid);
        const customerSnapshot = await customerRef.get();
        const customerData = customerSnapshot.data();
        const orderSnapshot = await customerRef
          .collection("Order")
          .doc(orderID)
          .get();
        const orderData = orderSnapshot.data();
        setCustomer(customerData.name);
        setDate(orderData.created_at.toDate().toDateString());
        setDriverID(orderData.driverID);
        console.log("customer", customer);
        console.log("data", orderData);
      } catch (error) {
        console.error("Error fetching data:", error);
        console.log("Data:", orderData);
      }
    };

    fetchOrder();
  }, []);

  const handleCreate = async () => {
    try {
      const reviewColRef = firestore()
        .collection("Driver")
        .doc(driverID)
        .collection("Reviews");

      const updateRef = firestore()
        .collection("Customer")
        .doc(user?.uid)
        .collection("Order")
        .doc(orderID);

      await reviewColRef.add({
        customer: customer,
        rating: rating,
        review: review,
        created_at: firestore.FieldValue.serverTimestamp(),
      });

      await updateRef.update({ reviewed: true });
      navigation.push("Orders");
    } catch (error) {
      console.error("Error adding review", error);
    }
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <IconButton
          onPress={() => navigation.goBack()}
          icon="arrow-left"
          size={24}
          iconColor="#211951"
          style={{ alignSelf: "flex-start", marginLeft: 15 }}
        />
        <Text style={styles.title}>Rating and Review</Text>
        <Image
          source={require("../../assets/ratingreview.png")}
          style={styles.image}
        />
        <Text style={styles.heading}>Let's rate your journey!</Text>
        <Text style={styles.body}>{date}</Text>
        <Text style={styles.body}>Rate Your Driving Experience</Text>
        <StarRating
          rating={rating}
          onChange={(e) => {
            setFilled(true);
            setRating(e);
          }}
          style={{ paddingBottom: 20 }}
        />
        <Text style={styles.body}>Review</Text>

        <TextInput
          value={review}
          onChangeText={(e) => {
            setReview(e);
          }}
          style={styles.textbox}
          mode="outlined"
          multiline
          maxLength={100}
          placeholder="Enter your review"
        ></TextInput>
        {!filled ? null : (
          <Button
            onPress={handleCreate}
            mode="elevated"
            icon="check"
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            Done
          </Button>
        )}
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 60,
  },
  title: {
    fontSize: 32,
    fontFamily: "MontserratExtraBold",
    paddingVertical: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  heading: {
    fontFamily: "MontserratBold",
    fontSize: 20,
    paddingVertical: 5,
  },
  body: {
    fontFamily: "MontserratMedium",
    fontSize: 16,
    paddingVertical: 10,
  },
  textbox: {
    backgroundColor: "#F0F3FF",
    borderRadius: 10,
    width: "80%",
    height: 200,
    marginBottom: 10,
  },
  button: {
    marginBottom: 20,
    backgroundColor: "#211951",
    borderRadius: 15,
    paddingHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "MontserratBold",
  },
});
