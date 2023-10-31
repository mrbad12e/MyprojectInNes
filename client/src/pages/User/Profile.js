import { useEffect, useState, Fragment } from 'react';
import { Avatar, Badge, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menubar } from './Menubar';
import { CameraAlt } from '@mui/icons-material';
import Loader from '../../components/Loader/Loader';
export const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const backend_url = process.env.BACKEND_URL;
    const { currentUser, isFetching, isAuthenticated } = useSelector((state) => state.user);
    
    const [username, setUsername] = useState(currentUser.username);
    const [email, setEmail] = useState(currentUser.email);
    const [avatar, setAvatar] = useState(`${backend_url}/${currentUser.avatar}`);

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    }, [dispatch, navigate, isAuthenticated]);
    return (
        <Fragment>
            {isFetching ? (
                <Loader />
            ) : (
                <Container maxWidth="lg" sx={{ my: 3 }}>
                    <Grid container spacing={2}>
                        <Menubar />
                        <Grid item xs={9}>
                            <Grid container rowGap={3}>
                                <Grid container justifyContent={'center'}>
                                    <Badge
                                        badgeContent={<CameraAlt />}
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                    >
                                        <Button component="label" sx={{ '&:hover': { background: 'inherit' } }}>
                                            <Avatar src={avatar} sx={{ width: 256, height: 256 }} />
                                        </Button>
                                    </Badge>
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
                        </Grid>
                    </Grid>
                </Container>
            )}
        </Fragment>
    );
};
