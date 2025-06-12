import React, { use } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, StyleProp, ViewStyle } from "react-native";
import { useState } from "react";
import { Button } from "@react-navigation/elements";
import { useSelector, UseSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../Store/store";
import { useNavigation } from "@react-navigation/native";


interface ButtonLinkProps {
    style: StyleProp<ViewStyle>
    name: string
    onPress: () => void
}

export const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const user = useSelector((state: RootState) => state.user)
    const dispatch = useDispatch<AppDispatch>
    const navigation = useNavigation()

    const ButtonLink = ({style, name, onPress }: ButtonLinkProps ) => {
        return (
            <TouchableOpacity
                onPress={onPress}
            >
                <View>
                    <Text style={style}> {name} </Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
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

             <Button style={styles.LoginButton}>Login</Button>

             forgot password
             <ButtonLink 
                style={styles.ButtonLink}
                name="Forgot password?"
                onPress={() => {
                    console.log("Forgot button is pressed...")
                }}
            />
                    navigation.navigate("New User")
            <ButtonLink
                style={styles.ButtonLink}
                name="New User?"
                onPress={()=> {
                    navigation.navigate("NewUser", {})
                    console.log("New user button is pressed...")
                }}
            />
        </View>
    )
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
