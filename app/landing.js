import React, { useEffect } from "react";
import { Text, TouchableOpacity, View, Image, StyleSheet } from "react-native";
import { useAuth } from "../auth/AuthProvider";

export default function Landing({ navigation }) {
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigation.push("Home");
    }
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/driver.png")} style={styles.image} />
      <View style={styles.content}>
        <Text style={[styles.title, styles.titleSpacing]}>
          Wherever You Go,
        </Text>
        <Text style={[styles.title, styles.titleSpacing]}>
          Your Driver Follows:
        </Text>
        <Text style={[styles.title, styles.betweenSpacing]}>Book Now!</Text>
        <Text style={[styles.description, styles.descriptionSpacing]}>
          We provide the best drivers in
        </Text>
        <Text style={[styles.description, styles.descriptionSpacing]}>
          town to guarantee your safety!
        </Text>
        <TouchableOpacity
          onPress={() => navigation.push("SignIn")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "80%",
    height: "40%",
    resizeMode: "cover",
    marginTop: 40,
    marginBottom: 30,
  },
  content: {
    marginTop: 10,
    padding: 20,
    backgroundColor: "#211951",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  title: {
    fontSize: 28,
    fontFamily: "MontserratExtraBold",
    color: "#15F5BA",
  },
  description: {
    fontSize: 14,
    fontFamily: "MontserratBold",
    color: "white",
  },
  button: {
    marginTop: 25,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    width: "40%",
  },
  buttonText: {
    color: "#211951",
    fontSize: 18,
    fontFamily: "MontserratBold",
  },
  titleSpacing: {
    marginBottom: 3,
  },
  descriptionSpacing: {
    marginBottom: 3,
  },
  betweenSpacing: {
    marginBottom: 30,
  },
});
