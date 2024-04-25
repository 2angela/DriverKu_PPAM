import { View, StyleSheet} from "react-native";
import { TextInput, Button, Title, HelperText } from 'react-native-paper';
import {Link, router} from "expo-router";
import { useAuth } from "../contexs/AuthProvider";
import { useState } from "react";
export default function SignInScreen(){
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [repeatPassword,setRepeatPassword] = useState("");
    const [errors,setErrors] = useState({
        email:"",
        password:"",
        repeatPassword:""
    })
    const {signUp} = useAuth();

    const validate = ()=>{

        let newErrors = {
            email:"",
            password:""
        };

        if(!email){

            newErrors.email = "Email is required";
        }

        if(!password){
            newErrors.password = "Password is required";
        }

        if(!repeatPassword){
            newErrors.password = "Repeat Password is required";
        } else if(password !== repeatPassword){
            newErrors.repeatPassword = "Repeat Password is not equal with password";
        }

        

        return newErrors;

    }

    const handleSignIn = ()=>{
        const findErrors = validate();

        if(Object.values(findErrors).some(value=> value !== "")){
            console.log(findErrors)
            setErrors(findErrors)
        }else{
            signUp(email,password).then(res=>{
                console.log("login success",res)
                router.replace("/home");
            }).catch((error)=>{
           
                let newErrors = {
                    email: "",
                    password:""
                }
                if(error.code === "auth/invalid-credential"){
                    newErrors.email = "Email or password invalid.";
                }else{
                    newErrors.email = "Something went wrong.";
                }
                setErrors(newErrors)
            })
            // router.replace("/home");
        }
    }
    return (
        <View style={styles.container}>
            <Title style={styles.title}>Sign Up</Title>
            <View style>
            <TextInput 
                left={<TextInput.Icon icon="email"/>}
                label="Email"
                value={email}
                mode="outlined" 
                onChangeText={(email)=>{
                  
                    setEmail(email)
                    setErrors(errors=>({...errors, email: ""}))
                }}
                error={errors.email !== ""}
            />
            <HelperText type="error" visible={errors.email !== ""}>{errors.email}</HelperText>
            <TextInput
                left={<TextInput.Icon icon="key"/>}
                label="Password" 
                value={password}
                mode="outlined" 
                onChangeText={(password)=>{

                    setPassword(password)
                    setErrors(errors=>({...errors, password: ""}))

                }}
                error={errors.password !== ""}
                secureTextEntry
            />
            <HelperText type="error" visible={errors.password !== ""}>{errors.password}</HelperText>
             <TextInput
                left={<TextInput.Icon icon="key"/>}
                label="Repeat Password" 
                value={repeatPassword}
                mode="outlined" 
                onChangeText={(password)=>{

                    setRepeatPassword(password)
                    setErrors(errors=>({...errors, repeatPassword: ""}))

                }}
                error={errors.repeatPassword !== ""}
                secureTextEntry
            />
            </View>
            <HelperText type="error" visible={errors.repeatPassword !== ""}>{errors.repeatPassword}</HelperText>
            <Button mode="contained" onPress={handleSignIn} style={styles.button}>
                Sign Up
            </Button>
           
           
            <Link href="/sign-in" >Already have account?</Link>
            <Link href="/" >Go To Landing</Link>
            
        </View>
    );

    
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 20,
    },
    button: {
      marginBottom: 10,
    },
  });