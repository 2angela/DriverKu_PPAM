import { Stack, router } from "expo-router"
import { useState } from "react"
import { Text, View, StyleSheet} from "react-native"
import { TextInput, HelperText, Button } from "react-native-paper"
import firestore from '@react-native-firebase/firestore';
import { useAuth } from "../../../contexs/AuthProvider";

export default function ToDoCreate(){
    const { user} = useAuth();
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [loading,setLoading] = useState(false);
    const [errors,setErrors] = useState({
        title:"",
        description:""
    })

    const validate = ()=>{

        let newErrors = {
            title:"",
            description:""
        };

        if(!title.trim()){
            newErrors.title = "Title is required";
        }else if(title.length < 8){
            newErrors.title = "Title must be at least 8 chracters";
        }

        if(!description.trim()){
            newErrors.description = "Description is required";
        }else if(description.length < 24){
            newErrors.description = "Description must be at least 24 chracters";
        }


        return newErrors;

    }

    const handleCreate = async ()=>{
        const findErrors = validate();

        if(Object.values(findErrors).some(value=> value !== "")){
            console.log(findErrors)
            setErrors(findErrors)
        }else{
            setLoading(true)
             const todoColRef =  firestore().collection("users").doc(user.uid).collection("todos");

            await todoColRef.add({
                title,
                description,
                created_at: firestore.FieldValue.serverTimestamp(),
                updated_at: null,
             })

             router.back();
            
             setLoading(false)
        }
    }

    return <View style={styles.container}>
        <Stack.Screen
        options={{
            title : "Create To Do"
        }}
        />
        <TextInput
                left={<TextInput.Icon icon="format-title"/>}
                label="Title"
                disabled={loading}
                value={title}
                mode="outlined" 
                onChangeText={(title)=>{
                  
                    setTitle(title)
                    setErrors(errors=>({...errors, title: ""}))
                }}
                error={errors.title !== ""}
            />
            <HelperText type="error" visible={errors.title !== ""}>{errors.title}</HelperText>
            <TextInput
                left={<TextInput.Icon icon="card-text-outline"/>}
                label="Description"
                disabled={loading}
                value={description}
                mode="outlined" 
                multiline
                numberOfLines={12}
                onChangeText={(description)=>{
                  
                    setDescription(description)
                    setErrors(errors=>({...errors, description: ""}))
                }}
                error={errors.description !== ""}
            />
            <HelperText type="error" visible={errors.description !== ""}>{errors.description}</HelperText>

            <Button 
            loading={loading}
            onPress={handleCreate} 
            mode="contained" icon="content-save">Create</Button>
    </View>
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingHorizontal: 8,
        paddingTop: 8,
    }
})