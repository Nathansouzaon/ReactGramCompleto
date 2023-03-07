import { configureStore } from '@reduxjs/toolkit';

import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
    //aqui estão os contextos
    reducer:{
        auth: authReducer,
        user: userReducer,
    },
});