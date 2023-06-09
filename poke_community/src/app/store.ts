import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./slices/ui/uiSlice";
import dataSlice from "./slices/data/dataSlice";

export const store = configureStore({
    reducer: {
        data: dataSlice,
        ui: uiSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch