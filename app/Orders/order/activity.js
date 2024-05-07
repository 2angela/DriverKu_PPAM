import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Icon } from "react-native-paper";

export default function OrderActivity({ navigation, route }) {
  const { orderID } = route.params;
  const randomAddress = [
    "Jalan Apel No. 111, Bandung",
    "Institut Teknologi Bandung",
    "23 Paskal Shopping Center",
    "Jalan Mawar No.22, Bandung",
    "Jalan Merdeka No. 39, Bandung",
    "Jalan Diponegoro No. 90, Bandung",
    "Lobby Bandung Indah Plaza",
    "Jalan Supratman No. 3 Blok C, Bandung",
    "Universitas Padjajaran",
    "Jalan Tubagus Ismail No. 72, Bandung",
    "Mall BEC",
    "Jalan Plesiran No. 52, Bandung",
    "Hotel Four Points",
  ];
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <IconButton icon="arrow-left" size={24} iconColor="#211951" />
      </TouchableOpacity>
      <Text style={styles.title}>Activity Details</Text>
      <View style={styles.activities}>
        <View style={styles.activity}>
          <Icon
            source="map-maker"
            color={"#211951"}
            size={20}
            style={{ width: "20%" }}
          />
          <View style={styles.card}>
            <Text stlye={styles.cardLocation}>Jalan</Text>
            <Text stlye={styles.cardContent}>Status</Text>
            <Text stlye={{ ...styles.cardContent, alignItems: "flex-end" }}>
              Time
            </Text>
          </View>
        </View>
      </View>
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
  activities: {
    alignItems: "center",
  },
  activity: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#F0F3FF",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
    width: "80%",
  },
  cardLocation: {
    color: "#836FFF",
    fontSize: 14,
    fontFamily: "MontserratExtraBold",
  },
  cardContent: {
    color: "black",
    fontSize: 10,
    fontFamily: "MontserratMedium",
  },
});
