import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, CssBaseline, Toolbar, Container, Grid } from '@mui/material';

const defaultTheme = createTheme();

export const Orders = ({ children }) => {
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
                    <Container sx={{ my: 4 }}>
                        <Grid container>
                            {children}
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
};
