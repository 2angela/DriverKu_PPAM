import { View, StyleSheet, Text, ScrollView, Image, ToastAndroid } from "react-native"
import { Fragment, useCallback, useState } from "react";
import moment from "moment-timezone";
import firestore from "@react-native-firebase/firestore";
import NavigationBar from "../../components/navigationbar";
import { useAuth } from "../../../auth/AuthProvider";
import { useFocusEffect } from "expo-router";

export default function Payment({ navigation, route }) {
	const { user }       = useAuth();
	const { booking_id, totalPrice } = route.params
  const [dataOrder, setDataOrder] = useState({})

  const getOrderDetail = async (idOrder) => {
    try {
      const bookingColRef = await firestore()
			.collection("Customer")
			.doc(user?.uid)
			.collection("Order")
      .doc(idOrder)
      .get()

      if (bookingColRef.exists) {
        console.log('Data:', bookingColRef.data());
        setDataOrder(bookingColRef.data())
      } 

    } catch (error) {
      ToastAndroid.show("Failed get detail payment !", ToastAndroid.SHORT)
    }
  }

  useFocusEffect(
    useCallback(() => {
      getOrderDetail(booking_id)
    }, [booking_id])
  )

	return (
		<View style={styles.container}>
			<View style={styles.textRow}>
				<Text style={styles.title}>
					Payment
				</Text>
			</View>
			<View style={{ marginVertical:10 }}>
				<Image source={require("../../../assets/payment.png")} style={{ width:120, height:120 }}/>
			</View>

      {
        Object.keys(dataOrder).length > 0 &&
        <Fragment>
          <View style={{ marginVertical:10 }}>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontSize:20, fontWeight:700 }}>{dataOrder.driver}</Text>
            </View>
            <View style={{ alignItems: "center", marginVertical:2 }}>
              <Text style={{ fontWeight:500 }}>{moment(dataOrder.created_at).format("dddd, DD MMM YYYY")}</Text>
            </View>
            <View style={{ alignItems: "center" }}>
              <Text style={{ fontWeight:400 }}>{dataOrder.duration} Hours</Text>
            </View>
          </View>
          
          <View style={styles.boxContainer}>
            <ScrollView>
              <View style={{ borderWidth:1, borderColor:"#6b6881", borderRadius:10, paddingHorizontal:20, paddingTop:20, paddingBottom:20, backgroundColor:"#f0f2fe" }}>
                  <View style={{ flexDirection:"row", flex:1, marginVertical:5 }}>
                    <View style={{ flex:1 }}>
                      <Text style={styles.textDetail}>
                        Total Amount
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.textDetailBody}>
                        Rp {totalPrice.toLocaleString("id-ID")}
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
                        {dataOrder.payment_method}
                      </Text>
                    </View>
                  </View>
                  <View style={{ flexDirection:"row", flex:1, marginVertical:5 }}>
                    <View style={{ flex:1 }}>
                      <Text style={styles.textDetail}>
                        Virtual Account
                      </Text>
                    </View>
                    <View>
                      <Text style={styles.textDetailBody}>
                        {new Date().getTime()}
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
                        {dataOrder.status}
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
                        {dataOrder.order_id}
                      </Text>
                    </View>
                  </View>
                </View>
            </ScrollView>
          </View>
        </Fragment>
      }
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
	textDetail : {
		fontSize:11,
		fontFamily: "MontserratBold",
		color : "#211951"
	},
	textDetailBody : {
		fontSize:10,
		fontFamily: "MontserratSemiBold",
		color : "#211951"
	}
});
