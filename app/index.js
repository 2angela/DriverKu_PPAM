import { Text, Touchable, TouchableOpacity, View} from "react-native";
import {Link, Redirect, router} from "expo-router";
import { useAuth } from "../contexs/AuthProvider";
export default function Index(){
    const {user} = useAuth();

    if(user){
        return <Redirect href={"/home"}/>
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{fontSize: 30}}>Hello World! React Router</Text>
            <Link href="/sign-in" asChild>
                <TouchableOpacity style={{padding:10, borderColor: "black", borderWidth:1}}>
                <Text>Go to Sign In</Text>
                </TouchableOpacity>
                </Link>
            <Link href="/blog">Go to Blog</Link>
            <Link href="/blog/detail">Go to Blog Detail</Link>
            <Link href="/home">Go to Home</Link>

            <TouchableOpacity onPress={()=>{
                router.push("/home")
            }} style={{padding:10, borderColor: "black", borderWidth:1}}>
                    <Text>Go to Home menggunakan imperative API</Text>
            </TouchableOpacity>
        </View>
    );

    
}