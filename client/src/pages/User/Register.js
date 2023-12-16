import styled from 'styled-components';
import { mobile } from '../../responsive';
import {
    FormControl,
    InputAdornment,
    InputLabel,
    IconButton,
    Input,
    Typography,
    Button,
    Box,
    Link,
    Paper,
    Container,
    Grid,
} from '@mui/material';
import { Visibility, VisibilityOff, AccountCircleOutlined, MailOutline } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../redux/actions/userActions';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import { teal } from '@mui/material/colors';
// const Container1 = styled.div`
//     width: 100%;
//     height: 100vh;
//     background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
//         url('https://shop.minecraft.net/cdn/shop/files/Desktop_Homepage_Banner_-_Option_1_3.png?v=1689176575') center;
//     background-size: cover;
//     display: flex;
//     align-items: center;
//     justify-content: center;
// `;

const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: #f0f7ff;
    ${mobile({ width: '75%' })}
`;

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { error, isFetching, isAuthenticated } = useSelector((state) => state.user);

    const [user, setUser] = useState({ username: '', email: '', password: '' });
    const { username, email, password } = user;

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(username, email, password));
    };

    useEffect(() => {
        if (error) toast.error(error);
        if (isAuthenticated) navigate('/');
    }, [dispatch, error, isAuthenticated, navigate]);
    return (
        <Container
            maxWidth={false}
            style={{
                background:
                    'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url("https://shop.minecraft.net/cdn/shop/files/Desktop_Homepage_Banner_-_Option_1_3.png?v=1689176575") center',
                height: '100vh',
                backgroundSize: 'cover',
                justifyContent: 'center',
                alignItems: 'center',
                display: 'flex',
            }}
        >
            {isFetching ? (
                <Loader />
            ) : (
                <Container maxWidth="md">
                    <Paper elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h4" textAlign={'center'}>
                            CREATE AN ACCOUNT
                        </Typography>

                        <FormControl variant="standard" fullWidth>
                            <InputLabel>Enter your username</InputLabel>
                            <Input
                                name="username"
                                onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                                endAdornment={
                                    <InputAdornment position="start">
                                        <AccountCircleOutlined />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <br />
                        <FormControl variant="standard" fullWidth>
                            <InputLabel>Enter your email</InputLabel>
                            <Input
                                name="email"
                                onChange={(e) => setUser({ ...user, [e.target.name]: e.target.value })}
                                endAdornment={
                                    <InputAdornment position="start">
                                        <MailOutline />
                                    </InputAdornment>
                                }
                            />
                        </FormControl>
                        <br />
                        <FormControl variant="standard" fullWidth>
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
                        <br />
                        <br />
                        <Typography variant="subtitle1" >
                            By creating an account, I consent to the processing of my personal data in accordance with
                            the <b>PRIVACY POLICY</b>
                        </Typography>
                        <br />
                        <Grid container gap={2}>
                            <Grid item xs={12} md={8}>
                                <Grid container alignItems={'center'}>
                                    <Typography variant="subtitle1">
                                        Already have an account ?
                                    </Typography>
                                    <Button variant="text" sx={{ color: teal[500] }} onClick={() => navigate('/login')}>
                                        LOG IN
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item xs>
                                <Button variant="text" sx={{ color: teal[500], width: '100%' }} onClick={handleSubmit}>
                                    CREATE ACCOUNT
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            )}
        </Container>
    );
};

export default Register;
