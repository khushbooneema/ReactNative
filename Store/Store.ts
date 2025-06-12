import { configureStore } from "@reduxjs/toolkit";
import { favoriteReducer } from "./Reducer/FavReducer";
import { userReducer } from "./Reducer/UserReducer";

export const FavStore = configureStore({
    reducer: {
        favorite: favoriteReducer,
        user: userReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export type RootState = ReturnType<typeof FavStore.getState>
export type AppDispatch = typeof FavStore.dispatch