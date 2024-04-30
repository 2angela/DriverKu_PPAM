import { View, Text, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { router } from "expo-router";

const NavigationBar = ({ page }) => {
  const defaultColor = "#211951";
  const highlight = "#836FFF";

  return (
    <View style={styles.dashboard}>
      <View style={styles.iconContainer}>
        <IconButton
          icon="home"
          iconColor={page == "home" ? highlight : defaultColor}
          size={30}
          onPress={() => router.push("/Home")}
          style={{ margin: 0, padding: 0 }}
        />
        <Text
          style={[
            styles.iconText,
            { color: page == "home" ? highlight : defaultColor },
          ]}
        >
          Home
        </Text>
      </View>
      <View style={styles.iconContainer}>
        <IconButton
          icon="book"
          iconColor={page == "orders" ? highlight : defaultColor}
          size={30}
          onPress={() => router.push("/Orders")}
          style={{ margin: 0, padding: 0 }}
        />
        <Text
          style={[
            styles.iconText,
            { color: page == "orders" ? highlight : defaultColor },
          ]}
        >
          Orders
        </Text>
      </View>
      <View style={styles.iconContainer}>
        <IconButton
          icon="account"
          iconColor={page == "profile" ? highlight : defaultColor}
          size={30}
          onPress={() => router.push("/Profile")}
          style={{ margin: 0, padding: 0 }}
        />
        <Text
          style={[
            styles.iconText,
            { color: page == "profile" ? highlight : defaultColor },
          ]}
        >
          Profile
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dashboard: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 0,
    paddingHorizontal: 30,
    backgroundColor: "#F0F3FF",
    position: "absolute",
    bottom: 0,
    height: "10%",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    textAlign: "center",
    fontSize: 8,
    fontFamily: "MontserratBold",
    color: "#211951",
    marginBottom: 10,
  },
});

export default NavigationBar;
