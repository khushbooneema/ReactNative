import React from "react";
import { View, FlatList } from "react-native";
import { useFavorite } from "../Hooks/FavoriteHook";
import { MovieGrid } from "../CommonUI/MovieGrid";


export const Favorite = () =>  {
    const {favorites, isFavorite, toggleFavorite} = useFavorite();

    const renderItem  = ({item}: {item: any}) => (
         <MovieGrid
            movie={item}
            isFavorite={isFavorite(item.id)}
            onPressFavorite={() => toggleFavorite(item)}
        />
    )

    return (
        <View>
            <FlatList
                data={favorites}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
            />
        </View>
    )

}