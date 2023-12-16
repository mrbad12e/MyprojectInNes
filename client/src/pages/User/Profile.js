import { useEffect, useState, Fragment } from 'react';
import { Avatar, Badge, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Menubar } from './Menubar';
import { CameraAlt } from '@mui/icons-material';
import Loader from '../../components/Loader/Loader';
export const Profile = () => {
    const navigate = useNavigate();
    const backend_url = process.env.BACKEND_URL;
    const { user, isFetching, isAuthenticated } = useSelector((state) => state.user);

    const username = user.username;
    const email = user.email;
    const avatar = `${backend_url}/${user.avatar}`;
    console.log(avatar);
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [navigate, isAuthenticated]);
    return (
        <Fragment>
            {isFetching ? (
                <Loader />
            ) : (
                <Container maxWidth="xl" sx={{ my: 3 }}>
                    <Grid container spacing={2}>
                        <Menubar />
                        <Grid item xs={9}>
                            <Paper sx={{ m: 2, p: 4 }}>
                                <Grid container rowGap={3}>
                                    <Grid container justifyContent={'center'}>
                                        <Avatar src={avatar} sx={{ width: 256, height: 256 }} />
                                    </Grid>
                                    <Grid container alignItems={'center'}>
                                        <Grid item xs>
                                            <Typography>Username</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography>{username}</Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid container alignItems={'center'}>
                                        <Grid item xs>
                                            <Typography>Email</Typography>
                                        </Grid>
                                        <Grid item xs={8}>
                                            <Typography>{email}</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    </Grid>
                </Container>
            )}
        </Fragment>
    );
};
