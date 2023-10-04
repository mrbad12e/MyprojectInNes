import React, { Fragment, useEffect, useState } from 'react';
import CheckoutSteps from './CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Link, Button } from '@mui/material';

const ConfirmOrder = () => {
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

    const shippingCharges = subtotal > 1000 ? 0 : 15;

    const totalPrice = parseFloat(subtotal + shippingCharges).toFixed(2);

    const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.pinCode}, ${shippingInfo.country}`;

    const proceedToPayment = () => {
        const data = {
            subtotal,
            shippingCharges,
            totalPrice,
        };

        sessionStorage.setItem('orderInfo', JSON.stringify(data));

        navigate('/cart/checkout/payment');
    };

    return (
        <Fragment>
            <CheckoutSteps activeStep={1} />
            <Container sx={{ display: 'flex', mt: '30px' }}>
                <Container>
                    <Typography variant="h3">Shipping Info</Typography>
                    <Box display={'flex'}>
                        <Box p={1}>
                            <Typography my={1}>Name:</Typography>
                            <Typography my={1}>Phone:</Typography>
                            <Typography my={1}>Address:</Typography>
                        </Box>
                        <Box p={1}>
                            <Typography my={1}>{user.username}</Typography>
                            <Typography my={1}>{shippingInfo.phoneNumber}</Typography>
                            <Typography my={1}>{address}</Typography>
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="h5">Your Cart Items:</Typography>

                        {cartItems &&
                            cartItems.map((item) => (
                                <Box key={item.product} display={'flex'} flex={1} my={1}>
                                    <img alt="Product" srcSet={`${item.img}?w=32&fit=crop&auto=format&dpr=2 4x`} />
                                    <Box
                                        p={1}
                                        display={'inline-flex'}
                                        justifyContent={'space-evenly'}
                                        flexDirection={'column'}
                                    >
                                        <Link href={`/product/${item.product}`} underline="none">
                                            {item.title}
                                        </Link>
                                        <Typography variant="h6">
                                            {item.quantity} X ${item.price} = <b>${item.price * item.quantity}</b>
                                        </Typography>
                                    </Box>
                                </Box>
                            ))}
                    </Box>
                </Container>
                {/*  */}
                <Container>
                    <Typography variant="h3">Order Summary</Typography>
                    <Box display={'flex'}>
                        <Box p={1}>
                            <Typography my={1}>Subtotal:</Typography>
                            <Typography my={1}>Shipping Charges:</Typography>
                            <Typography my={1}><b>Total:</b></Typography>
                        </Box>
                        <Box p={1}>
                            <Typography my={1}>${subtotal}</Typography>
                            <Typography my={1}>${shippingCharges}</Typography>
                            <Typography my={1}>${totalPrice}</Typography>
                        </Box>
                    </Box>

                    <Button variant='contained' onClick={proceedToPayment}>Proceed To Payment</Button>
                </Container>
            </Container>
        </Fragment>
    );
};

export default ConfirmOrder;
