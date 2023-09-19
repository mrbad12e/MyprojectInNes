import { Badge, Box, Button } from '@mui/material';
import { ShoppingCartOutlined } from '@mui/icons-material';
import {Container, Typography} from '@mui/material'
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import SearchBox from './Search'
import './navbar.css'
import { logout } from '../../redux/actions/userActions';
const Navbar = () => {
    const cartItems = useSelector((state) => state.cart.cartItems);
    let quantity = cartItems.length
    const user = useSelector((state) => state.user.currentUser);
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogOut = () => {
        dispatch(logout())
        navigate('/')
    }
    return (
        <Container maxWidth='lg'>
            <div className='navbar-wrapper'>
                <div className='navbar-left'>
                    <Typography variant='h6'>EN</Typography>
                    <SearchBox/>
                </div>
                <Box sx={{ cursor: 'pointer' }}>
                    <div onClick={() => navigate('/')}><h1 className='navbar-logo'>Sap Co</h1></div>
                </Box>
                <div className='navbar-right'>
                    {!user ? (
                        <>
                            <div className='navbar-menu-item'>
                                <Link style={{ textDecoration: 'none' }} to="/register">REGISTER</Link>
                            </div>
                            <div className='navbar-menu-item'>
                                <Link style={{ textDecoration: 'none' }} to="/login">SIGN IN</Link>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className='menu-item'>
                                <Link style={{ textDecoration: 'none' }} to='/dashboard' >DASHBOARD</Link>
                            </div>
                            <div className='menu-item'>
                                <Button onClick={handleLogOut}>Logout</Button>
                            </div>
                        </>
                    )}
                    <Link to="/cart">
                        <div className='menu-item'>
                            <Badge badgeContent={quantity} color="primary">
                                <ShoppingCartOutlined />
                            </Badge>
                        </div>
                    </Link>
                </div>
            </div>
        </Container>
    );
};

export default Navbar;
