import React, { Fragment, useEffect, useState } from 'react';
import CheckoutSteps from './CheckoutSteps';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Container } from '@mui/material';
// import { createOrder } from '../../redux/actions/orderActions';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PayPalButton } from 'react-paypal-button-v2';
import axios from 'axios';
// Renders errors or successfull transactions on the screen.

async function createOrder(order) {
    await axios
        .post('/api/order/order/new', order)
        .then((res) => {
            window.open(`${res.data.approveUrl}`);
        })
        .catch((error) => {
            console.log(error.response);
        });
}

const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    };

    return (
        <Fragment>
            <CheckoutSteps activeStep={2} />
            <Container>
                <PayPalButton createOrder={()=>createOrder(order)} />
            </Container>
        </Fragment>
    );
};

export default Payment;
