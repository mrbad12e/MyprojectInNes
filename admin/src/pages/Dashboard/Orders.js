import { Link, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Title } from '../../components/Title/Title';
import { Fragment } from 'react';
import { useSelector } from 'react-redux';

export const Orders = () => {
    const { recentOrders, isFetching } = useSelector((state) => state.recentOrders)
    return (
        <Fragment>
            <Title>Recent Orders</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell>Date</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Ship To</TableCell>
                        <TableCell>Payment Method</TableCell>
                        <TableCell align="right">Sale Amount</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {recentOrders?.map((order) => (
                        <TableRow key={order._id}>
                            <TableCell>{order.createdAt}</TableCell>
                            <TableCell>{order.user.username}</TableCell>
                            <TableCell>{order.shippingInfo.address}</TableCell>
                            <TableCell>{order.paymentInfo.status}</TableCell>
                            <TableCell align="right">{`$${order.totalPrice}`}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Link color={'primary'} sx={{ mt: 3 }}>See more orders</Link>
        </Fragment>
    );
};
