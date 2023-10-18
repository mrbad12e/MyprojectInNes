import { Title } from '../../components/Title/Title';
import { Customers } from './Customers';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOneUser } from '../../redux/actions/userActions';
import { Box, FormControl, Grid, Input, InputAdornment, InputLabel, Paper, TextField, Typography } from '@mui/material';
import {} from '@mui/icons-material';

export const CustomerDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { user, isFetching, error } = useSelector((state) => state.oneUser);
    console.log(user);

    const [name, setName] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [role, setRole] = useState(user.role);
    const handleSubmit = () => {};

    useEffect(() => {
        if (error) console.log(error);
        dispatch(getOneUser(id));
    }, [dispatch, error, id]);
    return (
        <Customers>
            <Grid item md={8}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        m: 2
                    }}
                >
                    <Title>Customer Detail</Title>
                    {isFetching ? (
                        <Loader />
                    ) : (
                        <Grid container columnSpacing={3}>
                            <Grid container spacing={3} alignItems={'center'}>
                                <Grid item xs>
                                    <Typography align={'center'}>Username</Typography>
                                </Grid>
                                <Grid item xs={9} >
                                    <TextField fullWidth value={name} variant="outlined" onChange={(e) => setName(e.target.value)} />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} alignItems={'center'}>
                                <Grid item xs>
                                    <Typography align={'center'}>Email</Typography>
                                </Grid>
                                <Grid item xs={9} >
                                    <TextField fullWidth value={email} variant="outlined" onChange={(e) => setEmail(e.target.value)} />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} alignItems={'center'}>
                                <Grid item xs>
                                    <Typography align={'center'}>Role</Typography>
                                </Grid>
                                <Grid item xs={9} >
                                    <TextField fullWidth value={role} variant="outlined" onChange={(e) => setRole(e.target.value)} />
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Paper>
            </Grid>
        </Customers>
    );
};
