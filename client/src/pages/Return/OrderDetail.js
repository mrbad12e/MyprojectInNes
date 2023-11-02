import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import {} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, Fragment, useState } from 'react';
import { getOrderDetail } from '../../redux/actions/orderActions';
import Loader from '../../components/Loader/Loader';
import { OrderTable } from './OrderTable';

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

const paperDesign = {
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    m: 2,
};

const TransactionDetail = ({ order }) => {
    const address = `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.country}`;
    return (
        <Paper sx={paperDesign}>
            <Grid container spacing={3} alignItems={'center'}>
                <Grid item xs>
                    <Typography variant="h5">Transaction ID</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="h6">{order.paymentInfo.id}</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={3} alignItems={'center'}>
                <Grid item xs>
                    <Typography variant="h5">User</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="h6">{order.user.username}</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={3} alignItems={'center'}>
                <Grid item xs>
                    <Typography variant="h5">User's mail</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="h6">{order.user.email}</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={3} alignItems={'center'}>
                <Grid item xs>
                    <Typography variant="h5">Address</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="h6">{address}</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={3} alignItems={'center'}>
                <Grid item xs>
                    <Typography variant="h5">Phone Number</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="h6">{order.shippingInfo.phoneNumber}</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={3} alignItems={'center'}>
                <Grid item xs>
                    <Typography variant="h5">Paid at</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="h6">{formatTime(order.paidAt)}</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={3} alignItems={'center'}>
                <Grid item xs>
                    <Typography variant="h5">Order Status</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="h6">{order.orderStatus}</Typography>
                </Grid>
            </Grid>
        </Paper>
    );
};

export const OrderDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { order, isFetching, error } = useSelector((state) => state.orderDetail);
    let disable = false;
    if (order.orderStatus === 'Delivered') disable = true;
    useEffect(() => {
        if (error) console.log(error);
        dispatch(getOrderDetail(id));
    }, [dispatch, id, error]);

    return (
        <Fragment>
            <Container sx={{ my: 2 }}>
                {isFetching ? (
                    <Loader />
                ) : (
                    <Grid container rowGap={3} direction={'row'}>
                        <Grid item xs={12}>
                            <Typography variant="h3">Order Detail</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TransactionDetail order={order} />
                        </Grid>
                        <Grid item xs={12}>
                            <OrderTable items={order.orderItems} />
                        </Grid>
                        <Grid container justifyContent={'center'} gap={4}>
                            <Grid item>
                                <Button variant="outlined" disabled={disable}>
                                    Return
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button variant="contained">Confirm order</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                )}
            </Container>
        </Fragment>
    );
};
