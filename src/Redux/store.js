import {configureStore} from "@reduxjs/toolkit"
import {userReducer} from './UserSlice'
import {organizationReducer} from './OrganizationSlice'
import {persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {combineReducers} from "@reduxjs/toolkit"
import { campaignReducer } from "./CampaignSlice"
import { messageReducer } from "./MessageSlice"

const persistConfig = {
    key: 'main',
    version:1,
    storage
}

const reducer = combineReducers({
    user: userReducer,
    organization:organizationReducer,
    campaign:campaignReducer,
    message:messageReducer
})

const persistedReducer = persistReducer(persistConfig,reducer)

export const store = configureStore({
    reducer: persistedReducer
})