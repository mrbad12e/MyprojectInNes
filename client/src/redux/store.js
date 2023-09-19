import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { newReviewReducer, productDetailReducer, productReviewsReducer, productsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { forgotPasswordReducer, profileReducer, userReducers } from './reducers/userReducers';
import { myOrdersReducer, newOrderReducer, orderDetailReducer } from './reducers/orderReducers';

const persistConfig = {
    key: 'root',
    version: 1,
    storage
};

const rootReducer = combineReducers({ 
    products: productsReducer,
    productDetail: productDetailReducer,
    newReview: newReviewReducer,
    productReviews: productReviewsReducer,

    cart: cartReducer,

    user: userReducers,
    profile: profileReducer,
    forgotpassword: forgotPasswordReducer,

    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetail: orderDetailReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

let initialState = {
    cart: {
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        shippingInfo: localStorage.getItem('shippingInfo') ? JSON.parse(localStorage.getItem('shippingInfo')) : []
    }
}

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    }).concat(thunk),
    preloadedState: initialState
});

export let persistor = persistStore(store);
