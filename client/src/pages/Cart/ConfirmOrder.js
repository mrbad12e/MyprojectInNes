import React, { Fragment, useEffect, useState } from 'react';
import CheckoutSteps from './CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Link, Button, Grid, Paper, Card, CardMedia, CardContent } from '@mui/material';
import { teal } from '@mui/material/colors';

const ConfirmOrder = () => {
    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const user = useSelector((state) => state.user.user);
    const navigate = useNavigate();
    const backend_url = process.env.BACKEND_URL;

    const subtotal = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

    const shippingCharges = subtotal > 1000 ? 0 : 15;

    const totalPrice = parseFloat(subtotal + shippingCharges).toFixed(2);

    const address = `${shippingInfo.address}, ${shippingInfo.state}, ${shippingInfo.country}`;

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
        <Container maxWidth="xl">
            <Grid container justifyContent={'center'}>
                <CheckoutSteps activeStep={1} />
            </Grid>
            <Grid container justifyContent={'center'} spacing={1}>
                <Grid item xs={7}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h3" textAlign={'center'}>
                            Shipping Info
                        </Typography>
                        <Grid container justifyContent={'space-between'}>
                            <Typography variant="h6" fontWeight={500}>
                                Name:
                            </Typography>
                            <Typography variant="h6" fontWeight={500}>
                                {user.username}
                            </Typography>
                        </Grid>
                        <Grid container justifyContent={'space-between'}>
                            <Typography variant="h6" fontWeight={500}>
                                Phone:
                            </Typography>
                            <Typography variant="h6" fontWeight={500}>
                                {shippingInfo.phoneNumber}
                            </Typography>
                        </Grid>
                        <Grid container justifyContent={'space-between'}>
                            <Typography variant="h6" fontWeight={500}>
                                Address:
                            </Typography>
                            <Typography variant="h6" fontWeight={500}>
                                {address}
                            </Typography>
                        </Grid>
                    </Paper>
                    <br />

                    <Typography variant="h5" textAlign={'center'}>
                        Your Cart Items:
                    </Typography>

                    {cartItems &&
                        cartItems.map((item) => {
                            const srcSet = `${backend_url}/${item.img.replace(/\\/g, '/')}`;
                            return (
                                <Card key={item.product} sx={{ display: 'flex', m: 1 }}>
                                    <CardMedia
                                        component="img"
                                        image={srcSet}
                                        sx={{ objectFit: 'cover', width: '18vw', maxWidth: '200px' }}
                                    />
                                    <CardContent sx={{ flex: '1 0 auto' }}>
                                        <Grid item>
                                            <Link href={`/product/${item.product_id}`} underline="none">
                                                {item.title}
                                            </Link>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h6">
                                                Price:{'\t'}
                                                <b>${item.price}</b>
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="h6">
                                                Total:{'\t'}
                                                <b>${item.price * item.quantity}</b>
                                            </Typography>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            );
                        })}
                </Grid>
                <Grid item xs={5}>
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h3" textAlign={'center'}>Order Summary</Typography>
                        <Grid container justifyContent={'space-between'}>
                            <Typography variant="h6" fontWeight={500}>
                                Subtotal:
                            </Typography>
                            <Typography variant="h6" fontWeight={500}>
                                ${subtotal}
                            </Typography>
                        </Grid>
                        <Grid container justifyContent={'space-between'}>
                            <Typography variant="h6" fontWeight={500}>
                                Shipping Charges:
                            </Typography>
                            <Typography variant="h6" fontWeight={500}>
                                ${shippingCharges}
                            </Typography>
                        </Grid>
                        <Grid container justifyContent={'space-between'}>
                            <Typography variant="h6" fontWeight={500}>
                                Total:
                            </Typography>
                            <Typography variant="h6" fontWeight={600}>
                                ${totalPrice}
                            </Typography>
                        </Grid>
                        <Grid container justifyContent={'center'}>
                            <Button 
                                variant="contained" 
                                onClick={proceedToPayment}
                                sx={{ color: teal[50], backgroundColor: teal[500], width: '100%', marginTop: '1rem' }}
                            >
                                Proceed To Payment
                            </Button>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ConfirmOrder;
