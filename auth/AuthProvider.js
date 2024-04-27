import React, { useState, useEffect } from "react";
import auth from '@react-native-firebase/auth';

const AuthContext = React.createContext();


export function useAuth(){

    return React.useContext(AuthContext);
}

export default function AuthProvider({children}){
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    // Set an initializing state whilst Firebase connects
    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();

    // Handle user state changes
    function onAuthStateChanged(user) {
        console.log("onAuthStateChanged", user)
        setUser(user);
        if(!user)
            setIsLoggedIn(false);
        else
            setIsLoggedIn(true);

        if (initializing) setInitializing(false);
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    const signIn = (email,password)=>{
        // setIsLoggedIn(true);
        return auth().signInWithEmailAndPassword(email,password);
    }

    const signUp = (email,password) =>{
        return auth().createUserWithEmailAndPassword(email,password);
    }

    const signOut = ()=>{
        // setIsLoggedIn(false);
        return auth().signOut();
    }

    console.log("user",user)

    return <AuthContext.Provider value={{
        isLoggedIn,
        user,
        signIn,
        signOut,
        signUp
    }}>
        {children}
    </AuthContext.Provider>
}

