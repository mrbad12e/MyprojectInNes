import { useEffect, useState, Fragment } from 'react';
import { Avatar, Badge, Button, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Menubar } from './Menubar';
import { CameraAlt } from '@mui/icons-material';
import Loader from '../../components/Loader/Loader';
import { VisuallyHiddenInput } from '../../components/VisuallyHiddenInput';
import { addProfile, loadUser } from '../../redux/actions/userActions';
import { toast } from 'react-toastify';

const myForm = new FormData();
export const AddProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const backend_url = process.env.BACKEND_URL;
    const { user, isFetching, isAuthenticated, isUpdated } = useSelector((state) => state.user);

    const [username, setUsername] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const avatarLink = `${backend_url}/${user.avatar}`;
    const [avatar, setAvatar] = useState(avatarLink);
    const [avatarPreview, setAvatarPreview] = useState(avatarLink);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Read and display the selected image
            setAvatar(file);
            const reader = new FileReader();
            reader.onload = (event) => {
                setAvatarPreview(event.target.result);
            };
            reader.readAsDataURL(file);
        } else {
            setAvatarPreview(null);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        myForm.set('type', 'avatar');
        myForm.set('email', email);
        myForm.set('avatar', avatar);
        dispatch(addProfile(myForm));
        navigate('/me');
    };
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        }
        if (isUpdated) {
            toast.success('Profile updated successfully');
            dispatch(loadUser());
            navigate('/me');
        }
    }, [isAuthenticated, navigate]);
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
                                        <Badge
                                            badgeContent={<CameraAlt />}
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        >
                                            <Button component="label" sx={{ '&:hover': { background: 'inherit' } }}>
                                                <Avatar src={avatarPreview} sx={{ width: 256, height: 256 }} />
                                                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
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
                                            <TextField
                                                fullWidth
                                                variant="standard"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </Grid>
                                    </Grid>
                                    <Grid container justifyContent={'center'}>
                                        <Button variant="contained" onClick={handleSubmit}>
                                            Update
                                        </Button>
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
