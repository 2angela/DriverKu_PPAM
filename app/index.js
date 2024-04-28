
import { Text, TouchableOpacity, View, Image} from "react-native";
import {Link, Redirect} from "expo-router";
import { useAuth } from "../contexs/AuthProvider";
import FontRegistry from '../FontRegistry';
import { useFonts, Montserrat_500Medium, Montserrat_700Bold, Montserrat_800ExtraBold } from '@expo-google-fonts/montserrat';

export default function Index(){
    const { user } = useAuth();

    // Load fonts using useFonts hook
    const [fontsLoaded] = useFonts({
        MontserratMedium: Montserrat_500Medium,
        MontserratBold: Montserrat_700Bold,
        MontserratExtraBold: Montserrat_800ExtraBold,
    });

    // Log the value of fontsLoaded directly inside the component function
    console.log(fontsLoaded); 

    if(user){
        return <Redirect href={"/home"}/>
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image
                source={require('../assets/icon.png')}
                style={{ width: '80%', height: '40%', resizeMode: 'cover',  marginTop: 40 }}
            />
            
            {/* Box with two rows of text and a button */}
            <View style={{ marginTop: 10, padding: 20, backgroundColor: '#211951',  flex: 1, alignItems: 'center', justifyContent: 'center',  width: '100%'  }}>
                <Text style={{ fontSize: 35, fontFamily: FontRegistry.MontserratBold, color: '#15F5BA' }}>Wherever You Go,</Text>
                <Text style={{ fontSize: 35, fontFamily: FontRegistry.MontserratBold, color: '#15F5BA' }}>Your Driver Follows:</Text>
                <Text style={{ fontSize: 35, marginBottom: 30, fontFamily: FontRegistry.MontserratBold, color: '#15F5BA' }}>Book Now!</Text>
                <Text style={{ fontSize: 15,  fontFamily: FontRegistry.MontserratMedium, color: 'white' }}>We provide the best drivers in</Text>
                <Text style={{ fontSize: 15, marginBottom: 20, fontFamily: FontRegistry.MontserratMedium, color: 'white' }}>town to guarantee your safety!</Text>
                {/* Button */}
                <Link href="/sign-in" asChild>
                <TouchableOpacity
                    onPress={() => {
                        // Handle button press
                    }}
                    style={{ marginTop:20, padding: 10, backgroundColor: 'white', borderRadius: 5, alignItems: 'center', width:'50%'}}
                >
                    <Text style={{ color: '#211951', fontSize: 20, fontFamily: 'Roboto-Bold' }}>Sign In</Text>
                </TouchableOpacity>
                </Link>
                
            </View>
        </View>

    );

    
}

