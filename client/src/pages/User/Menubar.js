import { Fragment } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Grid, List, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material';
import {} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/userActions';

export const Menubar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }
    return (
        <Fragment>
            <Grid item xs>
                <Paper>
                    <List component={'nav'}>
                        <ListItemButton selected={pathname.endsWith('/me') ? true : false} href='/me'>
                            <ListItemIcon></ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItemButton>
                        <ListItemButton selected={pathname.endsWith('/orders') ? true : false} href='/me/orders'>
                            <ListItemIcon></ListItemIcon>
                            <ListItemText primary="My Orders" />
                        </ListItemButton>
                        <ListItemButton selected={pathname.endsWith('/password') ? true : false} href='/me/password'>
                            <ListItemIcon></ListItemIcon>
                            <ListItemText primary="Update password" />
                        </ListItemButton>
                        <ListItemButton selected={pathname.endsWith('/profile') ? true : false} href='/me/profile'>
                            <ListItemIcon></ListItemIcon>
                            <ListItemText primary="Update profile" />
                        </ListItemButton>
                        <ListItemButton onClick={handleLogout}>
                            <ListItemIcon></ListItemIcon>
                            <ListItemText primary="Logout" />
                        </ListItemButton>
                    </List>
                </Paper>
            </Grid>
        </Fragment>
    );
};
