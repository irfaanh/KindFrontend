import {createSlice} from "@reduxjs/toolkit"

const MessageSlice = createSlice({
    name:'campaign',
    initialState: {
        userid:"",
        full_name:"",
        email:"",
        message:""
    },
    reducers:{
        sendMessage:(state,action) =>{
            console.log(action.payload);
            
            state.id= action.payload.userid
            state.name= action.payload.full_name
            state.organizationname= action.payload.email
            state.email= action.payload.message
        }
    }
})

console.log();


export const {sendMessage} = MessageSlice.actions
export const  {reducer: messageReducer} = MessageSlice