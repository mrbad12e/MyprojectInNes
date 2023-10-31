import { Fragment } from 'react';
import { Container, Grid, Paper } from '@mui/material';
import { Menubar } from './Menubar';
import Loader from '../../components/Loader/Loader';
import { OrderTable } from './MyOrdersTable';
export const MyOrders = () => {
    return (
        <Fragment>
            <Container maxWidth="lg" sx={{ my: 3 }}>
                <Grid container spacing={2}>
                    <Menubar />
                    <Grid item xs={9}>
                        <Paper>
                            <Grid container>
                                <OrderTable />
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Fragment>
    );
};
