import styled from 'styled-components';
import { mobile } from '../../responsive';
import { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../../redux/actions/userActions';
import { MailOutline } from '@mui/icons-material';
import { Input, InputAdornment, InputLabel, FormControl, Button, Typography, Box } from '@mui/material';
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

const ForgotPassword = () => {
    const dispatch = useDispatch();
    const { error, message, isFetching } = useSelector((state) => state.forgotpassword);

    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPassword(email));
    };

    useEffect(() => {
        if (error) toast.error(error);
        if (message) toast.success(message);
    }, [dispatch, error, message]);
    return (
        <Fragment>
            {isFetching ? (
                <Loader />
            ) : (
                <Container>
                    <Wrapper>
                        <Typography variant="h5">FORGOT PASSWORD</Typography>
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
                            <Box>
                                <Button type="submit">CONFIRM</Button>
                            </Box>
                        </form>
                    </Wrapper>
                </Container>
            )}
        </Fragment>
    );
};

export default ForgotPassword;
