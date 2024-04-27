import { View, Text, TouchableOpacity } from "react-native";
import { Link, router } from "expo-router";
import { useAuth } from "../../auth/AuthProvider";
import { IconButton } from "react-native-paper";

export default function Home() {
  const { signOut, user } = useAuth();
  const handleSignOut = () => {
    router.push("/");
    signOut();
  };
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Homepage</Text>
      <Link href="/Order">Order Page</Link>
      <TouchableOpacity onPress={handleSignOut}>
        <Text>Landing Page (log out)</Text>
      </TouchableOpacity>
    </View>
  );
}
