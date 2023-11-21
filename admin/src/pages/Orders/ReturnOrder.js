import { Title } from '../../components/Title/Title';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Grid, MenuItem, Paper, Select, Typography } from '@mui/material';
import { Orders } from './Orders';
import { getOrderDetail, refundOrder } from '../../redux/actions/orderActions';
import { OrderItemsTable } from './OrderItemsTable';

const paperDesign = {
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    m: 2,
};

function formatTime(inputTime) {
    const date = new Date(inputTime);

    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so we add 1
    const year = date.getFullYear();

    // Add leading zeros where necessary
    const formattedHour = hour.toString().padStart(2, '0');
    const formattedMinute = minute.toString().padStart(2, '0');
    const formattedSecond = second.toString().padStart(2, '0');
    const formattedDay = day.toString().padStart(2, '0');
    const formattedMonth = month.toString().padStart(2, '0');

    return `${formattedHour}-${formattedMinute}-${formattedSecond}-${formattedDay}-${formattedMonth}-${year}`;
}

// let disable = true;
export const ReturnOrder = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const { order, isFetching, error } = useSelector((state) => state.orderDetail);

    const address = `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.country}`;
    useEffect(() => {
        if (error) console.log(error);
        dispatch(getOrderDetail(id));
    }, [dispatch, error, id]);

    const handleRefund = (e) => {
        e.preventDefault();
        dispatch(refundOrder(id))
    };

    return (
        <Orders>
            <Grid item xs={12}>
                <Paper sx={paperDesign}>
                    <Title>Order Detail</Title>
                    {isFetching ? (
                        <Loader />
                    ) : (
                        <Grid container columnSpacing={3} rowGap={3}>
                            <Grid container spacing={3} alignItems={'center'}>
                                <Grid item xs>
                                    <Typography align={'center'}>Transaction ID</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography>{order.paymentInfo.id}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} alignItems={'center'}>
                                <Grid item xs>
                                    <Typography align={'center'}>User</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography>{order.user.username}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} alignItems={'center'}>
                                <Grid item xs>
                                    <Typography align={'center'}>User's mail</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography>{order.user.email}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} alignItems={'center'}>
                                <Grid item xs>
                                    <Typography align={'center'}>Address</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography>{address}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} alignItems={'center'}>
                                <Grid item xs>
                                    <Typography align={'center'}>Phone Number</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography>{order.shippingInfo.phoneNumber}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} alignItems={'center'}>
                                <Grid item xs>
                                    <Typography align={'center'}>Paid at</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography>{formatTime(order.paidAt)}</Typography>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} alignItems={'center'}>
                                <Grid item xs>
                                    <Typography align={'center'}>Delivered at</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    {formatTime(order.DeliveredAt)}
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} alignItems={'center'}>
                                <Grid item xs>
                                    <Typography align={'center'}>Return Requested at</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    {formatTime(order.returnRequestedAt)}
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} alignItems={'center'}>
                                <Grid item xs>
                                    <Typography align={'center'}>Order Status</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Typography>{order.orderStatus}</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, m: 2, display: 'flex', alignItems: 'center' }}>
                    {isFetching ? (
                        <Loader />
                    ) : (
                        <Grid container justifyContent={'center'}>
                            <OrderItemsTable
                                items={order.orderItems}
                                itemsPrice={order.itemsPrice}
                                totalPrice={order.totalPrice}
                            />
                        </Grid>
                    )}
                </Paper>
            </Grid>
            <Grid item xs={12}>
                <Button variant='contained' onClick={handleRefund}>Refund</Button>
            </Grid>
        </Orders>
    );
};
