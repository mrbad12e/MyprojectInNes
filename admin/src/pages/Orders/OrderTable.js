import { Link, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Title } from '../../components/Title/Title';
import { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const OrderTable = () => {
    const { users } = useSelector((state) => state.allUsers);
    return (
        <Fragment>
            <Title>Orders</Title>
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
                    {users?.map((user, index) => (
                        <TableRow key={user._id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>
                                <Link color={'primary'}>{user.username}</Link>
                            </TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell align="right">{user.role}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Fragment>
    );
};
