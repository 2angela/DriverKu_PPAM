import { View, StyleSheet, Text, Image } from "react-native";
import NavigationBar from "../components/navigationbar";
import { useAuth } from "../../auth/AuthProvider";
import { Button } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";
import { useEffect, useState } from "react";

export default function Profile({ navigation }) {
  const { signOut, user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthyear, setBirthyear] = useState("");
  const handleSignOut = () => {
    signOut();
    navigation.navigate("Landing");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await firestore()
          .collection("Customer")
          .doc(user?.uid)
          .get();
        const data = querySnapshot.data();
        if (data) {
          setName(data.name);
          setEmail(data.email);
          setBirthyear(data.birthyear);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Image
        source={require("../../assets/profile.png")}
        style={styles.image}
      />
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.contents}>{email}</Text>
      <Text style={styles.contents}>Born in {birthyear}</Text>
      <Button
        onPress={handleSignOut}
        mode="contained"
        style={styles.button}
        labelStyle={styles.buttonText}
      >
        Sign Out
      </Button>
      <NavigationBar page="profile" />
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
    height: "16%",
    marginVertical: 20,
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
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "MontserratBold",
  },
});
