import  { useAuth } from "../../contexs/AuthProvider";
import {Stack, Redirect} from "expo-router";

export default function ProtectedLayout(){
        const { isLoggedIn } = useAuth();

        
        if(!isLoggedIn){
            return <Redirect href="/sign-in" />
        }
        return <Stack/>
}