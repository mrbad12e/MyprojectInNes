import { Title } from '../../components/Title/Title';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Grid, MenuItem, Paper, Select, Typography } from '@mui/material';
import { clearErrors, getOrderDetail, updateOrderDetail } from '../../redux/actions/orderActions';
import { Orders } from './Orders';
import { OrderItemsTable } from './OrderItemsTable';
import { toast } from 'react-toastify';

const paperDesign = {
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    m: 2,
};
const statusOptions = ['Processing', 'Delivered', 'Shipped'];

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

let disable = true;
export const OrderDetail = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const backend_url = process.env.BACKEND_URL;
    const { id } = useParams();
    const { order, isFetching, error } = useSelector((state) => state.orderDetail);

    const address = `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.country}`;
    const [status, setStatus] = useState('');
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getOrderDetail(id));
    }, [dispatch, error, id]);

    useEffect(() => {
        if (order) setStatus(order.orderStatus);
    }, [order]);

    const handleStatusChange = (e) => {
        if (order.orderStatus !== e.target.value) {
            setStatus(e.target.value);
            disable = false;
        } else {
            setStatus(e.target.value);
            disable = true;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateOrderDetail(id, status));
        navigate('/orders');
    };
    const handleReturn = (e) => {
        e.preventDefault();
        navigate(`/return/${id}`);
    }

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
                                    <Typography align={'center'}>Order Status</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <Select value={status} onChange={handleStatusChange}>
                                        {statusOptions.map((status, index) => (
                                            <MenuItem key={index} value={status}>
                                                {status}
                                            </MenuItem>
                                        ))}
                                    </Select>
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
            <Grid container justifyContent={'space-evenly'} sx={{ flexGrow: 1 }}>
                <Grid item>
                    <Button variant="contained" onClick={handleSubmit} disabled={disable}>
                        Submit Changes
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant='contained' onClick={handleReturn} color='error' disabled={!order.isReturned}>
                        Return
                    </Button>
                </Grid>
            </Grid>
        </Orders>
    );
};
