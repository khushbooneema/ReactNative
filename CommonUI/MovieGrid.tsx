import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Movie } from "../API/endpoint";
import { useNavigation } from "@react-navigation/native";
import { MovieDetailView } from "../Home/MovieDetail";

export interface MovieCardProps {
    movie: Movie
    isFavorite: boolean
    onPressFavorite: () => void
}

export const MovieGrid = ({ movie, isFavorite, onPressFavorite }: MovieCardProps) => {
    const navigation = useNavigation();
    
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                console.log("Movie pressed: ", movie.title, navigation)
                navigation.navigate("movieDetail", { movieId: movie.id })
            }}
            >
            <View style = {styles.imageContainer}>
                <Image source={{uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}`}} style={styles.image}/>
                <Text>{movie.popularity}</Text>
                <Text>{movie.vote_count}</Text>
                <Text>{movie.release_date}</Text>
            </View>

            <TouchableOpacity
                style = {isFavorite ? styles.favoriteButtonFill: styles.favoriteButtonEmpty}
                onPress={onPressFavorite}
            />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin:4,
        maxWidth: "33.3%"
    },
    imageContainer: {
        position:'relative',
        aspectRatio: 2/3
    },
    image: {
        width: "100%",
        height: "75%",
        borderRadius: 8.0
        
    },
    favoriteButtonFill: {
        right: 8,
        top: 8,
        width: 25,
        height: 30,
        padding: 4,
        borderRadius:10,
        position: "absolute",
        backgroundColor: "red"
    },
    favoriteButtonEmpty: {
        right: 8,
        top: 8,
        width: 25,
        height: 30,
        padding: 4,
        borderRadius:10,
        position: "absolute",
        backgroundColor: "gray"
    }

})