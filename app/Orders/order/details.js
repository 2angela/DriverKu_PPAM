import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import NavigationBar from "../../components/navigationbar";
import { useAuth } from "../../../auth/AuthProvider";
import { Button, IconButton } from "react-native-paper";

export default function OrderDetails({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <IconButton icon="arrow-left" size={24} iconColor="#211951" />
      </TouchableOpacity>
      <Text style={styles.title}>Order Details</Text>
      <Image
        source={require("../../../assets/orderdetails.png")}
        style={styles.image}
      />
      <Text style={styles.name}></Text>
      <Text style={styles.contents}>Date</Text>
      <Text style={styles.contents}>Duration</Text>
      <View style={styles.box}></View>
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
  image: {
    width: 100,
    height: 100,
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
