import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

export const OrderTable = ({ items }) => {
    const backend_url = process.env.BACKEND_URL;
    return (
        <Paper elevation={3} sx={{m:2}}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead >
                    <TableRow>
                        <TableCell sx={{ fontWeight: 600, fontSize: 20 }}>Image</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: 20 }}>Name</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: 20 }}>Quantity</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: 20 }}>Price</TableCell>
                        <TableCell sx={{ fontWeight: 600, fontSize: 20 }}>Subtotal</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {items.map((item) => (
                        <TableRow key={item._id}>
                            <TableCell component="th" scope="row" sx={{ p: 0 }}>
                                <img
                                    src={`${backend_url}/${item.images.replace(/\\/g, '/')}`}
                                    alt={item.name}
                                    width="100vw"
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
        </Paper>
    );
};
