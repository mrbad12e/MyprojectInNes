import { useNavigate, useLocation } from 'react-router-dom';
import { Grid, List, ListItemButton, ListItemIcon, ListItemText, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { teal } from '@mui/material/colors';
import {} from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/actions/userActions';

const CustomListItem = styled(ListItemButton)(({ theme }) => ({
    '&.Mui-selected': {
        backgroundColor: teal[500],
        color: theme.palette.common.white,
    },
}));

export const Menubar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { pathname } = useLocation();
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };
    return (
        <Grid item xs>
            <Paper elevation={3}>
                <List sx={{ p:0 }}>
                    <CustomListItem sx={{  }} selected={pathname.endsWith('/me') ? true : false} href="/me">
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary="Dashboard" />
                    </CustomListItem>
                    <CustomListItem selected={pathname.endsWith('/orders') ? true : false} href="/me/orders">
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary="My Orders" />
                    </CustomListItem>
                    <CustomListItem selected={pathname.endsWith('/password') ? true : false} href="/me/password">
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary="Update password" />
                    </CustomListItem>
                    <CustomListItem selected={pathname.endsWith('/profile') ? true : false} href="/me/profile">
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary="Update profile" />
                    </CustomListItem>
                    <CustomListItem onClick={handleLogout}>
                        <ListItemIcon></ListItemIcon>
                        <ListItemText primary="Logout" />
                    </CustomListItem>
                </List>
            </Paper>
        </Grid>
    );
};
