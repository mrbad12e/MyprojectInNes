import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// Pages
import Home from './pages/Home/Home';
import Product from './pages/Product/Product';
import Register from './pages/User/Register';
import Login from './pages/User/Login';
import ForgotPassword from './pages/User/ForgotPassword';
import ResetPassword from './pages/User/ResetPassword';
import Cart from './pages/Cart/Cart';
// Components
import Announcement from './components/Announcement/Announcement';
import Navbar from './components/Navbar/Navbar';
import Store from './pages/Store/Store';
import Footer from './components/Footer/Footer';
import Shipping from './pages/Cart/Shipping';
import ConfirmOrder from './pages/Cart/ConfirmOrder';
import Payment from './pages/Cart/Payment';
import OrderSuccess from './pages/Cart/OrderSuccess';
import { Profile } from './pages/User/Profile';
import { MyOrders } from './pages/User/MyOrders';
import UpdatePassword from './pages/User/UpdatePassword';
import { AddProfile } from './pages/User/AddProfile';
import { OrderDetail } from './pages/Return/OrderDetail';
import { Return } from './pages/Return/Return';
import { NotFound } from './pages/NotFound';

export const App = () => {
    const user = useSelector((state) => state.user.currentUser);
    console.log(useSelector((state) => state));
    return (
        <BrowserRouter>
            <Announcement />
            <Navbar />
            <Routes>
                {/* Public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/products/:keyword" element={<Store />} />
                <Route path="/store" element={<Store />} />

                {/* Authenticate routes */}
                <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
                <Route path="/password/forgot" element={<ForgotPassword />} />
                <Route path="/password/reset/:token" element={<ResetPassword />} />
                
                {/* Cart routes */}
                <Route path="/cart" element={<Cart />} />
                <Route path="/success" element={<OrderSuccess />} />
                <Route path="/cart/checkout/form" element={<Shipping />} />
                <Route path="/cart/checkout/confirm" element={<ConfirmOrder />} />
                <Route path="/cart/checkout/payment" element={<Payment />} />
                <Route path='/not-found' element={<NotFound />} />
                
                {/* Profile routes */}
                <Route path='/me' element={user ? <Profile /> : <Navigate to="/" />} />
                <Route path='/me/orders' element={<MyOrders />} />
                <Route path='/me/password' element={<UpdatePassword />} />
                <Route path='/me/profile' element={<AddProfile />} />

                {/* Return routes */}
                <Route path='/order/:id' element={<OrderDetail />} />
                <Route path='/order/:id/return' element={<Return />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};
