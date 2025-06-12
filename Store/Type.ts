
import { Movie } from "../API/endpoint";

export interface FavoriteMovie {
    movie: Movie[]
}

export const ADD_FAVORITE = "ADD_FAVORITE"
export const REMOVE_FAVORITE = "REMOVE_FAVORITE"
export const SET_FAVORITE = "SET_FAVORITE"
export const SET_USER = "SET_USER"

interface AddFavorite {
    type: typeof ADD_FAVORITE
    description: "Added a movie to favorites"
    payload: Movie[]
}

interface RemoveFavorite {
    type: typeof REMOVE_FAVORITE
    description: "Removed a movie from favorites"
    payload: number
}

interface SetFavorite {
    type: typeof SET_FAVORITE
    description: "Set the favorites list"
    payload: Movie[]
}

interface SetUser {
    type: typeof SET_USER
    description: "User saved into DB"
    payload: {id: number, name: string, username: string}
}