import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Movie } from "../API/endpoint";
import { useNavigation } from "@react-navigation/native";
import { MovieDetailView } from "../Home/MovieDetail";
import Ionicons from "react-native-vector-icons/Ionicons";

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
                {/* <Text>{movie.popularity}</Text>
                <Text>{movie.vote_count}</Text>
                <Text>{movie.release_date}</Text> */}
                
                <TouchableOpacity onPress={onPressFavorite} style={styles.favoriteButton}>
                    {favIcon(isFavorite)}
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )

    function favIcon(isFavorite: boolean) {
        if (isFavorite) {
            return <Ionicons name="heart" size={25} color="red" />;
        } else {
            return <Ionicons name="heart-outline" size={25} color="white" />;
        }
    }

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
        height: "100%",
        borderRadius: 8.0
        
    },
    favoriteButton: {
        position: 'absolute',
        top: 8,
        right: 8,
        borderRadius: 12,
        padding: 4,
    }
})