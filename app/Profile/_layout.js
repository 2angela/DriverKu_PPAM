import { Stack, Redirect } from "expo-router";
import { useAuth } from "../../auth/AuthProvider";

export default function ProfileLayout() {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    console.log("user not logged in");
    return <Redirect href="/sign-in" />;
  }
}
