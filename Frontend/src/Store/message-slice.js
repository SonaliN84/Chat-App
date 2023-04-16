import { createSlice } from "@reduxjs/toolkit";
const initialMessages=JSON.parse(localStorage.getItem('messages'))
const initialGroups=JSON.parse(localStorage.getItem('groups'))
const initialGroupId=JSON.parse(localStorage.getItem('groupId'))
const initialMessageState={
    messages:initialMessages,
    groups:initialGroups,
    groupId:initialGroupId
}

const messageSlice=createSlice({
    name:'message',
    initialState:initialMessageState,
    reducers:{
       setMessages(state,action){
        state.messages=action.payload;
        localStorage.setItem('messages',JSON.stringify(action.payload))
       },
       setGroups(state,action){
        state.groups=action.payload;
        localStorage.setItem('groups',JSON.stringify(action.payload))
       },
       setGroupId(state,action){
        state.groupId=action.payload;
        localStorage.setItem('groupId',action.payload)
       }
    }
})

export const messageActions=messageSlice.actions;
export default messageSlice.reducer;