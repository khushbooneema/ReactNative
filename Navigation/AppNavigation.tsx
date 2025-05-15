import React from "react";
import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../Home/home";
import { Provider } from "react-redux";
import { FavStore } from "../Store/Store";
import { Favorite } from "../Favorite/Favorite";

const Tab = createBottomTabNavigator();

const createTabBar = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                 <Tab.Screen 
                    name="Movies" 
                    component={Home}
                    options = {{
                        headerShown: true,
                        tabBarLabel: "Home",
                    }}
                />
                <Tab.Screen name="Favorite" component={Favorite} />
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export const TabBar = () => {
    return (
        <Provider store={FavStore}>
            {createTabBar()}
        </Provider>
    )
};
