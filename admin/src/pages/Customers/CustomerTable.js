import { Grid, Link, Pagination, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Title } from '../../components/Title/Title';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { getAllUsers } from '../../redux/actions/userActions';
import { Customers } from './Customers';
import { toast } from 'react-toastify';

export const CustomerTable = () => {
    const dispatch = useDispatch();
    const { keyword } = useParams();
    const [currentPage, setCurrentPage] = useState(1);

    const { users, isFetching, error, userCount, resultPerPage, filteredUsersCount } = useSelector(
        (state) => state.allUsers
    );
    const handlePageChange = (e, p) => setCurrentPage(p);
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getAllUsers(keyword, currentPage));
    }, [dispatch, keyword, currentPage]);

    let count = filteredUsersCount;
    let countPages = Math.ceil(count / resultPerPage);
    return (
        <Customers>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Title>Customers</Title>
                    {isFetching ? (
                        <Loader />
                    ) : (
                        <>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Index</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell align="right">Role</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {users.map((user, index) => (
                                        <TableRow key={user._id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>
                                                <Link color={'primary'} href={`/customer/${user._id}`}>
                                                    {user.username}
                                                </Link>
                                            </TableCell>
                                            <TableCell>{user.email}</TableCell>
                                            <TableCell align="right">{user.role}</TableCell>
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
        </Customers>
    );
};
