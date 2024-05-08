import { useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import { View, StyleSheet, Text, ScrollView, FlatList } from "react-native";
import { Icon, IconButton } from "react-native-paper";
import { useAuth } from "../../../auth/AuthProvider";

export default function OrderActivity({ navigation, route }) {
  const { user } = useAuth();
  const { orderID } = route.params;
  const [activities, setActivities] = useState([]);
  const statusValue = [
    "Driver is coming",
    "Driving to the destination",
    "Finished",
  ];
  const randomAddress = [
    "Jalan Apel No. 111, Bandung",
    "Institut Teknologi Bandung",
    "23 Paskal Shopping Center",
    "Jalan Mawar No.22, Anggrek",
    "Jalan Merdeka No. 39, Surabaya",
    "Jalan Diponegoro No. 90, Mangga",
    "Lobby Bandung Indah Plaza",
    "Jalan Supratman No. 3 Blok C, Purwakarta",
    "Universitas Padjajaran",
    "Jalan Tubagus Ismail No. 72, Bandung",
    "Mall BEC",
    "Jalan Plesiran No. 52, Bandung",
    "Hotel Four Points",
  ];

  function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
  }
  function generateNewActivity() {
    var array = [];
    var randomHour, randomMinute, hourString, minuteString, status;
    const n = getRandomNumber(7);

    for (let i = 0; i <= n; i++) {
      randomHour = getRandomNumber(23);
      randomMinute = getRandomNumber(59);
      hourString = String(randomHour).padStart(2, "0");
      minuteString = String(randomMinute).padStart(2, "0");
      if (i == n) {
        status = statusValue[getRandomNumber(1)];
      } else {
        status = statusValue[2];
      }
      array.push({
        address: randomAddress[getRandomNumber(randomAddress.length)],
        time: hourString + ":" + minuteString,
        status: status,
      });
    }
    return array;
  }

  useEffect(() => {
    const updateOrder = async () => {
      try {
        const orderDocRef = firestore()
          .collection("Customer")
          .doc(user?.uid)
          .collection("Order")
          .doc(orderID);
        const documentSnapshot = await orderDocRef.get();
        const data = documentSnapshot.data();
        if (!data || !data.activities) {
          console.log("New data is generated");
          const newActivities = generateNewActivity();
          await orderDocRef.set({ activities: newActivities }, { merge: true });
          setActivities(newActivities);
        } else {
          console.log("Data already exist");
          setActivities(data.activities);
        }
      } catch (error) {
        console.error("Error updating data:", error);
      }
    };
    updateOrder();
  }, []);

  const Item = (item) => {
    const { address, time, status } = item.item;
    return (
      <View style={styles.activities}>
        <View style={styles.activity}>
          <Icon
            source="map-marker"
            color={"#211951"}
            size={40}
            style={{ width: "10%" }}
          />
          <View style={styles.card}>
            <Text style={styles.cardLocation}>{address}</Text>
            <Text style={styles.cardContent}>{status}</Text>
            <Text style={[styles.cardContent, { alignSelf: "flex-end" }]}>
              {time}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <IconButton
        onPress={() => navigation.goBack()}
        icon="arrow-left"
        size={24}
        iconColor="#211951"
        style={{ alignSelf: "flex-start", marginLeft: 15 }}
      />
      <Text style={styles.title}>Activity Details</Text>
      <FlatList
        data={[...activities].reverse()}
        renderItem={Item}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.list}
      ></FlatList>
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
    marginBottom: 20,
  },
  list: {
    width: 350,
    paddingTop: 10,
    paddingBottom: 60,
  },
  activities: {
    alignItems: "center",
  },
  activity: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  card: {
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "#F0F3FF",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
    width: "80%",
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 10,
  },
  cardLocation: {
    color: "#836FFF",
    fontSize: 16,
    fontFamily: "MontserratExtraBold",
    paddingBottom: 5,
  },
  cardContent: {
    color: "black",
    fontSize: 12,
    fontFamily: "MontserratMedium",
  },
});
