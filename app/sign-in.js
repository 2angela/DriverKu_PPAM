import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { TextInput, Button, Title, HelperText } from "react-native-paper";
import { Link, router } from "expo-router";
import { useAuth } from "../auth/AuthProvider";
import { useState } from "react";

export default function SignInScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const { signIn } = useAuth();

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

    return newErrors;
  };

  const handleSignIn = () => {
    const findErrors = validate();

    if (Object.values(findErrors).some((value) => value !== "")) {
      console.log(findErrors);
      setErrors(findErrors);
    } else {
      signIn(email, password)
        .then((res) => {
          console.log("login success", res);
          router.replace("/home");
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
      <Title style={styles.title}>Sign In</Title>
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
      </View>
      <HelperText type="error" visible={errors.password !== ""}>
        {errors.password}
      </HelperText>
      <TouchableOpacity onPress={handleSignIn} style={styles.button}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <View style={styles.linkContainer}>
        <Text style={styles.text}>
          Don't have an account?{" "}
          <Link href="/sign-up" style={styles.link}>
            Sign Up
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
