import { UseSelector, useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { RootState, AppDispatch } from "../Store/store";
import { loadFavorites, removeFavMovie, addFavoriteMovie } from "../Store/Actions/FavActions";
import { Movie } from "../API/endpoint";
import { addFavorite } from "../Store/Reducer/FavReducer";

export const useFavorite = () => {
    
    const favorites = useSelector((state: RootState) => state.favorite.movies);
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        dispatch(loadFavorites())
    }, [dispatch])

    const isFavorite = (movieId: number) => {
        console.log(favorites.length)
        return favorites.some((movie) => movie.id === movieId)
    }

    const toggleFavorite = (movie: Movie) => {
        console.log("Toggle is pressed", movie)
        if (isFavorite(movie.id)) {
            dispatch(removeFavMovie(movie.id))
        } else {
            dispatch(addFavoriteMovie(movie))
        }
    }

    return {
        favorites,
        isFavorite,
        toggleFavorite
    }
}