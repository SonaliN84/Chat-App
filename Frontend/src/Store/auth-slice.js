import { createSlice } from "@reduxjs/toolkit";
const initialToken=localStorage.getItem('token')
const initialName=localStorage.getItem('name')

const userIsLoggedIn=!!initialToken;

const initialAuthState={
    token:initialToken,
    isLoggedIn:userIsLoggedIn,
    name:initialName
}

const authSlice=createSlice({
    name:'auth',
    initialState:initialAuthState,
    reducers:{
       login(state,action){
        state.token=action.payload.token;
        localStorage.setItem('token',action.payload.token)
        state.isLoggedIn=true;
        state.name=action.payload.name;
        localStorage.setItem('name',action.payload.name)
       },
       logout(state){
        state.token=null;
        state.isLoggedIn=false;
        localStorage.removeItem('token')
        localStorage.removeItem('name')
       }
    }
})

export const authActions=authSlice.actions;
export default authSlice.reducer;