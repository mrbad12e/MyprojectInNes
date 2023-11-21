import { Typography } from '@mui/material';
import { CheckCircle }  from '@mui/icons-material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { clearCart } from '../../redux/actions/cartActions';
import { captureOrder } from '../../redux/actions/orderActions';


const OrderSuccess = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get('token');
    
    useEffect(() => {
        dispatch(clearCart());
    }, [dispatch]);
    const handleCaptureOrder = () => {
        dispatch(captureOrder(token));
        navigate('/');
    }
    useEffect(() => {
        if (token) {
            handleCaptureOrder();
        }
    }, [token]);
    return (
        <div>
            <CheckCircle />

            <Typography>Your Order has been Placed successfully </Typography>
            <Link to='/orders'>View Orders</Link>
        </div>
    );
};

export default OrderSuccess;