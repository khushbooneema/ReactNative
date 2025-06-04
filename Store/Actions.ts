import { ThunkAction } from "@reduxjs/toolkit";
import { Movie } from "../API/endpoint";
import { RootState } from "./store";
import { addFavorite, removeFavorite, setFavorite } from "./Reducer";
import { createTable, getFavMovies, saveFavorites, deleteFav, getDBConnection } from "../SQLiteStore/dbService";

const favoriteKey = "FAVORITE_KEY"

const db = getDBConnection()

const saveFavoriteToStorage = async (favorite: Movie) => {
    try {
        await saveFavorites(
          await db,
          favorite
        )
    } catch {
        console.log("Error at storing the favorites")
    }
}

const getFavoriteFromStorage = async () => {
    try {
        return await getFavMovies(await db)
    } catch {
        console.log("Error at fetching the favorites")
    }
}

//redux actions
export const addFavoriteMovie = (movie: Movie): ThunkAction<void, RootState, unknown, any> => 
  async (dispatch, getState) => {
    try {
        console.log("entering into save movie block")
        await saveFavoriteToStorage(movie)
        dispatch(addFavorite(movie));
    } catch (error) {
      console.error('Error adding favorite to the db:', error);
    }
};


export const removeFavMovie = (movieId: number): ThunkAction<void, RootState,unknown, any> => 
    async (dispatch, getState) => {
      try {
        await deleteFav( 
          await db,
          movieId
        )
        dispatch(removeFavorite(movieId));
      } catch (error) {
        console.error('Error removing favorite:', error);
      }
};

export const loadFavorites = (): ThunkAction<void, RootState, unknown, any> => 
  async (dispatch) => {
    try {
      const favorites = await getFavMovies(await db)
      if (favorites.length) {
        dispatch(setFavorite(favorites));
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };