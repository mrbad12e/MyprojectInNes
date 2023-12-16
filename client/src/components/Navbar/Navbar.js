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
    const user = useSelector((state) => state.user.user);
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
        <Container maxWidth="xl" sx={{ my: 1 }}>
            <Grid container>
                <Grid item xs={5} sx={{ display: { xs: 'none', md: 'block' } }}>
                    <SearchBox />
                </Grid>
                <Grid item xs={12} md={3}>
                    <Button variant="text" sx={{ width: '100%' }} size="large" onClick={() => navigate('/')}>
                        <Typography variant="h4" color={teal[500]} textAlign={'center'}>
                            Sap Co
                        </Typography>
                    </Button>
                </Grid>
                <Grid item xs sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'}>
                    {!user ? (
                        <Grid container justifyContent={'end'} spacing={2}>
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
                            <IconButton href="/cart" size="large">
                                <Badge badgeContent={quantity} color="primary">
                                    <ShoppingCartOutlined />
                                </Badge>
                            </IconButton>

                            <IconButton onClick={handleClick} size="large">
                                <AccountCircleOutlined />
                            </IconButton>

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
                <Grid item xs={1} sx={{ display: { xs: 'none', md: 'flex' } }} alignItems={'center'} justifyContent={'center'}>
                    <Typography variant="h6">
                        EN
                    </Typography>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Navbar;
