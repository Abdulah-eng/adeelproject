import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: 'auth',
    initialState: { isAuthenticated: false, userData: null, usertype: null },
    reducers: { 
        logIn: (state, action) => { 
            state.isAuthenticated = true; 
            state.userData = action.payload.userData;
            state.usertype = action.payload.usertype; // Correctly assign to state.usertype
        }, 
        logOut: (state) => { 
            state.isAuthenticated = false; 
            state.userData = null;
            state.usertype = null; // Correctly reset usertype
        }
    }
});

export const { logIn, logOut } = authSlice.actions;
export default authSlice.reducer;
