import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../Store/store";
import { View, Text, TextInput, StyleSheet, Alert } from "react-native";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@react-navigation/elements";
import { User } from "../API/endpoint";
import { saveUser } from "../SQLiteStore/UserProfileDB";
import { useUser } from "../Hooks/UserHook";
import { getDBConnection } from "../SQLiteStore/FavoriteMovieDB";
import { getAllUsers } from "../SQLiteStore/UserProfileDB";

export const NewUser = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [emailId, setEmailId] = useState('')
    const [country, setCountry] = useState('')
    const [zipcode, setZipcode] = useState('')

    const [users, setUsers] = useState([])
    const {user, setUser, getUser} = useUser()

    const navigation = useNavigation()

    const getAllUserCount = async () => {
        let db = await getDBConnection()
        try {
            const users = await getAllUsers(db)
            console.log(`${users ?? 0} has been fetched`)
        } catch {
            console.log("failed to get the count of all users")
        }
    }

    useEffect( () => {
        getAllUserCount()
    }, [])

    return (
        <View style={styles.container}>
            <TextInput 
                style = {styles.TextField}
                placeholder="Name"
                placeholderTextColor="#888"
                value={name}
                onChangeText={text => setName(text)}
                autoCorrect={false}
                autoCapitalize="none"
            />
            <TextInput 
                style = {styles.TextField}
                placeholder="Email Address"
                placeholderTextColor="#888"
                value={emailId}
                onChangeText={text => setEmailId(text)}
                autoCorrect={false}
                autoCapitalize="none"
            />
            <TextInput 
                style = {styles.TextField}
                placeholder="Username"
                placeholderTextColor="#888"
                value={username}
                onChangeText={text => setUsername(text)}
                autoCorrect={false}
                autoCapitalize="none"
            />  
            <TextInput 
                style = {styles.TextField}
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
                autoCorrect={false}
                autoCapitalize="none"
            />
            <TextInput 
                style = {styles.TextField}
                placeholder="Country"
                placeholderTextColor="#888"
                value={country}
                onChangeText={text => setCountry(text)}
                autoCorrect={false}
                autoCapitalize="none"
            />
            <TextInput 
                style = {styles.TextField}
                placeholder="Zipcode"
                placeholderTextColor="#888"
                value={zipcode}
                onChangeText={text => setZipcode(text)}
                autoCorrect={false}
                autoCapitalize="none"
                inputMode="numeric"
            />
        
            <Button 
                style={styles.LoginButton}
                onTouchEnd={() => {
                    registerUser()
                    console.log("Register button tapped")
                }}
            >Register</Button>
        
        </View>
    )

    function registerUser() {
        const user: User = {
            id: 1,
            name: name,
            username: username,
            password: password,
            emailId: emailId,
            country: country,
            zipcode: zipcode
        }
        
        try {
            setUser(user)
            Alert.alert("Hoorey", "User registered to the TMDB", [{
                text: "Ok",
                onPress: () => {
                    navigation.goBack()
                }
            }])
        } catch (error) {
            Alert.alert("Error", `There is some trouble at saving the user ${error}`);
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    TextField: {
        width: "70%",
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 15,
        marginBottom: 17,
        padding:8
    },
    LoginButton: {
        width: "70%",
        height: 40,
        marginBottom: 17
    },
    ButtonLink: {
        marginBottom: 12,
        color: "dodgerblue",
        textDecorationLine: "underline"
    }
})