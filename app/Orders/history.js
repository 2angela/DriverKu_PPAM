import { Text, View, StyleSheet, FlatList } from "react-native";
import firestore from "@react-native-firebase/firestore";
import { useAuth } from "../../auth/AuthProvider";
import { useEffect, useState } from "react";
import { IconButton, Button } from "react-native-paper";
import NavigationBar from "../components/navigationbar";

export default function Orders({ navigation }) {
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
    <View>
      <View style={styles.card}>
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
              navigation.push("Orders");
            }}
            icon="message-reply-text"
            iconColor="#211951"
            size={30}
          />
          <IconButton
            onPress={() => {
              navigation.push("Orders");
            }}
            icon="star-settings-outline"
            iconColor="#211951"
            size={30}
          />
        </View>
      </View>
      <View style={{ width: 300 }}>
        <Button
          onPress={() => {
            navigation.push("OrderDetails");
          }}
          mode="elevated"
          icon="arrow-right"
          style={styles.button}
          labelStyle={styles.buttonText}
        >
          See Details
        </Button>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
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
    width: "100%",
    paddingTop: 20,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#F0F3FF",
    borderColor: "black",
    borderWidth: 1,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    marginTop: 10,
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
  button: {
    marginBottom: 20,
    backgroundColor: "#211951",
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    paddingHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "MontserratBold",
  },
});
