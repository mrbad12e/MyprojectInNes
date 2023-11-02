import { Badge, Grid, IconButton, Menu, Link, MenuItem, Divider, Button } from '@mui/material';
import { AccountCircleOutlined, ShoppingCartOutlined } from '@mui/icons-material';
import { Container, Typography } from '@mui/material';
import { teal } from '@mui/material/colors';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import SearchBox from './Search';
import { logout } from '../../redux/actions/userActions';
const Navbar = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    let quantity = cartItems.length;
    const user = useSelector((state) => state.user.currentUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogOut = () => {
        dispatch(logout());
        navigate('/');
    };
    return (
        <Container maxWidth="lg" sx={{ my: 1 }}>
            <Grid container alignItems={'center'}>
                <Grid item xs={1}>
                    <Typography variant="h6">EN</Typography>
                </Grid>
                <Grid item xs={4}>
                    <SearchBox />
                </Grid>
                <Grid item xs={4}>
                    <Button
                        variant="text"
                        sx={{ '&:hover': { background: 'inherit' } }}
                        size="large"
                        onClick={() => navigate('/')}
                    >
                        <Typography variant="h4" color={teal[500]}>
                            Sap Co
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs>
                    {!user ? (
                        <Grid container spacing={2}>
                            <Grid item>
                                <Link style={{ textDecoration: 'none' }} color={teal[500]} href="/register">
                                    <Typography variant="h6">REGISTER</Typography>
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link style={{ textDecoration: 'none' }} color={teal[500]} href="/login">
                                    <Typography variant="h6">SIGN IN</Typography>
                                </Link>
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid container justifyContent={'end'}>
                            <Grid item>
                                <IconButton href="/cart" size="large">
                                    <Badge badgeContent={quantity} color="primary">
                                        <ShoppingCartOutlined />
                                    </Badge>
                                </IconButton>
                            </Grid>
                            <Grid item>
                                <IconButton onClick={handleClick} size="large">
                                    <AccountCircleOutlined />
                                </IconButton>
                            </Grid>
                            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                                <MenuItem onClick={handleClose} onClickCapture={() => navigate('/me/profile')}>
                                    Profile
                                </MenuItem>
                                <MenuItem onClick={handleClose} onClickCapture={() => navigate('/me/orders')}>
                                    My Orders
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleClose} onClickCapture={handleLogOut}>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </Grid>
                    )}
                </Grid>
            </Grid>
        </Container>
    );
};

export default Navbar;
