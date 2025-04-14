import { createSlice } from "@reduxjs/toolkit";

const userDetail = createSlice({
    name: "userData",
    initialState: {
        userData: {},
    },
    reducers: {
        setUserData: (state, action) => {
            console.log("action?.payload", action?.payload);
            state.userData = action?.payload;
        },
    },
});

export const { setUserData } = userDetail.actions;
export default userDetail.reducer;