import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { useSelector } from 'react-redux'
import React from 'react';
import Login from './pages/User/Login';
import { Profile } from './pages/User/Profile';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Navbar } from './components/Navbar/Navbar';
import { CustomerTable } from './pages/Customers/CustomerTable';
import { CustomerDetail } from './pages/Customers/CustomerDetail';


export const App = () => {
    
    const user = useSelector((state) => state.user.currentUser)
    console.log(useSelector((state) => state));
    
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route path='/' element={<Login/>}/>
                <Route path='/me' element={<Profile/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/customers' element={<CustomerTable/>}/>
                <Route path='/customer/:id' element={<CustomerDetail/>}/>
            </Routes>
        </BrowserRouter>
    )
};
