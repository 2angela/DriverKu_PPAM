import { View, StyleSheet, Text, Image, ScrollView } from "react-native";
import { Fragment, useEffect, useState } from "react";
import firestore from "@react-native-firebase/firestore";
import NavigationBar from "../../components/navigationbar";
import { useAuth } from "../../../auth/AuthProvider";
import { Button, IconButton } from "react-native-paper";
import moment from "moment-timezone";

export default function OrderDetails({ navigation, route }) {
  const { user }             = useAuth();
  const [details, setDetail] = useState({})
  const { orderID }          = route.params;

  useEffect(() => {
    const fetchData = async () => {
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
          driverName: data.driver,
          date:
            data.created_at == null
              ? "Error, Order has no Date"
              : data.created_at.toDate().toDateString(),
          duration: data.duration,
          pickupLocation: data.pickup,
          pickupTime: moment(data.startDate).format("HH : mm"),
          total: data.totalAmount,
          payMethod: data.payment_method,
          payStatus: data.status,
          orderStatus: data.status,
          orderID: orderID,
          order_id : data.order_id
        };

        setDetail(orderData);
      } catch (error) {
        console.error("Error fetching data:", error);
        console.log("Data:", data);
      }
    };

    fetchData();
  }, []);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <IconButton
        onPress={() => navigation.goBack()}
        icon="arrow-left"
        size={24}
        iconColor="#211951"
        style={{ alignSelf: "flex-start", marginLeft: 15 }}
      />
      <Text style={styles.title}>Order Details</Text>
      <Image
        source={require("../../../assets/orderdetails.png")}
        style={styles.image}
      />

      {
        Object.keys(details).length > 0 &&
        <Fragment>
          <View style={{ marginVertical:10 }}>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize:20, fontWeight:700 }}>{details.driverName}</Text>
            </View>
            <View style={{ alignItems: "center", marginVertical:2 }}>
              <Text style={{ fontWeight:500 }}>{moment(details.date).format("dddd, DD MMM YYYY")}</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontWeight:400 }}>{details.duration} Hours</Text>
            </View>
          </View>
          
          <View style={styles.boxContainer}>
            <ScrollView>
              <View style={{ borderWidth:1, borderColor:"#6b6881", borderRadius:10, paddingHorizontal:20, paddingTop:20, paddingBottom:20, backgroundColor:"#f0f2fe" }}>
                  <View style={{ flexDirection:"row", flex:1, marginVertical:5 }}>
                    <View style={{ flex:1 }}>
                      <Text style={styles.textDetail}>
                        Pickup Location
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.textDetailBody}>
                        {details.pickupLocation}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection:"row", flex:1, marginVertical:5 }}>
                    <View style={{ flex:1 }}>
                      <Text style={styles.textDetail}>
                        Pickup Time
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.textDetailBody}>
                        {details.pickupTime}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection:"row", flex:1, marginVertical:5 }}>
                    <View style={{ flex:1 }}>
                      <Text style={styles.textDetail}>
                        Total Amount
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.textDetailBody}>
                        Rp {details.total.toLocaleString("id-ID")}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection:"row", flex:1, marginVertical:5 }}>
                    <View style={{ flex:1 }}>
                      <Text style={styles.textDetail}>
                        Payment Method
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.textDetailBody}>
                        {details.payMethod}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection:"row", flex:1, marginVertical:5 }}>
                    <View style={{ flex:1 }}>
                      <Text style={styles.textDetail}>
                        Payment Status
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.textDetailBody}>
                        {details.payStatus}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection:"row", flex:1, marginVertical:5 }}>
                    <View style={{ flex:1 }}>
                      <Text style={styles.textDetail}>
                        Order Status
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.textDetailBody}>
                        {details.payStatus}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection:"row", flex:1, marginVertical:5 }}>
                    <View style={{ flex:1 }}>
                      <Text style={styles.textDetail}>
                        Order ID
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.textDetailBody}>
                        {details.order_id}
                      </Text>
                    </View>
                  </View>
                  <View style={{ marginTop:10 }}>
                    <Button
                      style={styles.button}
                      onPress={() => navigation.push("OrderActivity", { orderID: details.orderID })}
                    >
                      <Text style={{ color:"white" }}>
                        See Activites
                      </Text>
                    </Button>
                  </View>
                </View>
            </ScrollView>
          </View>
        </Fragment>
      }
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
  boxContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		width: "100%",
		paddingHorizontal: 20,
		marginTop: 10,
	},
});
