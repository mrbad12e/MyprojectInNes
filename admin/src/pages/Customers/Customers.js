import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, CssBaseline, Toolbar, Container, Paper } from '@mui/material';
import { CustomerTable } from './CustomerTable';
import Loader from '../../components/Loader/Loader';

const defaultTheme = createTheme();

export const Customers = () => {
    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                            <CustomerTable />
                        </Paper>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
};
