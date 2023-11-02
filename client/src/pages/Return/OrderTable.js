import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import { Fragment } from 'react';

export const OrderTable = ({ items }) => {
    const backend_url = process.env.BACKEND_URL;
    return (
        <Fragment>
            <Typography variant="h6">Order Items</Typography>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell variant='head'>Image</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Subtotal</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell component="th" scope="row">
                                    <img
                                        src={`${backend_url}/${item.images.replace(/\\/g, '/')}`}
                                        alt={item.name}
                                        width="50"
                                    />
                                </TableCell>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>${item.price}</TableCell>
                                <TableCell>${item.price * item.quantity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Fragment>
    );
};
