import { router } from "expo-router";
import { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { TextInput, HelperText, Button, IconButton } from "react-native-paper";
import firestore from "@react-native-firebase/firestore";
import { useAuth } from "../../auth/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import NavigationBar from "../components/navigationbar";

export default function BookingCreate() {
  const navigation = useNavigation();
  const [pickup, setPickup] = useState("");
  const [area, setArea] = useState("");
  const { user } = useAuth();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleStartDateChange = (event, date) => {
    setShowStartDatePicker(false);
    setStartDate(date || startDate);
  };

  const handleEndDateChange = (event, date) => {
    setShowEndDatePicker(false);
    setEndDate(date || endDate);
  };

  const [duration, setDuration] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    pickup: "",
    area: "",
    startDate: "",
    endDate: "",
    duration: "",
  });

  const validate = () => {
    let newErrors = {
      pickup: "",
      area: "",
      startDate: "",
      endDate: "",
      duration: "",
    };

    if (!pickup.trim()) {
      newErrors.pickup = "Pick Up Location is Required";
    } else if (pickup.length < 40) {
      newErrors.pickup = "Please give more details for the pick up location";
    }

    if (!area.trim()) {
      newErrors.area = "Driving Area is Required";
    } else if (area.length < 12) {
      newErrors.description = "Area name must be at least 12 characters";
    }

    if (!startDate) {
      newErrors.startDate = "Start Date is Required";
    }

    if (!endDate) {
      newErrors.endDate = "End Date is Required";
    } else if (endDate <= startDate) {
      newErrors.endDate = "End Date cannot be before Start Date";
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
      console.log(findErrors);
      setErrors(findErrors);
    } else {
      setLoading(true);
      const bookingColRef = firestore()
        .collection("Customer")
        .doc(user.uid)
        .collection("Order");

      await bookingColRef.add({
        pickup,
        area,
        startDate,
        endDate,
        duration,
        created_at: firestore.FieldValue.serverTimestamp(),
      });
      router.back();

      setLoading(false);
    }
  };

  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconButton icon="arrow-left" size={24} iconColor="#211951" />
            </TouchableOpacity>
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
            <TextInput
              label={<Text style={styles.label}>Start Date</Text>}
              value={startDate.toDateString()}
              onTouchStart={() => setShowStartDatePicker(true)}
            />
            {showStartDatePicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="spinner"
                onChange={handleStartDateChange}
              />
            )}

            {/* End Date Picker */}
            <View style={styles.enddatefieldContainer}>
              <TextInput
                label={<Text style={styles.label}>End Date</Text>}
                value={endDate.toDateString()}
                onTouchStart={() => setShowEndDatePicker(true)}
              />
              {showEndDatePicker && (
                <DateTimePicker
                  value={endDate}
                  mode="date"
                  display="spinner"
                  onChange={handleEndDateChange}
                />
              )}
            </View>

            <TextInput
              left={
                <TextInput.Icon
                  icon="clock"
                  iconColor="#211951"
                  color="#F0F3FF"
                />
              }
              label={<Text style={styles.label}>Duration per Day</Text>}
              disabled={loading}
              value={duration}
              mode="outlined"
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
    marginBottom: 20,
    marginTop: 20,
  },
});
