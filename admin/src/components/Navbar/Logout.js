import { Fragment} from 'react';
import { IconButton } from '@mui/material';
import { LogoutOutlined } from '@mui/icons-material';
import { logout } from '../../redux/actions/userActions';
import { useDispatch} from 'react-redux';
export const LogOut = () => {
    const dispatch = useDispatch();
    const handleClick = () => {
        dispatch(logout());
    };
    return (
        <Fragment>
            <IconButton color="inherit" onClick={handleClick}>
                <LogoutOutlined />
            </IconButton>
        </Fragment>
    );
};
