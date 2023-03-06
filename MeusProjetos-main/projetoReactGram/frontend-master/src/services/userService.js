import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'; 

const initialState = {
    user: {},
    error: false,
    success: false,
    loading: false,
    message: null
}


export const userSlice = createSlice({
    name: "user", 
    initialState,
    reducer: {
        resetMessage: (state) => {
            state.message
        }
    }
})