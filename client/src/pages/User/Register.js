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
    Link
} from '@mui/material';
import { Visibility, VisibilityOff, AccountCircleOutlined, MailOutline } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register } from '../../redux/actions/userActions';
const Container1 = styled.div`
    width: 100%;
    height: 100vh;
    background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)),
        url('https://shop.minecraft.net/cdn/shop/files/Desktop_Homepage_Banner_-_Option_1_3.png?v=1689176575') center;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Wrapper = styled.div`
    width: 40%;
    padding: 20px;
    background-color: #f0f7ff;
    ${mobile({ width: '75%' })}
`;
// const Button = styled.button`
//     width: 40%;
//     border: none;
//     padding: 15px 20px;
//     background-color: teal;
//     color: white;
//     cursor: pointer;
// `;

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
        dispatch(register(username, email, password))
    };

    useEffect(() => {
        if (error) console.log(error);
        if (isAuthenticated) navigate('/');
    }, [dispatch, error, isAuthenticated, navigate]);
    return (
        <Container1>
            <Wrapper>
                <Typography variant="h5">CREATE AN ACCOUNT</Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
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
                    <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
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

                    <Typography variant="subtitle1" sx={{ m: 2 }}>
                        By creating an account, I consent to the processing of my personal data in accordance with the{' '}
                        <b>PRIVACY POLICY</b>
                    </Typography>
                    <Box display='flex' justifyContent='space-evenly'>
                        <Box sx={{ m: 2 }} alignItems='center'>
                            <Typography variant="caption" gutterBottom m={0}>
                                Already have an account ? {' '}
                            </Typography>
                            <Link underline="none" href="/login" fontSize={14}>
                                LOG IN
                            </Link>
                        </Box>
                        <Button color="info" type="submit">
                            CREATE
                        </Button>
                    </Box>
                </form>
            </Wrapper>
        </Container1>
    );
};

export default Register;
