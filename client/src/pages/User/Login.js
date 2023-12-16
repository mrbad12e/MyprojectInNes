import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login } from '../../redux/actions/userActions';
import { Visibility, VisibilityOff, MailOutline } from '@mui/icons-material';
import {
    Input,
    InputAdornment,
    InputLabel,
    FormControl,
    Button,
    Typography,
    IconButton,
    Container,
    Paper,
    Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import { teal } from '@mui/material/colors';

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
        toast.success('Login successfully');
        dispatch(login(email, password));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        if (isAuthenticated) navigate('/');
    }, [dispatch, error, isAuthenticated, navigate]);
    return (
        <Container
            maxWidth={false}
            style={{
                background:
                    'linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url("https://shop.minecraft.net/cdn/shop/files/Minecraft-Birthday_2022-Desktop_HomepageBanner-1920x1125_1.jpg?v=1684339266") center',
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
                            LOG IN
                        </Typography>
                        <FormControl variant="standard" fullWidth>
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
                        <Grid container>
                            <Button
                                variant="text"
                                sx={{ color: teal[500] }}
                                onClick={() => navigate('/password/forgot')}
                            >
                                Forgot password?
                            </Button>
                        </Grid>
                        <br />
                        <Grid container>
                            <Grid item xs={12} md={8}>
                                <Grid container alignItems={'center'}>
                                    <Typography variant="subtitle1">
                                        Doesn't have an account ?
                                    </Typography>
                                    <Button variant="text" sx={{ color: teal[500] }} onClick={() => navigate('/register')}>
                                        REGISTER
                                    </Button>
                                </Grid>
                            </Grid>
                            <Grid item xs>
                                <Button variant="text" sx={{ color: teal[500], width: '100%' }} onClick={handleSubmit}>
                                    LOG IN
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            )}
        </Container>
    );
};

export default Login;
