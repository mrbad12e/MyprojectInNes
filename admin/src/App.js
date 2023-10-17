import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import React, { useEffect } from 'react';
import Login from './pages/User/Login';
import { Profile } from './pages/User/Profile';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Navbar } from './components/Navbar/Navbar';
import { Customers } from './pages/Customers/Customers'
export const App = () => {
    
    const user = useSelector((state) => state.user.currentUser)
    console.log(useSelector((state) => state));
    
    return (
        <BrowserRouter>
            <Navbar/>
            <Routes>
                <Route exact path='/' element={<Login/>}/>
                <Route path='/me' element={<Profile/>}/>
                <Route path='/dashboard' element={<Dashboard/>}/>
                <Route path='/customers' element={<Customers/>}/>
            </Routes>
        </BrowserRouter>
    )
};
