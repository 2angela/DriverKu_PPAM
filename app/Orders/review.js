import { useState } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import StarRating from "react-native-star-rating-widget";

export default function Review({ navigation, route }) {
  const [rating, setRating] = useState();
  const { driverID } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rating and Review</Text>
      <Image source={require("../../assets/ratingreview.png")} />
      <Text>Let's rate your journey</Text>
      <Text>Date</Text>
      <Text>Rate</Text>
      <StarRating rating={rating} onChange={setRating} />
      <Text>Review</Text>
      <View></View>
    </View>
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
    width: "30%",
    height: "15%",
    marginVertical: 20,
  },
});
