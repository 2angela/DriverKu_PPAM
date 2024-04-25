import { Text, View} from "react-native";
import {Link,Stack} from "expo-router";
export default function Blog(){

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Stack.Screen
                options={{
                    title: "Home",
                }}
            />
            <Text style={{fontSize: 30}}>Blog Screen</Text>
            <Link href="/">Go to Landing</Link>
        </View>
    );

    
}