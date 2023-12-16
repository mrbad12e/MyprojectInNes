import { Button, Container, Grid, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { CartItemCard } from './CartItemCard';
import { teal } from '@mui/material/colors';

const EmptyCart = () => {
    return (
        <Grid container>
            <Typography variant="h4" textAlign={'center'}>
                Your cart is empty. Please go back to the store and add some items to your cart.
            </Typography>
        </Grid>
    );
};
const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const navigate = useNavigate();

    let total = parseFloat(cart.cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0.0)).toFixed(2);
    return (
        <Container maxWidth="xl">
            <Typography variant="h4" textAlign={'center'} fontWeight={600}>
                YOUR BAG
            </Typography>
            <Grid container>
                <Grid item xs={6}>
                    <Button sx={{ color: teal[50], bgcolor: teal[500]}} onClick={() => navigate('/store')}>CONTINUE SHOPPING</Button>
                </Grid>
                <Grid item xs={6}>
                    <Typography textAlign={'center'} variant="h6" sx={{ textDecoration: 'underline' }}>
                        Wishlist
                    </Typography>
                </Grid>
            </Grid>
            {cart.cartItems.length === 0 ? (
                <EmptyCart />
            ) : (
                <Grid container spacing={1}>
                    <Grid item xs={12} md={7}>
                        {cart.cartItems.map((item) => (
                            <CartItemCard item={item} key={item.product} />
                        ))}
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Grid>
                                <Typography variant="h5" fontWeight={500} textAlign={'center'}>
                                    ORDER SUMMARY
                                </Typography>
                            </Grid>
                            <Grid container justifyContent={'space-between'}>
                                <Typography variant="h6" fontWeight={500}>
                                    Subtotal:
                                </Typography>
                                <Typography variant="h6" fontWeight={500}>
                                    ${total}
                                </Typography>
                            </Grid>
                            <Grid container justifyContent={'space-between'}>
                                <Typography variant="h6" fontWeight={500}>
                                    Estimated Shipping:
                                </Typography>
                                <Typography variant="h6" fontWeight={500}>
                                    $5.90
                                </Typography>
                            </Grid>
                            <Grid container justifyContent={'space-between'}>
                                <Typography variant="h6" fontWeight={500}>
                                    Shipping Discount:
                                </Typography>
                                <Typography variant="h6" fontWeight={500}>
                                    -$5.90
                                </Typography>
                            </Grid>
                            <Grid container justifyContent={'space-between'}>
                                <Typography variant="h6" fontWeight={500}>
                                    Total:
                                </Typography>
                                <Typography variant="h6" fontWeight={600}>
                                    ${total}
                                </Typography>
                            </Grid>
                            <Button
                                variant="contained"
                                sx={{ color: teal[50], backgroundColor: teal[500], width: '100%', marginTop: '1rem' }}
                                onClick={() => navigate('/cart/checkout/form')}
                            >
                                CHECKOUT NOW
                            </Button>
                        </Paper>
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};

export default Cart;
