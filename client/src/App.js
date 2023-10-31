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
import Success from './pages/Success';
import OrderSuccess from './pages/Cart/OrderSuccess';
import { Profile } from './pages/User/Profile';

export const App = () => {
    const user = useSelector((state) => state.user.currentUser);
    console.log(useSelector((state) => state));
    return (
        <BrowserRouter>
            <Announcement />
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/products/:keyword" element={<Store />} />
                <Route path="/store" element={<Store />} />
                <Route path="/password/forgot" element={<ForgotPassword />} />
                <Route path="/password/reset/:token" element={<ResetPassword />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/success" element={<OrderSuccess />} />
                <Route path="/cart/checkout/form" element={<Shipping />} />
                <Route path="/cart/checkout/confirm" element={<ConfirmOrder />} />
                <Route path="/cart/checkout/payment" element={<Payment />} />
                <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                <Route path="/register" element={user ? <Navigate to="/" /> : <Register />} />
                <Route path='/me' element={user ? <Profile /> : <Navigate to="/" />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
};
