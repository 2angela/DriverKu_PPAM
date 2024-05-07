import { Slot } from "expo-router";
import AuthProvider from "../auth/AuthProvider";

export default function AppLayout() {
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
