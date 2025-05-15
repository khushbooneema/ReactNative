import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "../API/endpoint";
import { act } from "react";

interface FavoriteState {
    movies: Movie[]
}

const initialState: FavoriteState = {
    movies: [],
}

const FavoriteSlice = createSlice({
    name: 'favorite',
    initialState,
    reducers: {
        addFavorite: (state, action: PayloadAction<Movie>) => {
            state.movies.push(action.payload)
        },
        removeFavorite: (state, action: PayloadAction<number>) => {
            state.movies = state.movies.filter(movie => movie.id !== action.payload)
        },
        setFavorite: (state, action: PayloadAction<Movie[]>) => {
            state.movies = action.payload
        }
    }
})

export const favoriteReducer = FavoriteSlice.reducer
export const { addFavorite, removeFavorite, setFavorite } = FavoriteSlice.actions