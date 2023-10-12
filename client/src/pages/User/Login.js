import styled from 'styled-components';
import { mobile } from '../../responsive';
import { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/userActions';
import { Visibility, VisibilityOff, MailOutline } from '@mui/icons-material';
import {
    Input,
    InputAdornment,
    InputLabel,
    FormControl,
    Button,
    Typography,
    IconButton,
    Box,
    Link,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
const Container = styled.div`
    width: 100%;
    height: 100vh;
    background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
        url('https://shop.minecraft.net/cdn/shop/files/Minecraft-Birthday_2022-Desktop_HomepageBanner-1920x1125_1.jpg?v=1684339266')
            center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 25%;
    padding: 20px;
    background-color: #f0f7ff;
    ${mobile({ width: '75%' })}
`;

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isFetching, error, isAuthenticated } = useSelector((state) => state.user);

    const [user, setUser] = useState({ email: '', password: '' });
    const { email, password } = user;

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    };

    useEffect(() => {
        if (error) toast.error(error);
        if (isAuthenticated) navigate('/');
    }, [dispatch, error, isAuthenticated, navigate]);
    return (
        <Fragment>
            {isFetching ? (
                <Loader />
            ) : (
                <Container>
                    <Wrapper>
                        <Typography variant="h5">LOG IN</Typography>
                        <form onSubmit={handleSubmit}>
                            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                <InputLabel>Enter your email</InputLabel>
                                <Input
                                    name="email"
                                    onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                                    endAdornment={
                                        <InputAdornment position="start">
                                            <IconButton>
                                                <MailOutline />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                <InputLabel>Enter your password</InputLabel>
                                <Input
                                    name="password"
                                    onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
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
                            <Box m={1} py={1}>
                                <Link href="/password/forgot">Forgot password?</Link>
                            </Box>
                            <Box display="flex" justifyContent="space-between">
                                <Box sx={{ m: 1 }} alignItems="center">
                                    <Typography variant="caption" gutterBottom m={0}>
                                        Doesn't have an account ?{' '}
                                    </Typography>
                                    <Link underline="none" href="/register" fontSize={14}>
                                        REGISTER
                                    </Link>
                                </Box>
                                <Button color="info" type="submit">
                                    LOG IN
                                </Button>
                            </Box>
                        </form>
                    </Wrapper>
                </Container>
            )}
        </Fragment>
    );
};

export default Login;
