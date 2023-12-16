import {
    Grid,
    Link,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { Fragment, useEffect, useState } from 'react';
import Loader from '../../components/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, myOrders } from '../../redux/actions/orderActions';
import { toast } from 'react-toastify';

export const OrderTable = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const { orders, filteredOrdersCount, resultPerPage, isFetching, error } = useSelector((state) => state.myOrders);
    const handlePageChange = (e, p) => setCurrentPage(p);
    useEffect(() => {
        if (error){
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    }, [dispatch]);
    let count = filteredOrdersCount;
    let countPages = Math.ceil(count / resultPerPage);
    return (
        <Fragment>
            {isFetching ? (
                <Loader />
            ) : (
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="h4" textAlign={'center'}>
                        Orders
                    </Typography>

                    {isFetching ? (
                        <Loader />
                    ) : (
                        <>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: 600, fontSize: 20 }}>Index</TableCell>
                                        <TableCell sx={{ fontWeight: 600, fontSize: 20 }}>Title</TableCell>
                                        <TableCell sx={{ fontWeight: 600, fontSize: 20 }} align="right">Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders?.map((order, index) => (
                                        <TableRow key={order._id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>
                                                <Link color={'primary'} href={`/order/${order._id}`}>
                                                    {order.paymentInfo.id}
                                                </Link>
                                            </TableCell>
                                            <TableCell align="right">{order.orderStatus}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Pagination
                                count={countPages}
                                page={currentPage}
                                variant="outlined"
                                color="primary"
                                onChange={handlePageChange}
                                sx={{ alignSelf: 'center', mt: 2 }}
                            />
                        </>
                    )}
                </Paper>
            )}
        </Fragment>
    );
};
