import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { MovieCardProps } from "../CommonUI/MovieGrid";
import { apiRequest } from "../API/apiRequest";
import { MovieDetail } from "../API/endpoint";
import { RouteProp, useNavigation } from "@react-navigation/native";

type MovieDetailRouteProps = RouteProp<{movieDetail: { movieId: number }}, 'movieDetail'>;

interface MovieDetailRoute {
    route: MovieDetailRouteProps;
}

export const MovieDetailView = ({ route }:  MovieDetailRoute) => {
    const [loading, setLoading] = useState(true);
    const [movieDetails, setMovieDetails] = useState<MovieDetail | null>(null);
    const movieId = route.params.movieId;

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
                setLoading(false);
            }

        } catch (error) {
            console.error("Error fetching movie details:", error);
        }
    }

    return (
        <View>
            <Text>{movieDetails?.overview}</Text>
        </View>
    )
}