import { createSlice } from "@reduxjs/toolkit";
const initialMessages=JSON.parse(localStorage.getItem('messages'))
const initialMessageState={
    messages:initialMessages
}

const messageSlice=createSlice({
    name:'message',
    initialState:initialMessageState,
    reducers:{
       setMessages(state,action){
        state.messages=action.payload
        localStorage.setItem('messages',JSON.stringify(action.payload))
       }
    }
})

export const messageActions=messageSlice.actions;
export default messageSlice.reducer;