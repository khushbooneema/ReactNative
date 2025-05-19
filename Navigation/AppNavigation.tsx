import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../Home/home";
import { Provider } from "react-redux";
import { FavStore } from "../Store/Store";
import { Favorite } from "../Favorite/Favorite";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MovieDetailView } from "../Home/MovieDetail";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const createTabBar = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen name="Discover" component={HomeStackNavigator} options={{ headerShown: false }}/>
                <Tab.Screen name="Favorite" component={Favorite} />
                <Tab.Screen name="Videos" component={Videos} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

const HomeStackNavigator = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="movieDetail" component={MovieDetailView} />
        </Stack.Navigator>
    )
}


export const TabBar = () => {
    return (
        <Provider store={FavStore}>
            {createTabBar()}
        </Provider>
    )
};


export const Videos = () => {
    return (
        <View>
            <Text>Videos</Text>
        </View>
    )
}