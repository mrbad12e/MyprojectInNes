import {
    Avatar,
    Button,
    TextField,
    FormControlLabel,
    Checkbox,
    Box,
    Typography,
    Container,
    CssBaseline,
} from '@mui/material';
import { LockOutlined } from '@mui/icons-material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { login } from '../../redux/actions/userActions';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// function Copyright(props) {
//     return (
//         <Typography variant='body2' color={'CaptionText'} align='center' {...props}>
//             {'.Copyright @ '}
//             <Link color={'inherit'}>E-commerce</Link>
//             {' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     )
// }

const defaultTheme = createTheme();

const Login = () => {
    const dispatch = useDispatch()
    const { isFetching, error, isAuthenticated } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password))
    };
    useEffect(() => {
        if (error) toast.error(error);
        if (isAuthenticated) navigate('/dashboard');
    }, [dispatch, error, isAuthenticated, navigate]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component={'main'} maxWidth="xs">
                <CssBaseline />
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlined />
                    </Avatar>
                    <Typography component={'h1'} variant="h5">
                        Log in
                    </Typography>
                    <Box component={'form'} onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            type="password"
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            name="password"
                            autoComplete="password"
                            autoFocus
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                            Sign In
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );
};
export default Login;
