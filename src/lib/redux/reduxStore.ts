import { configureStore } from "@reduxjs/toolkit";
import authSlice from './authSlice';
import patientsSlice from './patientsSlice';

const reduxStore = configureStore({
    reducer: {
        authSlice,
        patientsSlice,
    }
})
export default reduxStore