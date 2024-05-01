import { Stack, Slot } from "expo-router";
import { Text, View } from "react-native";
import AuthProvider from "../auth/AuthProvider";

export default function AppLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
