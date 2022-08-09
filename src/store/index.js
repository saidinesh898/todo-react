import { configureStore } from "@reduxjs/toolkit";
import authReducers from './auth-slice'

const store = configureStore({
    reducer : {auth : authReducers}
})

export default store