import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { MovieCardProps } from "../CommonUI/MovieGrid";
import { apiRequest } from "../API/apiRequest";
import { Language, MovieDetail } from "../API/endpoint";
import { RouteProp, useNavigation } from "@react-navigation/native";

type MovieDetailRouteProps = RouteProp<{movieDetail: { movieId: number }}, 'movieDetail'>;

interface MovieDetailRoute {
    route: MovieDetailRouteProps;
}

export const MovieDetailView = ({ route }:  MovieDetailRoute) => {
    const [loading, setLoading] = useState(true);
    const [movieDetails, setMovieDetails] = useState<MovieDetail | null>(null);
    
    const movieId = route.params.movieId;
    const navigation = useNavigation();

    useEffect(() => {
        fetchDetails();
    }, [])

    const fetchDetails = async () => {
        // Fetch movie details from API
        try {
            const response = await apiRequest<MovieDetail>(
                'movie/' + movieId,
                { method: "GET" },
                { page: 1 }
            );

            if (response.status == 200) {
                // Handle successful response
                console.log("Movie details:", response.data);
                setMovieDetails(response.data);
                navigation.setOptions({ title: response.data.title });
                setLoading(false);
            }

        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    }

    const runTime = (min: number | undefined) => {
        if (min === undefined) return "Unknown";
        
        const hours = Math.floor(min / 60);
        const minutes = min % 60;
        return `${hours}h ${minutes}m`;
    }

    const languages = (languages: Language[] | undefined) => {
        let lang = "";
        console.log("Languages: ", languages);

        if (languages == null || languages.length === 0) {
            return "No languages available";
        }

        languages.forEach((language) => {
            lang += language.name + ", ";
        });
       
        return lang.slice(0, -2); // Remove the last comma and space
    }

    return (
        <View style={styles.container}>
            <Image source={{uri: 'https://image.tmdb.org/t/p/w400' + movieDetails?.poster_path}} style={styles.image}></Image>
            <Text style={styles.title}>{movieDetails?.title}</Text>
            <Text style= {styles.subtext}>
                {movieDetails?.release_date} | {runTime(movieDetails?.runtime)} | {languages(movieDetails?.languages)} | {movieDetails?.vote_count} ⭐
            </Text>
            <Text style={styles.overview}>{movieDetails?.overview}</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 0,
    },
    image: {
        width: '100%',
        height: 400,
        borderRadius: 8
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 2,
        paddingHorizontal: 10,
    },
    overview: {
        fontSize: 16,
        paddingHorizontal: 10,
        marginBottom: 8,
    },
    subtext: {
        fontSize: 12,
        color: '#666',
        paddingHorizontal: 10,
        marginBottom: 8,
    }
});
    