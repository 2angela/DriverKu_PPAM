import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  LogBox,
} from "react-native";
import NavigationBar from "../../components/navigationbar";
import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import firestore from "@react-native-firebase/firestore";
import { IconButton } from "react-native-paper";

export default function DriverAvailable({ navigation, route }) {
  const { location, vehicle_types, dataBooking } = route.params;
  const [dataDriver, setDataDriver] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const querySnapshot = await firestore()
            .collection("Driver")
            .where("availability", "==", true)
            .where("vehicle_types", "==", vehicle_types)
            .get();

          const data = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            rate: doc.data().rate,
            name: doc.data().name,
            avg_rating: doc.data().avg_rating,
            service_area: doc.data().service_area,
          }));

          let containLocation = [];
          for (let i = 0; i < data.length; i++) {
            if (data[i].service_area.length > 0) {
              for (let p = 0; p < data[i].service_area.length; p++) {
                if (
                  data[i].service_area[p].toLowerCase() ===
                  location.toLowerCase()
                ) {
                  containLocation.push(data[i]);
                  break;
                }
              }
            }
          }

          setDataDriver(containLocation);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }, [location])
  );

  return (
    <View style={styles.container}>
      <IconButton
        onPress={() => navigation.goBack()}
        icon="arrow-left"
        size={24}
        iconColor="#211951"
        style={{ alignSelf: "flex-start", marginLeft: 15 }}
      />

      <View style={styles.textRow}>
        {dataDriver.length > 0 && (
          <Text style={styles.title}>Drivers Available</Text>
        )}
      </View>

      <View style={styles.boxContainer}>
        <ScrollView>
          <View style={styles.containerList}>
            {dataDriver.length > 0 ? (
              dataDriver.map((e, i) => {
                return (
                  <View key={i} style={styles.listStyle}>
                    <TouchableOpacity
                      style={{ flex: 1, flexDirection: "row" }}
                      onPress={() =>
                        navigation.push("DriverDetail", {
                          idDriver: e.id,
                          dataBooking: dataBooking,
                        })
                      }
                    >
                      <View style={{ width: 60 }}>
                        <Image
                          source={require("../../../assets/driverdetails.png")}
                          style={styles.imageContainer}
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <View>
                          <Text style={styles.textName}>{e.name}</Text>
                        </View>
                        <View style={{ marginTop: 2 }}>
                          <Text style={styles.textRate}>
                            Rate : Rp {parseInt(e.rate).toLocaleString("id-ID")}
                            /hour
                          </Text>
                        </View>
                      </View>
                      <View style={styles.containerRating}>
                        <View>
                          <Text style={styles.textRating}>{e.avg_rating}</Text>
                        </View>
                        <View style={{ marginHorizontal: 5 }}>
                          <Image
                            source={require("../../../assets/icon_star.png")}
                            style={{ width: 15, height: 15 }}
                          />
                        </View>
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })
            ) : (
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignContent: "center",
                }}
              >
                <View>
                  <View style={{ alignItems: "center" }}>
                    <Text style={styles.title}>Driver not found !</Text>
                  </View>
                </View>
                <View style={{ alignItems: "center", marginTop: 3 }}>
                  <Text style={{ fontFamily: "MontserratSemiBold" }}>
                    Currently driver not avaliable in your area
                  </Text>
                </View>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      <NavigationBar page="home" />
    </View>
  );
}

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
]);

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
    fontSize: 28,
    fontFamily: "MontserratExtraBold",
    color: "#836FFF",
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
  containerList: {
    flexDirection: "column",
    flex: 1,
    marginBottom: 20,
  },
  listStyle: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#bab8c3",
    borderRadius: 10,
    padding: 15,
    backgroundColor: "#f0f2fe",
    marginVertical: 5,
    height: 80,
  },
  imageContainer: {
    width: 50,
    height: 50,
  },
  textName: {
    color: "#6b6881",
    fontWeight: "700",
    fontSize: 17,
    fontFamily: "MontserratExtraBold",
  },
  textRate: {
    color: "#6b6881",
    fontFamily: "MontserratSemiBold",
    fontSize: 12,
  },
  containerRating: {
    width: 60,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  textRating: {
    color: "#1b134c",
    fontWeight: "800",
    fontFamily: "MontserratExtraBold",
  },
});
