import { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../redux/actions/userActions';
import { MailOutline } from '@mui/icons-material';
import {
    Input,
    InputAdornment,
    InputLabel,
    FormControl,
    Button,
    Typography,
    Container,
    Paper,
    Grid,
} from '@mui/material';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader/Loader';
import { teal } from '@mui/material/colors';

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const { error, message, isFetching } = useSelector((state) => state.forgotpassword);

    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
        if (message) toast.success(message);
    }, [dispatch, error, message]);
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
                            FORGOT PASSWORD
                        </Typography>
                        <form onSubmit={handleSubmit}>
                            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                <InputLabel>Enter your email</InputLabel>
                                <Input
                                    name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    endAdornment={
                                        <InputAdornment position="start">
                                            <MailOutline />
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <Grid container justifyContent={'center'} my={2}>
                                <Button type="submit" variant="contained" sx={{ color: teal[50], bgcolor: teal[500] }}>
                                    CONFIRM
                                </Button>
                            </Grid>
                        </form>
                    </Paper>
                </Container>
            )}
        </Container>
    );
};

export default ForgotPassword;
