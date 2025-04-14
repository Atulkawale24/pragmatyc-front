import { configureStore } from "@reduxjs/toolkit";
import userDetail from "./userDetail";
import showMobileMenu from "./showMobileMenu";

const store = configureStore({
    reducer: {
        userDetail: userDetail,
        showMobileMenu: showMobileMenu
    },
});

export default store