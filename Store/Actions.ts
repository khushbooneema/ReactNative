import { ThunkAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Movie } from "../API/endpoint";
import { RootState } from "./store";
import { addFavorite, removeFavorite, setFavorite } from "./Reducer";

const favoriteKey = "FAVORITE_KEY"

const saveFavoriteToStorage = async (favorites: Movie[]) => {
    try {
        AsyncStorage.setItem(favoriteKey, JSON.stringify(favorites))
    } catch {
        console.log("Error at storing the favorites")
    }
}

const getFavoriteFromStorage = async () => {
    try {
        const favorites = await AsyncStorage.getItem(favoriteKey) 
        if (favorites) {
            return JSON.parse(favorites)
        } 
    } catch {
        console.log("Error at fetching the favorites")
    }
}

//redux actions
export const addFavoriteMovie = (movie: Movie): ThunkAction<void, RootState, unknown, any> => 
  async (dispatch, getState) => {
    try {
      dispatch(addFavorite(movie));
      await saveFavoriteToStorage([...getState().favorite.movies, movie])
    } catch (error) {
      console.error('Error adding favorite:', error);
    }
};

export const removeFavMovie = (movieId: number): ThunkAction<void, RootState,unknown, any> => 
    async (dispatch, getState) => {
      try {
        dispatch(removeFavorite(movieId));
        await saveFavoriteToStorage(
          getState().favorite.movies.filter((movie: Movie) => movie.id !== movieId)
        );
      } catch (error) {
        console.error('Error removing favorite:', error);
      }
};

export const loadFavorites = (): ThunkAction<void, RootState, unknown, any> => 
  async (dispatch) => {
    try {
      const favorites = await AsyncStorage.getItem(favoriteKey);
      if (favorites) {
        dispatch(setFavorite(JSON.parse(favorites)));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };