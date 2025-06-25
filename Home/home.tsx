import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native"
import { useMovie } from "../Hooks/MovieHook";
import { MovieGrid } from "../CommonUI/MovieGrid";
import { useFavorite } from "../Hooks/FavoriteHook";
import { useEffect } from "react";
import { Movie } from "../API/endpoint";

const Home = () => {
    const { movies, error, loading, fetchMovies, page, sortMovies } = useMovie()
    const { favorites, isFavorite, toggleFavorite } = useFavorite();

    const renderItem = ({ item }: { item: any }) => (
        <MovieGrid
        movie={item}
        isFavorite={isFavorite(item.id)}
        onPressFavorite={() => toggleFavorite(item)}
    />
    );

    const renderFooter = () => {
        if (!loading) {
            return null
        } else {
            return (<Text>Loading....</Text>);
        }
    }

    const loadMoreMovies = () => {
        
        if (!loading && movies.length > 0) {
            fetchMovies(page + 1);
        }
    }

    // Sort options
    const sortProps = [
        {
            id: 2,
            sort: "Popularity"
        },
        {
            id: 3,
            sort: "Release Date"
        },
        {
            id: 4,
            sort: "Vote count"
        }
    ]

    const [sortSelected, setSortSelected] = useState(sortProps[0].id);

    const sortText = ({item}: {item: {id: number, sort: string}}) => {
        return (
            <TouchableOpacity style={[styles.sortContainer, (item.id == sortSelected) ? styles.sortContainerSelectedBackground : styles.sortContainerNonSelectedBackground]} 
            onPress={() => {
                console.log("Sort button pressed: ", item.sort)
                setSortSelected(item.id);
                sortMovies(item.sort);
            }}>
                <Text style = {styles.sortList}>{item.sort}</Text>
            </TouchableOpacity>
        )
    }

    // return the view
    return (
        <View> 
            <FlatList
                data={sortProps}
                renderItem={sortText}
                keyExtractor={(item) => item.id.toString()}
                numColumns={4}
                showsHorizontalScrollIndicator={false}
            />

             {error != null ? (
                <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
            ) : null}

            <FlatList
                data={movies}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                contentContainerStyle={{ paddingBottom: 8 }}
                onEndReached={loadMoreMovies}
                ListFooterComponent={renderFooter}
            />
        </View>

    )
}


const styles = StyleSheet.create({
    sortContainer: {
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        padding: 8,
        width: "33.3%",
        borderColor: "black",
        borderWidth: 1
    },
    sortContainerSelectedBackground: {
        backgroundColor: "green",
    },
    sortContainerNonSelectedBackground: {
        backgroundColor: "gray",
    },
    sortList: {
        height: 40,
        textAlign: "center",
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
    }
});

export default Home;