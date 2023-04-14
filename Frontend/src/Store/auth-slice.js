import { createSlice } from "@reduxjs/toolkit";
const initialToken=localStorage.getItem('token')

const userIsLoggedIn=!!initialToken;

const initialAuthState={
    token:initialToken,
    isLoggedIn:userIsLoggedIn,
}

const authSlice=createSlice({
    name:'auth',
    initialState:initialAuthState,
    reducers:{
       login(state,action){
        state.token=action.payload.token;
        localStorage.setItem('token',action.payload)
        state.isLoggedIn=true;
       },
       logout(state){
        state.token=null;
        state.isLoggedIn=false;
        localStorage.removeItem('token')

       }
    }
})

export const authActions=authSlice.actions;
export default authSlice.reducer;