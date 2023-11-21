import { Button, Container, Grid, Paper, TextField } from '@mui/material';
import {} from '@mui/icons-material';
import { Fragment, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { returnRequest } from '../../redux/actions/orderActions';

const paperDesign = {
    p: 2,
    display: 'flex',
    flexDirection: 'column',
    m: 2,
};

export const Return = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const navigate = useNavigate();
    const [reason, setReason] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(returnRequest(id, reason));
        navigate('/me/orders');
    };
    return (
        <Fragment>
            <Container sx={{ my: 2 }}>
                <Grid container spacing={3} alignItems={'center'}>
                    <Grid item xs={12}>
                        <Paper sx={paperDesign}>
                            <TextField
                                fullWidth
                                label="Reason"
                                variant="outlined"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                            />
                        </Paper>
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Submit return
                        </Button>
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    );
};
