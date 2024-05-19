import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useCallback, useState } from "react";
import { useFocusEffect } from "expo-router";
import firestore from "@react-native-firebase/firestore";
import { Button } from "react-native-paper";
import moment from "moment-timezone";
import NavigationBar from "../../components/navigationbar";

const DriverDetail = ({ navigation, route }) => {
  const { idDriver, dataBooking } = route.params;
  const [dataDriver, setDataDriver] = useState({});
  const [dataReview, setDataReview] = useState({});
  const [activeTab, setActiveTab] = useState(0);

  const orderBooking = () => {
    const startDate = moment(dataBooking.startDate, "YYYY-MM-DD");
    const endDate = moment(dataBooking.endDate, "YYYY-MM-DD");
    const duration = moment.duration(endDate.diff(startDate));
    const days = duration.asDays();

    navigation.navigate("BookingDetails", {
      dataBooking: dataBooking,
      driverName: dataDriver.name,
      totalAmount:
        parseInt(dataDriver.rate) * parseInt(dataBooking.duration) * (days + 1),
      driverId: idDriver,
    });
  };

  const getReview = async () => {
    const querySnapshot = await firestore()
      .collection("Driver")
      .doc(idDriver)
      .collection("Reviews")
      .get();

    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      review: doc.data().review,
      rating: doc.data().rating,
      customer: doc.data().customer,
    }));

    // count rating
    let totalRating = 0;
    for (let i = 0; i < data.length; i++) {
      totalRating += data[i].rating;
    }

    // update rating
    const driver = await firestore().collection("Driver").doc(idDriver);

    await driver.update({
      avg_rating:
        totalRating > 0
          ? (totalRating.toFixed(1) / data.length).toFixed(1)
          : 5.0,
    });

    setDataReview(data);
  };

  const sensorNama = (nama) => {
    if (nama !== "" && nama !== undefined) {
      const karakter = nama.split("");

      if (karakter.length < 4) {
        return nama;
      }

      for (let i = 1; i < karakter.length - 1; i++) {
        karakter[i] = "*";
      }

      return karakter.join("");
    }
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          const querySnapshot = await firestore()
            .collection("Driver")
            .doc(idDriver)
            .get();

          if (querySnapshot.exists) {
            const data = querySnapshot.data();
            setDataDriver(data);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
      getReview();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.textRow}>
        <Text style={styles.title}>Drivers Details</Text>
      </View>

      <View style={styles.boxContainer}>
        <ScrollView>
          {Object.keys(dataDriver).length > 0 && (
            <View>
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image
                  source={require("../../../assets/driverdetails.png")}
                  style={{ width: 100, height: 100 }}
                />
              </View>
              <View style={{ marginVertical: 10 }}>
                <View>
                  <Text
                    style={{
                      textAlign: "center",
                      fontFamily: "MontserratBold",
                      fontSize: 15,
                    }}
                  >
                    {dataDriver.name}
                  </Text>
                </View>
                <View style={{ flex: 1, alignItems: "center" }}>
                  <Text style={StyleSheet.textRate}>
                    Rate : Rp {dataDriver.rate.toLocaleString("id-ID")}/hours
                  </Text>
                </View>
                <View style={{ marginVertical: 10 }}>
                  <Button
                    onPress={orderBooking}
                    mode="contained"
                    style={styles.button}
                    labelStyle={styles.buttonText}
                  >
                    Book Now
                  </Button>
                </View>
              </View>

              <View>
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    borderBottomWidth: 1,
                    marginBottom: 10,
                    borderBottomColor: "#211951",
                    paddingBottom: 10,
                  }}
                >
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => setActiveTab(0)}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={
                          activeTab === 0
                            ? { fontFamily: "MontserratBold" }
                            : { fontFamily: "Montserrat" }
                        }
                      >
                        Review
                      </Text>
                    </View>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flex: 1,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onPress={() => setActiveTab(1)}
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={
                          activeTab === 1
                            ? { fontFamily: "MontserratBold" }
                            : { fontFamily: "Montserrat" }
                        }
                      >
                        Information
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View>
                  {activeTab === 0 ? (
                    <View style={{ flex: 1 }}>
                      {dataReview.length > 0 ? (
                        dataReview.map((e, i) => {
                          return (
                            <View
                              key={i}
                              style={{
                                borderWidth: 1,
                                borderColor: "#211951",
                                borderRadius: 10,
                                padding: 10,
                                backgroundColor: "#f0f2fe",
                                marginVertical: 5,
                              }}
                            >
                              <View
                                style={{
                                  flex: 1,
                                  flexDirection: "row",
                                  alignItems: "center",
                                }}
                              >
                                <View>
                                  <Image
                                    source={require("../../../assets/profile.png")}
                                    style={{ width: 20, height: 20 }}
                                  />
                                </View>
                                <View
                                  style={{ flex: 1, paddingHorizontal: 10 }}
                                >
                                  <Text
                                    style={{ fontFamily: "MontserratBold" }}
                                  >
                                    {sensorNama(e.customer)}
                                  </Text>
                                </View>
                                <View
                                  style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                  }}
                                >
                                  <View>
                                    <Text
                                      style={{ fontFamily: "MontserratBold" }}
                                    >
                                      {e.rating}
                                    </Text>
                                  </View>
                                  <View style={{ marginHorizontal: 10 }}>
                                    <Image
                                      source={require("../../../assets/icon_star.png")}
                                      style={{ width: 15, height: 15 }}
                                    />
                                  </View>
                                </View>
                              </View>
                              <View style={{ padding: 5 }}>
                                <Text style={{ fontFamily: "Montserrat" }}>
                                  {e.review}
                                </Text>
                              </View>
                            </View>
                          );
                        })
                      ) : (
                        <View
                          style={{
                            flex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            padding: 20,
                          }}
                        >
                          <Text
                            style={{
                              fontFamily: "MontserratBold",
                              alignItems: "center",
                            }}
                          >
                            This driver has no reviews yet
                          </Text>
                        </View>
                      )}
                    </View>
                  ) : (
                    <View
                      style={{
                        borderWidth: 1,
                        borderColor: "#211951",
                        borderRadius: 10,
                        padding: 20,
                        backgroundColor: "#f0f2fe",
                      }}
                    >
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          marginVertical: 5,
                        }}
                      >
                        <View style={{ flex: 1 }}>
                          <Text style={styles.textDetail}>Jenis Kelamin</Text>
                        </View>
                        <View>
                          <Text style={styles.textDetailBody}>
                            {dataDriver.jenis_kelamin}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          marginVertical: 5,
                        }}
                      >
                        <View style={{ flex: 1 }}>
                          <Text style={styles.textDetail}>
                            Pengalaman Menyetir
                          </Text>
                        </View>
                        <View>
                          <Text style={styles.textDetailBody}>
                            {dataDriver.pengalaman_menyetir} Tahun
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          marginVertical: 5,
                        }}
                      >
                        <View style={{ flex: 1 }}>
                          <Text style={styles.textDetail}>Status SIM</Text>
                        </View>
                        <View>
                          <Text style={styles.textDetailBody}>
                            {dataDriver.status_sim}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "row",
                          marginVertical: 5,
                        }}
                      >
                        <View style={{ flex: 1 }}>
                          <Text style={styles.textDetail}>Jenis Kendaraan</Text>
                        </View>
                        <View>
                          <Text style={styles.textDetailBody}>
                            {dataDriver.vehicle_types}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: "column",
                          marginVertical: 5,
                        }}
                      >
                        <View style={{ flex: 1 }}>
                          <Text style={styles.textDetail}>Pengalaman</Text>
                        </View>
                        <View style={{ marginTop: 10 }}>
                          {dataDriver.experience !== undefined &&
                          dataDriver.experience.length > 0 ? (
                            dataDriver.experience.map((e, i) => {
                              return (
                                <View key={i} style={{ marginVertical: 5 }}>
                                  <Text style={styles.textDetailBody}>
                                    - {e}
                                  </Text>
                                </View>
                              );
                            })
                          ) : (
                            <View style={{ marginVertical: 5 }}>
                              <Text style={styles.textDetailBody}>-</Text>
                            </View>
                          )}
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              </View>
            </View>
          )}
        </ScrollView>
      </View>
      <NavigationBar page="home" />
    </View>
  );
};

export default DriverDetail;

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
    textAlign: "center",
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
  button: {
    color: "white",
    alignSelf: "center",
    marginBottom: 20,
    backgroundColor: "#211951",
    borderRadius: 8,
    alignItems: "center",
    width: "60%",
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
    fontFamily: "MontserratBold",
    color: "#211951",
    fontSize: 12,
  },
  textDetailBody: {
    fontFamily: "MontserratSemiBold",
    color: "#211951",
    fontSize: 12,
  },
});
