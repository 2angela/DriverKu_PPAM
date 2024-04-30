import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import NavigationBar from "../../components/navigationbar";
import { useAuth } from "../../../auth/AuthProvider";
import { Button } from "react-native-paper";

export default function OrderDetails() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text contentContainerStyle={styles.title}>Order Details</Text>
      <Text contentContainerStyle={styles.name}></Text>
      <Text contentContainerStyle={styles.contents}>Date</Text>
      <Text contentContainerStyle={styles.contents}>Duration</Text>
      <View contentContainerStyle={styles.box}></View>
      <NavigationBar />
    </ScrollView>
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
  name: {
    fontSize: 20,
    fontFamily: "MontserratBold",
    paddingVertical: 5,
  },
  contents: {
    fontSize: 14,
    fontFamily: "MontserratMedium",
    paddingVertical: 5,
  },
  button: {
    backgroundColor: "#211951",
    borderRadius: 10,
    alignItems: "center",
    width: "150",
    marginTop: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "MontserratBold",
  },
  box: {
    backgroundColor: "#F0F3FF",
    borderColor: "black",
    borderWidth: 1,
    width: "80%",
    height: "100%",
    marginBottom: 50,
  },
});
