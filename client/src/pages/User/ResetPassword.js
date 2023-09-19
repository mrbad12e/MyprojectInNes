import styled from 'styled-components';
import { mobile } from '../../responsive';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../../redux/actions/userActions';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useParams } from 'react-router-dom'
import { Input, InputAdornment, InputLabel, FormControl, Button, Typography, IconButton, Box } from '@mui/material';
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

const ResetPassword = () => {
    let { token } = useParams()
    const dispatch = useDispatch();
    const { error, success, isFetching } = useSelector((state) => state.forgotpassword);

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(resetPassword(token, password, confirmPassword));
    };

    useEffect(() => {
        if (error) console.log(error);
        if (success) console.log(success);
    }, [dispatch, error, success]);
    return (
        <Container>
            <Wrapper>
                <Typography variant="h5">RESET PASSWORD</Typography>
                <form onSubmit={handleSubmit}>
                    <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                        <InputLabel>Enter your password</InputLabel>
                        <Input
                            name="password"
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
                        <InputLabel>Confirm your password</InputLabel>
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
                    <Box>
                        <Button type="submit">CONFIRM</Button>
                    </Box>
                </form>
            </Wrapper>
        </Container>
    );
};

export default ResetPassword;
