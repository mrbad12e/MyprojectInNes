import { Link, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Title } from './Title';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function createData(id, date, name, shipTo, paymentMethod, amount) {
    return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
    createData(0, '16 Mar, 2019', 'Elvis Presley', 'Tupelo, MS', 'VISA ⠀•••• 3719', 312.44),
    createData(1, '16 Mar, 2019', 'Paul McCartney', 'London, UK', 'VISA ⠀•••• 2574', 866.99),
    createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
    createData(3, '16 Mar, 2019', 'Michael Jackson', 'Gary, IN', 'AMEX ⠀•••• 2000', 654.39),
    createData(4, '15 Mar, 2019', 'Bruce Springsteen', 'Long Branch, NJ', 'VISA ⠀•••• 5919', 212.79),
];

export const Orders = () => {
    const { recentOrders, isFetching } = useSelector((state) => state.recentOrders)
    console.log(recentOrders);
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
