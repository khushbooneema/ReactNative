import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    id: null,
    name: '',
    username: ''
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        setUser(state, action) {
            state.id = action.payload.id
            state.name = action.payload.name
            state.username = action.payload.username
        }
    }
})

export const userReducer = userSlice.reducer
export const {setUser} = userSlice.actions