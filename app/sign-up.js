import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { TextInput, Title, HelperText } from "react-native-paper";
import { Link, router } from "expo-router";
import { useAuth } from "../auth/AuthProvider";
import { useState } from "react";
import firestore from "@react-native-firebase/firestore";
export default function SignUpScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    repeatPassword: "",
  });
  const { signUp } = useAuth();

  const validate = () => {
    let newErrors = {
      email: "",
      password: "",
    };

    if (!email) {
      newErrors.email = "Email is required";
    }

    if (!password) {
      newErrors.password = "Password is required";
    }

    if (!repeatPassword) {
      newErrors.repeatPassword = "Repeat Password is required";
    } else if (password !== repeatPassword) {
      newErrors.repeatPassword = "Repeat Password is not equal with password";
    }

    return newErrors;
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
            .set({ email })
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.error(error);
              return null;
            });

          router.replace("/Home");
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
      </View>
      <HelperText type="error" visible={errors.repeatPassword !== ""}>
        {errors.repeatPassword}
      </HelperText>

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

      <View style={styles.centeredLink}>
        <Link href="/" style={styles.homeLink}>
          Home
        </Link>
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
