import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import { userReducers, profileReducer, forgotPasswordReducer, allUsersReducers, userActionReducer } from './reducers/userReducers'
import { recentOrderReducers } from './reducers/orderReducers'

const persistConfig = {
    key: 'root', version: 1, storage
}

const rootReducer = combineReducers({
    user: userReducers,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    allUsers: allUsersReducers,
    oneUser: userActionReducer,

    recentOrders: recentOrderReducers,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

let initialState = {}

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    }).concat(thunk),
    preloadedState: initialState
})

export let persistor = persistStore(store)