import { Container, Grid, Paper } from '@mui/material';
import { Menubar } from './Menubar';
import { OrderTable } from './MyOrdersTable';
export const MyOrders = () => {
    return (
        <Container maxWidth="xl" sx={{ my: 3 }}>
            <Grid container spacing={2}>
                <Menubar />
                <Grid item xs={9}>
                    <OrderTable />
                </Grid>
            </Grid>
        </Container>
    );
};
