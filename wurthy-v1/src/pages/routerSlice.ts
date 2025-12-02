import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface RouterState {
    activePage: string
}

const initialState: RouterState = {
    activePage: "dashboard"
}

const routerSlice = createSlice({
    name: "router",
    initialState,
    reducers: {
        setActivePage: (state, action: PayloadAction<string>) => {
            state.activePage = action.payload
        }
    }
});

export const { setActivePage } = routerSlice.actions;
export default routerSlice.reducer;