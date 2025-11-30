import { configureStore } from "@reduxjs/toolkit";
import mainPanelSlice from "@/components/features/MainPanel/mainPanelSlice";
import routerSlice from "@/pages/routerSlice";

export const store = configureStore({
    reducer: {
        mainPanel: mainPanelSlice,
        router: routerSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;