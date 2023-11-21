import { Grid, Link, Pagination, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Title } from '../../components/Title/Title';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { Orders } from './Orders'
import { getAllReturns } from '../../redux/actions/orderActions';

export const ReturnTable = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    const { returns, isFetching, error, resultPerPage, filteredReturnsCount } = useSelector((state) => state.allReturns)
    const handlePageChange = (e, p) => setCurrentPage(p);
    useEffect(() => {
        if (error) console.log(error);
        dispatch(getAllReturns())
    }, [dispatch, error]);

    let count = filteredReturnsCount;
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
                                        <TableCell>Id</TableCell>
                                        <TableCell align='right'>Status</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {returns.map((returnedItem, index) => (
                                        <TableRow key={returnedItem._id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>
                                                <Link color={'primary'} href={`/return/${returnedItem.order._id}`}>
                                                    {returnedItem.order.paymentInfo.id}
                                                </Link>
                                            </TableCell>
                                            <TableCell align='right'>{returnedItem.status}</TableCell>
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
