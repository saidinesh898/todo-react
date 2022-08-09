import { createSlice } from "@reduxjs/toolkit"


const initialState =   { 
    token: null,
    user: {
        age: null,
        createdAt: null,
        email: null,
        name: null,
        updatedAt: null,
        _id: null
    },
    isLoggedin : false,
    loginRedirect : null,

}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        onLogin(state, action) {
            state.token = action.payload.token
            state.user = action.payload.user
            state.isLoggedin = true
            state.loginRedirect = false
        },
        onLogout() {
            return(initialState)
        },
        onLocalStorageSuccess(state, action){
            state.token = action.payload.token
            state.user = action.payload.user
            state.isLoggedin = true
            state.loginRedirect = false
        },
        onLocalStorageFail(state){
            state.token = initialState.token
            state.user = initialState.user
            state.loginRedirect =  true
            state.isLoggedin = false
        }
    }

})

export default authSlice.reducer

export const authActions = authSlice.actions