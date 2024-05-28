import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  ToastAndroid,
  SafeAreaView,
} from "react-native";
import { useState } from "react";
import { Button, Provider, ThemeProvider } from "react-native-paper";
import { Picker } from "@react-native-picker/picker";
import moment from "moment-timezone";
import firestore from "@react-native-firebase/firestore";
import NavigationBar from "../../components/navigationbar";
import { useAuth } from "../../../auth/AuthProvider";

let listPaymentMethod = [
  {
    label: "BCA Virtual Account",
    value: "BCA Virtual Account",
  },
  {
    label: "OVO",
    value: "OVO",
  },
  {
    label: "Gopay",
    value: "Gopay",
  },
  {
    label: "Shopee pay",
    value: "Shopee pay",
  },
];

export default function BookingDetails({ navigation, route }) {
  const { user } = useAuth();
  const { dataBooking, driverName, totalAmount, driverId } = route.params;
  const [loading, setLoading] = useState(false);
  const [activePaymentMethod, setActivePaymentMethod] = useState(
    "BCA Virtual Account"
  );
  const idOrder = `ID-${new Date().getTime()}`;

  const handleCreate = async () => {
    setLoading(true);
    try {
      const bookingColRef = firestore()
        .collection("Customer")
        .doc(user?.uid)
        .collection("Order");

      const booking = await bookingColRef.add({
        pickup: dataBooking.pickup,
        area: dataBooking.area,
        startDate: dataBooking.startDate,
        startTime: dataBooking.startTime,
        endDate: dataBooking.endDate,
        endTime: dataBooking.endTime,
        duration: dataBooking.duration,
        status: "Unpaid",
        driver: driverName,
        driverID: driverId,
        vehicle_types: dataBooking.vehicle_types,
        totalAmount: totalAmount,
        payment_method: activePaymentMethod,
        reviewed: false,
        created_at: firestore.FieldValue.serverTimestamp(),
      });

      navigation.push("Payment", {
        booking_id: booking.id,
        totalPrice: totalAmount,
      });
    } catch (error) {
      console.log("err => ", error);
      ToastAndroid.show("Failed create booking !", ToastAndroid.SHORT);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textRow}>
        <Text style={styles.title}>Booking Details</Text>
      </View>
      <View style={{ marginVertical: 10 }}>
        <Image
          source={require("../../../assets/bookingdetails.png")}
          style={{ width: 120, height: 120 }}
        />
      </View>

      <View style={styles.boxContainer}>
        <ScrollView>
          {dataBooking !== undefined && (
            <View
              style={{
                borderWidth: 1,
                borderColor: "#6b6881",
                borderRadius: 10,
                paddingHorizontal: 20,
                paddingTop: 20,
                backgroundColor: "#f0f2fe",
              }}
            >
              <View
                style={{ flexDirection: "row", flex: 1, marginVertical: 5 }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.textDetail}>Location</Text>
                </View>
                <View>
                  <Text style={styles.textDetailBody}>
                    {dataBooking.pickup}
                  </Text>
                </View>
              </View>
              <View
                style={{ flexDirection: "row", flex: 1, marginVertical: 5 }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.textDetail}>Start Date</Text>
                </View>
                <View>
                  <Text style={styles.textDetailBody}>
                    {moment(dataBooking.startDate).format("dddd, D MMM YYYY")}
                  </Text>
                </View>
              </View>
              <View
                style={{ flexDirection: "row", flex: 1, marginVertical: 5 }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.textDetail}>End Date</Text>
                </View>
                <View>
                  <Text style={styles.textDetailBody}>
                    {moment(dataBooking.endDate).format("dddd, D MMM YYYY")}
                  </Text>
                </View>
              </View>
              <View
                style={{ flexDirection: "row", flex: 1, marginVertical: 5 }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.textDetail}>Start Time</Text>
                </View>
                <View>
                  <Text style={styles.textDetailBody}>
                    {moment(dataBooking.startTime).format("HH.mm")}
                  </Text>
                </View>
              </View>
              <View
                style={{ flexDirection: "row", flex: 1, marginVertical: 5 }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.textDetail}>End Time</Text>
                </View>
                <View>
                  <Text style={styles.textDetailBody}>
                    {moment(dataBooking.endTime).format("HH.mm")}
                  </Text>
                </View>
              </View>
              <View
                style={{ flexDirection: "row", flex: 1, marginVertical: 5 }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.textDetail}>Driver</Text>
                </View>
                <View>
                  <Text style={styles.textDetailBody}>{driverName}</Text>
                </View>
              </View>
              <View
                style={{ flexDirection: "row", flex: 1, marginVertical: 5 }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.textDetail}>Total Amount</Text>
                </View>
                <View>
                  <Text style={styles.textDetailBody}>
                    Rp {totalAmount.toLocaleString("id-ID")}
                  </Text>
                </View>
              </View>
              <View
                style={{ flexDirection: "col", flex: 1, marginVertical: 10 }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.textDetail}>Payment Method</Text>
                </View>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "black",
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                >
                  <Picker
                    selectedValue={activePaymentMethod}
                    onValueChange={(itemValue, itemIndex) =>
                      setActivePaymentMethod(itemValue)
                    }
                  >
                    {listPaymentMethod.map((e, i) => {
                      return (
                        <Picker.Item key={i} label={e.label} value={e.value} />
                      );
                    })}
                  </Picker>
                </View>
              </View>
              <View
                style={{ flexDirection: "row", flex: 1, marginVertical: 5 }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.textDetail}>Payment Status</Text>
                </View>
                <View>
                  <Text style={styles.textDetailBody}>
                    {dataBooking.status}
                  </Text>
                </View>
              </View>
              <View
                style={{ flexDirection: "row", flex: 1, marginVertical: 5 }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={styles.textDetail}>Order ID</Text>
                </View>
                <View>
                  <Text style={styles.textDetailBody}>{idOrder}</Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  marginTop: 10,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button
                  loading={loading}
                  onPress={handleCreate}
                  mode="contained"
                  style={styles.button}
                  labelStyle={styles.buttonText}
                >
                  Book
                </Button>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
      <NavigationBar page="orders" />
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
    fontSize: 25,
    fontFamily: "MontserratExtraBold",
    color: "#211951",
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
  button: {
    color: "white",
    alignSelf: "center",
    marginBottom: 20,
    backgroundColor: "#211951",
    borderRadius: 8,
    alignItems: "center",
    width: "40%",
    paddingHorizontal: 5,
    paddingTop: 0,
    paddingBottom: 0,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "MontserratBold",
  },
  textDetail: {
    fontSize: 11,
    fontFamily: "MontserratBold",
    color: "#211951",
  },
  textDetailBody: {
    fontSize: 10,
    fontFamily: "MontserratSemiBold",
    color: "#211951",
  },
});
