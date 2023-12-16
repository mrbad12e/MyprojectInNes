import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import {} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { clearErrors, confirmOrder, getOrderDetail } from '../../redux/actions/orderActions';
import Loader from '../../components/Loader/Loader';
import { OrderTable } from './OrderTable';
import { toast } from 'react-toastify';

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
    const address = `${order.shippingInfo.address}, ${order.shippingInfo.state}, ${order.shippingInfo.country}`;
    return (
        <Paper elevation={3} sx={{ p: 3, m: 2 }}>
            <Grid container spacing={3} alignItems={'center'}>
                <Grid item xs>
                    <Typography variant="h5">Transaction ID</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="h5">{order.paymentInfo.id}</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={3} alignItems={'center'}>
                <Grid item xs>
                    <Typography variant="h5">User</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="h5">{order.user.username}</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={3} alignItems={'center'}>
                <Grid item xs>
                    <Typography variant="h5">User's mail</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="h5">{order.user.email}</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={3} alignItems={'center'}>
                <Grid item xs>
                    <Typography variant="h5">Address</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="h5">{address}</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={3} alignItems={'center'}>
                <Grid item xs>
                    <Typography variant="h5">Phone Number</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="h5">{order.shippingInfo.phoneNumber}</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={3} alignItems={'center'}>
                <Grid item xs>
                    <Typography variant="h5">Paid at</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="h5">{formatTime(order.paidAt)}</Typography>
                </Grid>
            </Grid>
            <Grid container spacing={3} alignItems={'center'}>
                <Grid item xs>
                    <Typography variant="h5">Order Status</Typography>
                </Grid>
                <Grid item xs={9}>
                    <Typography variant="h5">{order.orderStatus}</Typography>
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
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getOrderDetail(id));
    }, [dispatch, id, error]);
    const handleConfirm = (e) => {
        e.preventDefault();
        dispatch(confirmOrder(id));
        navigate('/me/orders');
    };
    const handleReturn = (e) => {
        e.preventDefault();
        navigate(`/order/${id}/return`);
    };
    return (
        <Container maxWidth="xl" sx={{ my: 3 }}>
            {isFetching ? (
                <Loader />
            ) : (
                <>
                    <Typography variant="h3" textAlign={'center'} fontWeight={600}>
                        Order Detail
                    </Typography>
                    <TransactionDetail order={order} />
                    <Typography variant="h4" fontWeight={600} textAlign={'center'}>
                        Order Items
                    </Typography>
                    <OrderTable items={order.orderItems} />

                    <Grid container justifyContent={'center'} gap={4} mt={2}>
                        <Grid item>
                            <Button variant="outlined" disabled={disable} onClick={handleReturn}>
                                Return
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained" disabled={!disable} onClick={handleConfirm}>
                                Confirm order
                            </Button>
                        </Grid>
                    </Grid>
                </>
            )}
        </Container>
    );
};
