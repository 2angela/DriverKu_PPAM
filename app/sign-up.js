import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { TextInput, Title, HelperText } from "react-native-paper";
import { Link, router, Redirect } from "expo-router";
import { useAuth } from "../auth/AuthProvider";
import { useState } from "react";
import firestore from "@react-native-firebase/firestore";

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [name, setName] = useState("");
  const [birthyear, setBirthyear] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });

  const { signUp, user } = useAuth();
  if (user) {
    navigation.push("Home");
  }

  const validate = () => {
    let newErrors = {
      email: "",
      password: "",
      name: "",
      birthyear: "",
    };

    if (!email) {
      newErrors.email = "Email is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    if (!name) {
      newErrors.name = "Name cannot be blank";
    }

    if (!birthyear || birthyear < 1800) {
      newErrors.name = "Year of birth is required";
    } else if (birthyear > 2006) {
      newErrors.birthyear = "You must be 17 or older to use this app";
    }

    if (!repeatPassword) {
      newErrors.repeatPassword = "Repeat Password is required";
    } else if (password !== repeatPassword) {
      newErrors.repeatPassword = "Repeat Password is not equal with password";
    }

    return newErrors;
  };

  const handleNumberInput = (input) => {
    const parsedInput = parseInt(input.replace(/[^0-9]/g, ""));
    setBirthyear(parsedInput);
  };

  const handleSignIn = () => {
    const findErrors = validate();

    if (Object.values(findErrors).some((value) => value !== "")) {
      console.log(findErrors);
      setErrors(findErrors);
    } else {
      signUp(email, password)
        .then(async (res) => {
          const uid = res.user.uid;
          const db = firestore().collection("Customer").doc(uid);
          await db
            .set({
              email,
              name,
              birthyear,
              created_at: firestore.FieldValue.serverTimestamp(),
            })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.error(error);
              return null;
            });

          navigation.push("Home");
        })
        .catch((error) => {
          let newErrors = {
            email: "",
            password: "",
          };
          if (error.code === "auth/invalid-credential") {
            newErrors.email = "Email or password invalid.";
          } else {
            newErrors.email = "Something went wrong.";
          }
          setErrors(newErrors);
        });
      // router.replace("/home");
    }
  };
  return (
    <View style={styles.container}>
      <Title style={styles.title}>Sign Up</Title>
      <View style>
        <TextInput
          left={<TextInput.Icon icon="email" color="#211951" />}
          label={<Text style={styles.label}>Email</Text>}
          value={email}
          mode="outlined"
          onChangeText={(email) => {
            setEmail(email);
            setErrors((errors) => ({ ...errors, email: "" }));
          }}
          error={errors.email !== ""}
        />
        <HelperText type="error" visible={errors.email !== ""}>
          {errors.email}
        </HelperText>
        <TextInput
          left={<TextInput.Icon icon="account" color="#211951" />}
          label={<Text style={styles.label}>Your Name</Text>}
          value={name}
          mode="outlined"
          onChangeText={(name) => {
            setName(name);
          }}
        />
        <HelperText type="error" visible={errors.name !== ""}>
          {errors.name}
        </HelperText>
        <TextInput
          left={<TextInput.Icon icon="cake" color="#211951" />}
          label={<Text style={styles.label}>Year of Birth</Text>}
          value={birthyear}
          mode="outlined"
          keyboardType="numeric"
          onChangeText={handleNumberInput}
        />
        <HelperText type="error" visible={errors.birthyear !== ""}>
          {errors.birthyear}
        </HelperText>
        <TextInput
          left={<TextInput.Icon icon="key" color="#211951" />}
          label={<Text style={styles.label}>Password</Text>}
          value={password}
          mode="outlined"
          onChangeText={(password) => {
            setPassword(password);
            setErrors((errors) => ({ ...errors, password: "" }));
          }}
          error={errors.password !== ""}
          secureTextEntry
        />
        <HelperText type="error" visible={errors.password !== ""}>
          {errors.password}
        </HelperText>
        <TextInput
          left={<TextInput.Icon icon="key" color="#211951" />}
          label={<Text style={styles.label}>Repeat Password</Text>}
          value={repeatPassword}
          mode="outlined"
          onChangeText={(password) => {
            setRepeatPassword(password);
            setErrors((errors) => ({ ...errors, repeatPassword: "" }));
          }}
          error={errors.repeatPassword !== ""}
          secureTextEntry
        />
        <HelperText type="error" visible={errors.repeatPassword !== ""}>
          {errors.repeatPassword}
        </HelperText>
      </View>

      <TouchableOpacity onPress={handleSignIn} style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <View style={styles.linkContainer}>
        <Text style={styles.text}>
          Have an account?{" "}
          <Link href="/sign-in" style={styles.link}>
            Sign In
          </Link>
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    marginBottom: 20,
    color: "#211951",
    fontFamily: "MontserratExtraBold",
  },
  button: {
    alignSelf: "center",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "#211951",
    borderRadius: 8,
    alignItems: "center",
    width: "40%",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "MontserratBold",
  },
  linkContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  text: {
    textAlign: "center",
    fontFamily: "MontserratMedium",
    fontSize: 12,
    color: "#211951",
  },
  link: {
    textDecorationLine: "underline",
    fontFamily: "MontserratBold",
    fontSize: 12,
    color: "#211951",
  },
  centeredLink: {
    alignItems: "center",
  },
  homeLink: {
    textDecorationLine: "underline",
    fontFamily: "MontserratBold",
    fontSize: 12,
    color: "#211951",
  },
  label: {
    fontFamily: "MontserratMedium",
    fontSize: 12,
  },
});
