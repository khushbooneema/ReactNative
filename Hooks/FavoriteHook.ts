import { UseSelector, useDispatch, useSelector } from "react-redux";
import { use, useEffect } from "react";
import { RootState, AppDispatch } from "../Store/store";
import { loadFavorites, removeFavMovie } from "../Store/Actions";
import { Movie } from "../API/endpoint";
import { addFavorite } from "../Store/Reducer";

export const useFavorite = () => {
    
    const favorites = useSelector((state: RootState) => state.favorite.movies);
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(loadFavorites())
    }, [dispatch])

    const isFavorite = (movieId: number) => {
        return favorites.some((movie) => movie.id === movieId)
    }

    const toggleFavorite = (movie: Movie) => {
        console.log("Toggle is pressed", movie)
        if (isFavorite(movie.id)) {
            console.log("movie is removed from favorites", movie)
            dispatch(removeFavMovie(movie.id))
        } else {
            console.log("movie is added to favorites", movie)
            dispatch(addFavorite(movie))
        }
    }

    return {
        favorites,
        isFavorite,
        toggleFavorite
    }
}