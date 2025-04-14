import { createSlice } from "@reduxjs/toolkit";

const showMobileMenu = createSlice({
    name: "mobileMenu",
    initialState: {
        state: false,
    },
    reducers: {
        toggleMobileMenu: (state, action) => {
            state.state = action?.payload;
        },
    },
});

export const { toggleMobileMenu } = showMobileMenu.actions;
export default showMobileMenu.reducer;