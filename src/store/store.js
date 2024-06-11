import {configureStore} from '@reduxjs/toolkit'
import dataSlice from "./dataSlice";

const store = configureStore({
    reducer: {
        data: dataSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    })
});

export default store;