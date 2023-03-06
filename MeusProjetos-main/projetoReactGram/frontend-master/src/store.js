import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';

export const store = configureStore({
    //aqui estão os contextos
    reducer:{
        auth: authReducer,
    },
});