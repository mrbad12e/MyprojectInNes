import { useEffect, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
    Button,
    Container,
    FormControl,
    Grid,
    IconButton,
    Input,
    InputAdornment,
    InputLabel,
    Paper,
    Typography,
} from '@mui/material';
import { Menubar } from './Menubar';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, updatePassword } from '../../redux/actions/userActions';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UpdatePassword = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, isUpdated } = useSelector((state) => state.user);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const [showOldPassword, setShowOldPassword] = useState(false);
    const handleClickShowOldPassword = () => setShowOldPassword((show) => !show);
    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(updatePassword(oldPassword, password, confirmPassword));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            toast.success('Password updated successfully');
            dispatch({ type: 'UPDATE_PASSWORD_RESET' });
            navigate('/me');
        }
    });
    return (
        <Container maxWidth="xl" sx={{ my: 3 }}>
            <Grid container spacing={2}>
                <Menubar />
                <Grid item xs={9}>
                    <Paper sx={{ m: 2, p: 4 }}>
                        <Typography variant="h4" textAlign={'center'}>
                            Update Password
                        </Typography>
                        <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                            <InputLabel>Enter your old password</InputLabel>
                            <Input
                                name="oldPassword"
                                onChange={(e) => setOldPassword(e.target.value)}
                                type={showOldPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="start">
                                        <IconButton onClick={handleClickShowOldPassword}>
                                            {showOldPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                            <InputLabel>Enter your new password</InputLabel>
                            <Input
                                name="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="start">
                                        <IconButton onClick={handleClickShowPassword}>
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                            <InputLabel>Confirm your new password</InputLabel>
                            <Input
                                name="confirmPassword"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type={showConfirmPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment position="start">
                                        <IconButton onClick={handleClickShowConfirmPassword}>
                                            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <Grid container justifyContent={'center'} mt={3}>
                            <Button variant="contained" onClick={handleSubmit}>
                                Update Password
                            </Button>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default UpdatePassword;
