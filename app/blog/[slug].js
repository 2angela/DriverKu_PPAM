import { Text, View} from "react-native";
import {Link, useLocalSearchParams, Stack} from "expo-router";
export default function BlogDetail(){
    const {slug} = useLocalSearchParams()
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Stack.Screen
                options={{
                    title: "Blog Detail"
                }}
            />
            <Text style={{fontSize: 30, marginBottom: 10}}>Blog Detail Screen</Text>
            <Text style={{fontSize: 16}}>Ini detail untuk: {slug}</Text>
            <Link href="/">Go to Landing</Link>
        </View>
    );

    
}