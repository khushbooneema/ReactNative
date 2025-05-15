import { configureStore } from "@reduxjs/toolkit";
import { favoriteReducer } from "./Reducer";

export const FavStore = configureStore({
    reducer: {
        favorite: favoriteReducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export type RootState = ReturnType<typeof FavStore.getState>
export type AppDispatch = typeof FavStore.dispatch