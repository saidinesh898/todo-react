import { createSlice } from "@reduxjs/toolkit";

const initialState = [{
    id : null,
    type : null,
    header : null,
    message : null,
    timer : null
}]

const notificationSlice = createSlice({
    name : 'notify',
    initialState,
    reducers : {
        notify(state,action){
            if(state.length === 1 && state[0].type === null){
                state.pop()
                const notificationObject = {...action.payload, id: new Date().getUTCMilliseconds()*Math.floor((Math.random() * 10000) + 1)}  
                state.push(notificationObject)
                
            }
            else{
                const notificationObject = {...action.payload, id:  new Date().getUTCMilliseconds()*Math.floor((Math.random() * 10000) + 1)}
                state.push(notificationObject)
                return state
            }

        },
        remove(state, action){
            const newState = state.filter(notify => notify.id != action.payload)
            return newState
        }
    }
})


export default notificationSlice.reducer

export const notifyActions = notificationSlice.actions