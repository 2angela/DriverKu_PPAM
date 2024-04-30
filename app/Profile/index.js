import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import NavigationBar from "../components/navigationbar";
import { useAuth } from "../../auth/AuthProvider";
import { Button } from "react-native-paper";

export default function Profile() {
  const { signOut } = useAuth();
  const handleSignOut = () => {
    signOut();
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Image
        source={require("../../assets/profile.png")}
        style={{ width: "30%", height: "16%" }}
      />
      <Text style={styles.name}>Name</Text>
      <Text style={styles.contents}>Email</Text>
      <Text style={styles.contents}>Birthdate</Text>
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
});
