import { Add, ManageAccountsOutlined, Store, LogoutOutlined, LoginOutlined } from '@mui/icons-material';
import { Box, SpeedDial, SpeedDialAction } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { logout } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';

const FloatingIcon = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const handleLogOut = () => {
        dispatch(logout());
        navigate('/');
    };
    return (
        <Box
            sx={{
                display: { xs: 'block', md: 'none' },
                position: 'fixed',
                transform: 'translateZ(0px)',
                bottom: 16,
                right: 16,
                zIndex: 100,
            }}
        >
            {user ? (
                <SpeedDial ariaLabel="SpeedDial basic example" icon={<Add />} direction="up">
                    <SpeedDialAction icon={<LogoutOutlined />} onClick={handleLogOut} />
                    <SpeedDialAction icon={<Store />} onClick={() => navigate('/store')} />
                    <SpeedDialAction icon={<ManageAccountsOutlined />} onClick={() => navigate('/me')} />
                </SpeedDial>
            ) : (
                <SpeedDial ariaLabel="SpeedDial basic example" icon={<Add />} direction="up">
                    <SpeedDialAction icon={<LoginOutlined />} onClick={() => navigate('/login')} />
                    <SpeedDialAction icon={<Store />} onClick={() => navigate('/store')} />
                </SpeedDial>
            )}
        </Box>
    );
};
export default FloatingIcon;
