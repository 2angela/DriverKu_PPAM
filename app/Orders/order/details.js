import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import NavigationBar from "../../components/navigationbar";
import { useAuth } from "../../../auth/AuthProvider";
import { Button, IconButton } from "react-native-paper";

export default function OrderDetails({ navigation, route }) {
  const { user } = useAuth();
  // const { orderID } = route.params;
  const [details, setdetails] = useState({
    driverID,
    driverName,
    date,
    duration,
    pickupLocation,
    pickupTime,
    total,
    payMethod,
    payStatus,
    orderStatus,
    orderID,
  });

  const getTime = (date) => {
    if (date) {
      const hour = date.getHours();
      const minute = date.getMinutes();
      return hour.toString() + ":" + minute.toString();
    }
    return null;
  };

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const querySnapshot = await firestore()
          .collection("Customer")
          .doc(user?.uid)
          .collection("Order")
          .doc(orderID)
          .get();
        const data = querySnapshot.data();
        const orderData = {
          driverID: data.driverID,
          driverName:
            data.driverID == null ? "" : await fetchDriver(orderData.driverID),
          date:
            data.created_at == null
              ? "Error, Order has no Date"
              : data.created_at.toDate().toDateString(),
          duration: data.duration,
          pickupLocation: data.pickup,
          pickupTime: getTime(doc.data().startDate),
          total: doc.data().total,
          payMethod: doc.data().paymethod,
          payStatus: doc.data().payStatus,
          orderStatus: doc.data().status,
          orderID: route.params,
        };

        setdetails(orderData);
        console.log("Data:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
        console.log("Data:", data);
      }
    };
    const fetchDriver = async () => {
      try {
        const querySnapshot = await firestore()
          .collection("Driver")
          .doc(details.driverID)
          .get();
        const data = querySnapshot.data().name;
        return data;
      } catch (error) {
        console.error("Error fetching data:", error);
        console.log("Data:", data);
      }
    };

    fetchOrder();
  }, []);
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
      <Text style={styles.name}>{details.driverName}</Text>
      <Text style={styles.contents}>{details.date}</Text>
      <Text style={styles.contents}>{details.duration}</Text>
      <View style={styles.box}>
        <View style={styles.contents}>
          <Text>Pickup Location</Text>
          <Text>Pickup Time</Text>
          <Text>Total Payment</Text>
          <Text>Payment Method</Text>
          <Text>Payment Status</Text>
          <Text>Order Status</Text>
          <Text>Order ID</Text>
        </View>
        <View style={[styles.contents, styles.contentsEnd]}>
          <Text>{details.pickupLocation}</Text>
          <Text>{details.pickupTime}</Text>
          <Text>{details.total}</Text>
          <Text>{details.payMethod}</Text>
          <Text>{details.payStatus}</Text>
          <Text>{details.orderStatus}</Text>
          <Text>{details.orderID}</Text>
        </View>
        <Button
          style={styles.button}
          onPress={navigation.push(OrderActivity, { orderID: details.orderID })}
        >
          See Activites
        </Button>
      </View>
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
    width: "50%",
    fontSize: 14,
    fontFamily: "MontserratMedium",
    paddingVertical: 5,
    justifyContent: "flex-start",
  },
  contentsEnd: {
    justifyContent: "flex-end", // override contents
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
    borderRadius: 10,
    width: "80%",
    height: "100%",
    marginBottom: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
