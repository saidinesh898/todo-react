import { configureStore } from "@reduxjs/toolkit";
import authReducers from './auth-slice'
import notifyReducers from './notification-slice'


const store = configureStore({
    reducer : {auth : authReducers , notify : notifyReducers}
})

export default store