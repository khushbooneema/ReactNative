import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../Home/home";
import { Provider } from "react-redux";
import { FavStore } from "../Store/Store";
import { Favorite } from "../Favorite/Favorite";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MovieDetailView } from "../Home/MovieDetail";
import Ionicons from "react-native-vector-icons/Ionicons";
import { getDBConnection, createFavTable } from "../SQLiteStore/FavoriteMovieDB";
import { createUser } from "../SQLiteStore/UserProfileDB";
import { Login } from "../Profile/Login";
import { NewUser } from "../Profile/NewUser";
import TheatersView from "../Home/Theaters";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const createTabBar = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
               screenOptions={({ route}) => ({
                    tabBarIcon: ({color, size}) => {
                        if (route.name === "Discover") {
                            return <Ionicons name="home" size={size} color={color} />;
                        } else if (route.name == "Favorite"){
                            return <Ionicons name="star-outline" size={size} color={color} />;
                        } else if (route.name === "Theaters") {
                            return <Ionicons name="location-outline" size={size} color={color} />;
                        } else {
                            return <Ionicons name="person-outline" size={size} color={color} />
                        }
                    }
               })}
            >
                <Tab.Screen name="Discover" component={HomeStackNavigator} options={{ headerShown: false }} />
                <Tab.Screen name="Favorite" component={Favorite} />
                <Tab.Screen name="Profile" component={ProfileStackNavigator}  options={{ headerShown: false }}/>
                <Tab.Screen name="Theaters" component={TheatersView}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="MovieDetail" component={MovieDetailView} options={{ headerBackButtonDisplayMode: "minimal" }}/>
        </Stack.Navigator>
    )
}


const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="NewUser" component={NewUser} options={{ headerBackButtonDisplayMode: "minimal" }}/>
        </Stack.Navigator>
    )
}

export const TabBar = () => {

    useEffect(() => {
        const initDB = async () => {
            const db = await getDBConnection()
            await createFavTable(db)
            await createUser(db)
        } 

        initDB()
    })

    return (
        <Provider store={FavStore}>
            {createTabBar()}
        </Provider>
    )
};