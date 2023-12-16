import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { useSelector } from 'react-redux'
import React from 'react';
import Login from './pages/User/Login';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Navbar } from './components/Navbar/Navbar';
import { CustomerTable } from './pages/Customers/CustomerTable';
import { CustomerDetail } from './pages/Customers/CustomerDetail';
import { ProductTable } from './pages/Product/ProductTable';
import { ProductDetail } from './pages/Product/ProductDetail';
import { CreateProduct } from './pages/Product/CreateProduct';
import { OrderTable } from './pages/Orders/OrderTable';
import { OrderDetail } from './pages/Orders/OrderDetail';
import { ReturnTable } from './pages/Orders/ReturnTable';
import { ReturnOrder } from './pages/Orders/ReturnOrder';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
    
    const user = useSelector((state) => state.user.user)
    console.log(useSelector((state) => state));
    
    return (
        <BrowserRouter>
            <Navbar/>
            <ToastContainer/>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/customers' element={<CustomerTable/>}/>
                <Route path='/customer/:id' element={<CustomerDetail/>}/>
                <Route path='/products' element={<ProductTable/>}/>
                <Route path='/product/:id' element={<ProductDetail/>}/>
                <Route path='/product/create' element={<CreateProduct/>}/>
                <Route path='/orders' element={<OrderTable/>} />
                <Route path='/order/:id' element={<OrderDetail/>}/>
                <Route path='/returns' element={<ReturnTable/>}/>
                <Route path='/return/:id' element={<ReturnOrder/>}/>
            </Routes>
        </BrowserRouter>
    )
};
