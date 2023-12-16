import { Add, Remove } from '@mui/icons-material';
import { Button, Link, Typography, Grid, Card, CardMedia, CardContent, IconButton, Input } from '@mui/material';
import { addItemsToCart, removeItemsFromCart } from '../../redux/actions/cartActions';
import { useDispatch } from 'react-redux';

export const CartItemCard = ({ item }) => {
    const dispatch = useDispatch();
    const backend_url = process.env.BACKEND_URL;
    const srcSet = `${backend_url}/${item.img.replace(/\\/g, '/')}`;
    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) return;
        dispatch(addItemsToCart(id, newQty));
    };

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if (1 >= quantity) return;
        dispatch(addItemsToCart(id, newQty));
    };

    const deleteCartItem = (id) => {
        dispatch(removeItemsFromCart(id));
    };
    return (
        <Card sx={{ display: 'flex', m:1 }}>
            <CardMedia component={'img'} image={srcSet} sx={{ objectFit: 'cover', width:'18vw', maxWidth: '200px' }}/>
            <CardContent sx={{flex: '1 0 auto'}}>
                <Grid item>
                    <Link href={`/product/${item.product_id}`} underline="none">
                        {item.title}
                    </Link>
                </Grid>
                <Grid item>
                    <Typography variant="h6">
                        Price:{'\t'}
                        <b>${item.price}</b>
                    </Typography>
                </Grid>
                <Grid item>
                    <IconButton onClick={() => decreaseQuantity(item.product, item.quantity)}>
                        <Remove />
                    </IconButton>
                    <Input readOnly type="number" value={item.quantity} />
                    <IconButton onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>
                        <Add />
                    </IconButton>
                </Grid>
                <Grid item>
                    <Typography variant="h6">
                        Total:{'\t'}
                        <b>${item.price * item.quantity}</b>
                    </Typography>
                </Grid>
                <Grid item>
                    <Button
                        sx={{ width: '10vw' }}
                        variant="outlined"
                        color="warning"
                        onClick={() => deleteCartItem(item.product)}
                    >
                        Remove
                    </Button>
                </Grid>
            </CardContent>
        </Card>
    );
};
