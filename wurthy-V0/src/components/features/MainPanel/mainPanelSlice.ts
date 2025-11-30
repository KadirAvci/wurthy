import { createSlice } from '@reduxjs/toolkit'

export interface MainPanelState {
    isActive: boolean;
}

const initialState: MainPanelState = {
    isActive: false
}

const mainPanelSlice = createSlice({
    name: 'mainPanel',
    initialState,
    reducers: {
        toggle: (state) => { state.isActive = !state.isActive },
    }
})

export const { toggle } = mainPanelSlice.actions;
export default mainPanelSlice.reducer;