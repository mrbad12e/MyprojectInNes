import { Title } from '../../components/Title/Title';
import { Customers } from './Customers';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { clearErrors, getOneUser, updateOneUser } from '../../redux/actions/userActions';
import { Avatar, Badge, Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { CameraAlt } from '@mui/icons-material';
import { VisuallyHiddenInput } from '../../components/VisuallyHiddenInput';
import { toast } from 'react-toastify';


export const CustomerDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { user, isFetching, error } = useSelector((state) => state.oneUser);

    const avatarLink = `${process.env.BACKEND_URL}/${user.avatar}`;
    const [name, setName] = useState(user.username);
    const [email, setEmail] = useState(user.email);
    const [role, setRole] = useState(user.role);

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
        const myForm = new FormData();
        myForm.set('type', 'avatar');
        myForm.set('username', name);
        myForm.set('email', email);
        myForm.set('role', role);
        myForm.set('avatar', avatar);
        dispatch(updateOneUser(id, myForm));
    };

    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
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
                        m: 2,
                    }}
                >
                    <Title>Customer Detail</Title>
                    {isFetching ? (
                        <Loader />
                    ) : (
                        <Grid container columnSpacing={3} rowGap={3}>
                            <Grid container spacing={3} alignItems={'center'}>
                                <Grid item xs>
                                    <Typography align={'center'}>Username</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <TextField
                                        fullWidth
                                        value={name}
                                        variant="outlined"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} alignItems={'center'}>
                                <Grid item xs>
                                    <Typography align={'center'}>Email</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <TextField
                                        fullWidth
                                        value={email}
                                        variant="outlined"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} alignItems={'center'}>
                                <Grid item xs>
                                    <Typography align={'center'}>Role</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <TextField
                                        fullWidth
                                        value={role}
                                        variant="outlined"
                                        onChange={(e) => setRole(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Paper>
            </Grid>
            <Grid item md={4}>
                <Paper sx={{ p: 2, m: 2, display: 'flex', alignItems: 'center' }}>
                    <Grid container justifyContent={'center'}>
                        <Badge badgeContent={<CameraAlt />} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
                            <Button component="label" sx={{ '&:hover': { background: 'inherit' } }}>
                                <Avatar src={avatarPreview} sx={{ width: 256, height: 256 }} />
                                <VisuallyHiddenInput type="file" onChange={handleFileChange} />
                            </Button>
                        </Badge>
                    </Grid>
                </Paper>
            </Grid>
            <Grid container justifyContent={'center'} sx={{ flexGrow: 1 }}>
                <Grid item>
                    <Button variant='contained' onClick={handleSubmit}>Submit Changes</Button>
                </Grid>
            </Grid>
        </Customers>
    );
};
