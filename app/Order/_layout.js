import { Stack, Redirect } from "expo-router";
import { useAuth } from "../../auth/AuthProvider";

export default function AppLayout() {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Redirect href="/sign-in" />;
  }
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}
