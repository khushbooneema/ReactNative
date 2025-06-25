import { ThunkAction } from "@reduxjs/toolkit";
import { User } from "../../API/endpoint";
import { RootState } from "../store";
import { setUser } from "../Reducer/UserReducer";
import { saveUser, getUser, getAllUsers } from "../../SQLiteStore/UserProfileDB";
import { getDBConnection } from "../../SQLiteStore/FavoriteMovieDB";

//redux actions
const db = getDBConnection()

export const setUserToDB = (user: User): ThunkAction<void, RootState, unknown, any> => 
    async(dispatch, getState) => {

    try {
        saveUser(await db, user)
        dispatch(setUser(user))
    } catch (error) {
        return error
    }
}

export const getUserFromDB = (username: string, password: string): ThunkAction<void, RootState, unknown, any> => 
    async(dispatch, getState) => {

    try {
        const user = getUser(await db, username, password)
        dispatch(setUser(user))
    } catch (error) {
        return error
    }
}