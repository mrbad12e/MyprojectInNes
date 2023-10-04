import { Typography } from '@mui/material';
import { CheckCircle }  from '@mui/icons-material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { clearCart } from '../../redux/actions/cartActions';


const OrderSuccess = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearCart());
    }, [dispatch]);

    return (
        <div>
            <CheckCircle />

            <Typography>Your Order has been Placed successfully </Typography>
            <Link to='/orders'>View Orders</Link>
        </div>
    );
};

export default OrderSuccess;