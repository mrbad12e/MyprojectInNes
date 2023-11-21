import React, { Fragment, useEffect, useState } from 'react';
import CheckoutSteps from './CheckoutSteps';
import { useSelector, useDispatch } from 'react-redux';
import { Box } from '@mui/material';
import { createOrder } from '../../redux/actions/orderActions';
import { useNavigate } from 'react-router-dom';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { toast } from 'react-toastify';
// Renders errors or successfull transactions on the screen.

const Payment = () => {
    const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'));

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    };

    const initialOptions = {
        clientId: process.env.PAYPAL_CLIENT_ID,
        currency: 'USD',
    };
    const handleCreateOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: order.totalPrice, // Use order.totalPrice
                    },
                },
            ],
        });
    };
    const handleOnApprove = (data, actions) => {
        return actions.order.capture().then((details) => {
            const updatedOrder = { ...order };
            updatedOrder.paymentInfo = {
                id: details.purchase_units[0].payments.captures[0].id,
                status: details.status,
            };

            dispatch(createOrder(updatedOrder));
            toast.success('Payment Successful');
            navigate('/success');
        });
    };
    return (
        <Fragment>
            <CheckoutSteps activeStep={2} />

            <Box display={'flex'} justifyContent={'center'} alignItems={'center'} my={3} p={4}>
                <Box width={'40vw'}>
                    <PayPalScriptProvider options={initialOptions}>
                        <PayPalButtons
                            style={{
                                layout: 'vertical',
                                color: 'gold',
                                label: 'pay',
                            }}
                            createOrder={(data, actions) => handleCreateOrder(data, actions)}
                            onApprove={(data, actions) => handleOnApprove(data, actions)}
                        />
                    </PayPalScriptProvider>
                </Box>
            </Box>
        </Fragment>
    );
};

export default Payment;
