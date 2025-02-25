import {createSlice} from "@reduxjs/toolkit"

const userSlice = createSlice({
    name:'organization',
    initialState: {
        id:"",
        name:"",
        organizationname:"",
        email:""
    },
    reducers:{
        createOrganization:(state,action) =>{
            console.log(action.payload);
            
            state.id= action.payload._id
            state.name= action.payload.name
            state.organizationname= action.payload.organizationname
            state.email= action.payload.email
        },
        logOutOrganization:(state,action) => {

            state.id= ""
            state.name= ""
            state.organizationname= ""
            state.email= ""

        }
    }
})

console.log();


export const {createOrganization,logOutOrganization} = userSlice.actions
export const  {reducer: organizationReducer} = userSlice