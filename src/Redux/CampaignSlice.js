import {createSlice} from "@reduxjs/toolkit"

const campaignSlice = createSlice({
    name:'campaign',
    initialState: {
        id:"",
        title:"",
        description:"",
        targetAmount:"",
        collectedAmount:"",
        organizationId:"",
        email:"",
        location:"",
        status:"",
    },
    reducers:{
        addCampaign:(state,action) =>{
            console.log(action.payload);
            
            state.id= action.payload._id
            state.name= action.payload.name
            state.organizationname= action.payload.organizationname
            state.email= action.payload.email
        }
    }
})

console.log();


export const {addCampaign} = campaignSlice.actions
export const  {reducer: campaignReducer} = campaignSlice