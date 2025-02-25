import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:'user',
    initialState: {
        id:"",
        name:"",
        username:"",
        email:""
    },
    reducers:{
        createUser:(state,action) =>{
            console.log(action.payload);
            
            state.id= action.payload._id
            state.name= action.payload.name
            state.username= action.payload.username
            state.email= action.payload.email
        },
        logOutUser:(state,action) => {

            state.id= ""
            state.name= ""
            state.username= ""
            state.email= ""

        }
    }
})

console.log();


export const {createUser,logOutUser} = userSlice.actions
export const  {reducer: userReducer} = userSlice