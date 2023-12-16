import { Grid, Link, Pagination, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Title } from '../../components/Title/Title';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { Orders } from './Orders'
import { clearErrors, getAllOrders } from '../../redux/actions/orderActions';
import { toast } from 'react-toastify';

export const OrderTable = () => {
    const dispatch = useDispatch();
    const { keyword } = useParams();
    const [currentPage, setCurrentPage] = useState(1);

    const { orders, isFetching, error, resultPerPage, filteredOrdersCount } = useSelector((state) => state.allOrders)
    const handlePageChange = (e, p) => setCurrentPage(p);
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getAllOrders(keyword, currentPage));
    }, [dispatch, keyword, currentPage, error]);

    let count = filteredOrdersCount;
    let countPages = Math.ceil(count / resultPerPage);
    return (
        <Orders>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Grid item display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                        <Title>Orders</Title>
                    </Grid>
                    {isFetching ? (
                        <Loader />
                    ) : (
                        <>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Index</TableCell>
                                        <TableCell>Title</TableCell>
                                        <TableCell align='right'>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders ?.map((order, index) => (
                                        <TableRow key={order._id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>
                                                <Link color={'primary'} href={`/order/${order._id}`}>
                                                    {order.paymentInfo.id}
                                                </Link>
                                            </TableCell>
                                            <TableCell align='right'>{order.orderStatus}</TableCell>
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
            </Grid>
        </Orders>
    );
};
