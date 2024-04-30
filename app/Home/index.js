import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import NavigationBar from "../components/navigationbar";

export default function Home() {
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/driver.png")}
        style={styles.topImage}
      />

      <View style={styles.textRow}>
        <Text style={styles.title}>Book Drivers</Text>
        <Text style={styles.title}>Near Me!</Text>
        <Text style={styles.text}>First, Select Your Car Type!</Text>
      </View>

      <View style={styles.boxContainer}>
        {/* Matic */}
        <TouchableOpacity onPress={() => console.log("Maticpressed")}>
          <Link href="./booking">
            <View style={styles.box}>
              <Image
                source={require("../../assets/matic.png")}
                style={styles.boxImage}
              />
              <Text style={styles.boxText}>Matic</Text>
            </View>
          </Link>
        </TouchableOpacity>

        {/* Manual */}
        <TouchableOpacity onPress={() => console.log("Manual pressed")}>
          <Link href="./booking">
            <View style={styles.box}>
              <Image
                source={require("../../assets/manual.png")}
                style={styles.boxImage}
              />
              <Text style={styles.boxText}>Manual</Text>
            </View>
          </Link>
        </TouchableOpacity>
      </View>
      <NavigationBar page="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
    flexDirection: "col",
  },
  topImage: {
    width: "60%",
    height: "30%",
    resizeMode: "cover",
    marginBottom: 20,
  },
  textRow: {
    width: "100%",
    padding: 5,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontFamily: "MontserratExtraBold",
    color: "#836FFF",
  },
  text: {
    marginTop: 25,
    marginBottom: 8,
    textAlign: "center",
    fontFamily: "MontserratSemiBold",
    fontSize: 18,
    color: "#211951",
  },
  boxContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  box: {
    alignItems: "center",
    backgroundColor: "#F0F3FF",
    padding: 20,
    borderRadius: 10,
    elevation: 100,
    borderWidth: 1,
    borderColor: "#211951",
  },
  boxImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  boxText: {
    marginTop: 10,
    fontSize: 16,
    fontFamily: "MontserratSemiBold",
    color: "#211951",
  },
});
