import { Link, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

function ccyFormat(num) {
    return `${num.toFixed(2)}`;
}

export const OrderItemsTable = ({ items, itemsPrice, totalPrice }) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Index</TableCell>
                    <TableCell>Product</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Price per Unit</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {items.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>
                            <Link href={`/product/${item._id}`}>{item.title}</Link>
                        </TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>{`$ ${item.price}`}</TableCell>
                        <TableCell align="right">{`$ ${ccyFormat(item.price * item.quantity)}`}</TableCell>
                    </TableRow>
                ))}
                <TableRow>
                    <TableCell rowSpan={3} />
                    <TableCell colSpan={2}>Subtotal</TableCell>
                    <TableCell align="right">$ {ccyFormat(itemsPrice)}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell align="right">$ {ccyFormat(totalPrice)}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    );
};
