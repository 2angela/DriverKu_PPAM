import { Text, View, TouchableOpacity, StyleSheet, FlatList, Alert} from "react-native";

import {Link, Stack, router} from "expo-router";
import { useAuth } from "../../contexs/AuthProvider";
import { FAB, IconButton, List } from "react-native-paper";
import firestore from '@react-native-firebase/firestore';
import { useEffect, useState } from "react";


export default function SignInScreen(){
    const [data,setData] = useState([]);

    const {signOut, user} = useAuth();

    useEffect(()=>{

        const todosRef = firestore().collection("users").doc(user?.uid).collection("todos");
       const subscriber = todosRef.orderBy("created_at", "desc").onSnapshot((querySnapshot)=>{

           const newData =  querySnapshot.docs.map((doc)=>{
            return {
                id: doc.id,
                ...doc.data(),
            }
           })
           setData(newData)
        })
        
        return ()=> subscriber();
    },[user?.uid])
    const handleSignOut = ()=>{
        signOut();
    }

    const handleDelete = item => ()=>{
        Alert.alert('Delete Confirmation', "Are you sure want to delete this todo?",[
            {
                text: "Cancel",
                onPress:()=>{},
                style:"cancel"
            },
            {
                text: "Yes",
                onPress: ()=>{
                   const docRef = firestore()
                    .collection("users")
                    .doc(user?.uid)
                    .collection("todos")
                    .doc(item.id);

                    docRef.delete();
                }
            }
        ])
    }
    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen
                options={{
                    title: "To Do List",
                    headerRight:()=> <IconButton onPress={handleSignOut} icon="logout-variant"/>
                }}
            />
            {/* <Text style={{fontSize: 30}}>Home Screen</Text>
            <TouchableOpacity onPress={handleSignOut} style={{padding:10, borderColor: "black", borderWidth:1}}>
                    <Text>Sign Out</Text>
            </TouchableOpacity> */}
            <FlatList
                data={data}
                renderItem={({item})=>{

                    return <List.Item 
                    title={item.title}
                    description={item.description}
                    right={(props)=>{
            
                            return <View style={[props.style, styles.actionBtns]}>
                                    <Link href={`/todo/update?id=${item.id}`}  asChild>
                                        <IconButton 
                                        icon="pencil"
                
                                        />
                                    </Link>
                                    <IconButton 
                                         icon="delete"
                                         onPress={handleDelete(item)}
                                    />
                            </View>
                    }}
                    />
                }}
            />
            <FAB 
            icon="plus"
            style={styles.fab}
            onPress={()=>{
                router.push("/todo/create")
            }}
            />
           
        </View>
    );

    
}

const styles = StyleSheet.create({
    fab:{
        position:"absolute",
        right:0,
        bottom: 0,
        margin: 16,

    },
    actionBtns:{
        flexDirection: "row"
    }
})