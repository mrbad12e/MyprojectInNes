import { Button, Container, Grid, Typography } from '@mui/material';
import { CheckCircle } from '@mui/icons-material';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { clearCart } from '../../redux/actions/cartActions';
import { teal } from '@mui/material/colors';

const OrderSuccess = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(clearCart());
    }, [dispatch]);

    return (
        <Container maxWidth="xl">
            <Typography textAlign={'center'} fontWeight={600} variant='h4'>
                <CheckCircle /> Your Order has been placed successfully
            </Typography>

            <Grid container justifyContent={'center'}>
                <Button
                    sx={{ color: teal[50], bgcolor: teal[500] }}
                    variant="contained"
                    onClick={() => navigate('/me/orders')}
                >
                    View Orders
                </Button>
            </Grid>
        </Container>
    );
};

export default OrderSuccess;
