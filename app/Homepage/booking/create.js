import { useState } from "react";
import { View, StyleSheet, Text, ScrollView } from "react-native";
import { TextInput, HelperText, Button, IconButton } from "react-native-paper";
import NavigationBar from "../../components/navigationbar";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment-timezone";

export default function BookingCreate({ navigation, route }) {
  const [pickup, setPickup] = useState("");
  const [area, setArea] = useState("");
  const status = "Unpaid";
  const { vehicle_types } = route.params;
  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    pickup: "",
    area: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    duration: "",
  });
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const [startTime, setStartTime] = useState(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  });

  const [startDate, setStartDate] = useState(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  });

  const [endTime, setEndTime] = useState(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  });
  const [endDate, setEndDate] = useState(() => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    return date;
  });

  const handleStartDateChange = (date) => {
    setShowStartDatePicker(false);

    const currentStartDate = date
    setStartDate(currentStartDate || startDate);
  };

  const handleStartTimeChange = (date) => {
    setShowStartTimePicker(false);

    const currentStartTime = date
    setStartTime(currentStartTime || startTime);
  };

  const handleEndDateChange = (date) => {
    setShowEndDatePicker(false);

    const currentEndDate = date
    setEndDate(currentEndDate || endDate);
  };

  const handleEndTimeChange = (date) => {
    setShowEndTimePicker(false);

    const currentEndTime = date
    setEndTime(currentEndTime || endTime);
  };

  const validate = () => {
    let newErrors = {
      pickup: "",
      area: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      duration: "",
    };

    if (!pickup.trim()) {
      newErrors.pickup = "Pick Up Location is Required";
    } else if (pickup.length < 15) {
      newErrors.pickup = "Please give more details for the pick up location";
    }

    if (!area.trim()) {
      newErrors.area = "Driving Area is Required";
    } else if (area.length < 4) {
      newErrors.description = "Area name must be at least 12 characters";
    }

    if (!startDate) {
      newErrors.startDate = "Start Date is Required";
    }

    if (!startTime) {
      newErrors.startTime = "Start Time is Required";
    }

    if (!endDate) {
      newErrors.endDate = "End Date is Required";
    } else if (endDate < startDate) {
      newErrors.endDate = "End Date cannot be before Start Date";
    }

    if (!endTime) {
      newErrors.endTime = "End Time is Required";
    } else if (endTime < startTime) {
      newErrors.endDate = "End Time cannot be before Start Time";
    }

    if (!duration) {
      newErrors.duration = "Duration is Required";
    } else if (duration < 1) {
      newErrors.duration = "Duration must be at least 1 hour";
    } else if (duration > 8) {
      newErrors.duration = "Duration must be less than 8 hours";
    }

    return newErrors;
  };

  const handleCreate = async () => {
    const findErrors = validate();

    if (Object.values(findErrors).some((value) => value !== "")) {
      setErrors(findErrors);
    } else {
      // const bookingColRef = firestore()
      //   .collection("Customer")
      //   .doc(user?.uid)
      //   .collection("Order");

      // await bookingColRef.add({
      //   pickup,
      //   area,
      //   startDate,
      //   endDate,
      //   duration,
      //   status,
      //   driver,
      //   vehicle_types,
      //   created_at: firestore.FieldValue.serverTimestamp(),
      // });

      navigation.push("DriverAvailable", {
        location: area,
        vehicle_types: vehicle_types,
        dataBooking: {
          pickup,
          area,
          startTime : moment(startTime).format(),
          startDate : moment(startDate).format(),
          endTime : moment(endTime).format(),
          endDate : moment(endDate).format(),
          duration,
          status,
          vehicle_types,
        },
      });
    }
  };

  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <IconButton
              onPress={() => navigation.goBack()}
              icon="arrow-left"
              size={24}
              iconColor="#211951"
              style={{ alignSelf: "flex-start", marginLeft: 15 }}
            />
          </View>
          <View style={styles.textRow}>
            <Text style={styles.title}>Book Drivers</Text>
            <Text style={styles.title}>Near Me!</Text>
          </View>

          <View style={styles.formContainer}>
            <TextInput
              left={<TextInput.Icon icon="map-marker" iconColor="#211951" />}
              label={<Text style={styles.label}>Pick-Up Location</Text>}
              disabled={loading}
              value={pickup}
              mode="outlined"
              multiline
              numberOfLines={12}
              onChangeText={(pickup) => {
                setPickup(pickup);
                setErrors((errors) => ({ ...errors, pickup: "" }));
              }}
              error={errors.pickup !== ""}
            />
            <HelperText type="error" visible={errors.pickup !== ""}>
              {errors.pickup}
            </HelperText>

            <TextInput
              left={<TextInput.Icon icon="map" iconColor="#211951" />}
              label={<Text style={styles.label}>Driving Area</Text>}
              disabled={loading}
              value={area}
              mode="outlined"
              onChangeText={(area) => {
                setArea(area);
                setErrors((errors) => ({ ...errors, area: "" }));
              }}
              error={errors.area !== ""}
            />
            <HelperText type="error" visible={errors.area !== ""}>
              {errors.area}
            </HelperText>

            {/* Start Date Picker */}
            <View style={styles.enddatefieldContainer}>
              <TextInput
                style={{ flex: 1, marginBottom: 5 }}
                label={<Text style={styles.label}>Start Date</Text>}
                value={startDate.toDateString()}
                onTouchStart={() => setShowStartDatePicker(true)}
              />

              <DateTimePickerModal
                isVisible={showStartDatePicker}
                mode="date"
                date={startDate}
                onConfirm={handleStartDateChange}
                onCancel={() => setShowStartDatePicker(false)}
              />

              {/* start time */}

              <TextInput
                style={{ flex: 1 }}
                label={<Text style={styles.label}>Start Time</Text>}
                value={startTime.toTimeString()}
                onTouchStart={() => setShowStartTimePicker(true)}
              />

              <DateTimePickerModal
                isVisible={showStartTimePicker}
                mode="time"
                is24Hour={true}
                date={startTime}
                onConfirm={handleStartTimeChange}
                onCancel={() => setShowStartTimePicker(false)}
              />
            </View>

            {/* End Date Picker */}
            <View style={styles.enddatefieldContainer}>
              <TextInput
                style={{ flex: 1, marginBottom: 5 }}
                label={<Text style={styles.label}>End Date</Text>}
                value={endDate.toDateString()}
                onTouchStart={() => setShowEndDatePicker(true)}
              />

              <DateTimePickerModal
                isVisible={showEndDatePicker}
                mode="date"
                date={endDate}
                onConfirm={handleEndDateChange}
                onCancel={() => setShowEndDatePicker(false)}
              />

              <TextInput
                style={{ flex: 1 }}
                label={<Text style={styles.label}>End Time</Text>}
                value={endTime.toTimeString()}
                onTouchStart={() => setShowEndTimePicker(true)}
              />

              <DateTimePickerModal
                isVisible={showEndTimePicker}
                mode="time"
                is24Hour={true}
                date={endTime}
                onConfirm={handleEndTimeChange}
                onCancel={() => setShowEndTimePicker(false)}
              />
            </View>

            <TextInput
              left={
                <TextInput.Icon
                  icon="clock"
                  iconColor="#211951"
                  color="#F0F3FF"
                />
              }
              style={{ marginTop: 20 }}
              label={<Text style={styles.label}>Duration per Day</Text>}
              disabled={loading}
              value={duration}
              mode="outlined"
              keyboardType="numeric"
              onChangeText={(duration) => {
                setDuration(duration);
                setErrors((errors) => ({ ...errors, duration: "" }));
              }}
              error={errors.duration !== ""}
            />
            <HelperText type="error" visible={errors.duration !== ""}>
              {errors.duration}
            </HelperText>
          </View>
          <Button
            loading={loading}
            onPress={handleCreate}
            mode="contained"
            icon="car"
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            Confirm
          </Button>
        </View>
      </ScrollView>
      <NavigationBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 40,
    paddingBottom: 80,
  },
  header: {
    flexDirection: "row",
    width: "100%",
    position: "absolute",
    top: 0,
    height: "10%",
    alignItems: "left",
  },
  textRow: {
    width: "100%",
    marginTop: 30,
    marginBottom: 15,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontFamily: "MontserratExtraBold",
    color: "#211951",
  },
  formContainer: {
    width: "80%",
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
  dashboard: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingVertical: 0,
    paddingHorizontal: 30,
    backgroundColor: "#F0F3FF",
    position: "absolute",
    bottom: 0,
    height: "10%",
  },
  iconContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    textAlign: "center",
    fontSize: 8,
    fontFamily: "MontserratBold",
    color: "#211951",
    marginBottom: 10,
  },
  iconTextChosen: {
    textAlign: "center",
    fontSize: 8,
    fontFamily: "MontserratBold",
    color: "#836FFF",
    marginBottom: 10,
  },
  label: {
    fontFamily: "MontserratMedium",
    fontSize: 12,
  },
  enddatefieldContainer: {
    marginBottom: 10,
    marginTop: 10,
  },
});
