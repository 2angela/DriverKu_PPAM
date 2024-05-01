import { Text, View, StyleSheet, FlatList } from "react-native";
import { Link, router } from "expo-router";
import firestore from "@react-native-firebase/firestore";
import { useAuth } from "../../auth/AuthProvider";
import { useEffect, useState } from "react";
import { IconButton } from "react-native-paper";
import NavigationBar from "../components/navigationbar";

export default function Orders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await firestore()
          .collection("Customer")
          .doc(user?.uid)
          .collection("Order")
          .orderBy("created_at")
          .get();
        const data = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          driver: doc.data().driver == null ? "Unassigned" : doc.data().driver,
          created_at: doc.data().created_at.toDate().toDateString(),
          status: doc.data().status,
        }));

        setOrders(data);
        console.log("Data:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
        console.log("Data:", data);
      }
    };

    fetchData();
  }, []);

  const Item = ({ item }) => (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
        >
          <Text style={styles.contents}>Driver: {item.driver}</Text>
          <Text style={styles.contents}>{item.created_at}</Text>
          <Text style={styles.contents}>{item.status}</Text>
        </View>
        <View style={{ paddingHorizontal: 10 }}>
          <IconButton
            onPress={() => {
              router.push("");
            }}
            icon="message-reply-text"
            iconColor="#211951"
            size={30}
          />
          <IconButton
            onPress={() => {
              router.push("");
            }}
            icon="star-settings-outline"
            iconColor="#211951"
            size={30}
          />
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Link href={"./order/details"}>order details</Link>
      <Text style={styles.title}>Orders</Text>
      <FlatList
        data={orders}
        renderItem={Item}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
      ></FlatList>
      <NavigationBar page="orders" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "start",
    paddingTop: 60,
  },
  list: {
    flex: 3,
    width: "100%",
    paddingTop: 20,
  },
  card: {
    backgroundColor: "#F0F3FF",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 15,
    marginVertical: 10,
    width: 300,
  },
  title: {
    fontSize: 32,
    fontFamily: "MontserratExtraBold",
    paddingVertical: 5,
  },
  contents: {
    fontSize: 14,
    fontFamily: "MontserratExtraBold",
    paddingVertical: 5,
  },
});
