import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { useFavorite } from "../Hooks/FavoriteHook";
import { MovieGrid } from "../CommonUI/MovieGrid";
import { Text } from "@react-navigation/elements";


export const Favorite = () =>  {
    const {favorites, isFavorite, toggleFavorite} = useFavorite();

    const renderItem  = ({item}: {item: any}) => (
         <MovieGrid
            movie={item}
            isFavorite={isFavorite(item.id)}
            onPressFavorite={() => toggleFavorite(item)}
        />
    )

     const renderEmptyText = () => {
        return (
            <View style={styles.noFavContainer}>
                <Text style={styles.noFavText}>No favorite movies are available</Text>
            </View>
        )
    }

    const renderFavList = () => {
        return (
            <View style={styles.FavContainer}>
                <FlatList
                    data={favorites}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3}
                />
            </View>
        )
    }

    return (
        <View style={styles.container}>
            {favorites.length === 0 ? (
                renderEmptyText()
            ) : (
                renderFavList()
            )}
        </View>   
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    noFavContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    FavContainer: {
        padding: 10
    },
    noFavText: {
        fontSize: 20,
        textAlign: "center",
        width: "100%",
        height: 50
    }     
})