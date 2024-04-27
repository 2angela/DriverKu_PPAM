import { Text, Touchable, TouchableOpacity, View } from "react-native";
import { Link, Redirect, router } from "expo-router";
import { useAuth } from "../auth/AuthProvider";
export default function Index() {
  const { user } = useAuth();

  if (user) {
    return <Redirect href={"/Home"} />;
  }
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30 }}>
        Wherever You Go Your Driver Follows: Book Now
      </Text>
      <Link href="/sign-in" asChild>
        <TouchableOpacity
          style={{ padding: 10, borderColor: "black", borderWidth: 1 }}
        >
          <Text>Sign In</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
