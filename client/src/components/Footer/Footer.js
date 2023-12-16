import { Facebook, Instagram, MailOutline, Phone, Pinterest, Room, Twitter } from '@mui/icons-material';
import {Container, Grid, IconButton, ListItem, Typography } from '@mui/material'
import { teal } from '@mui/material/colors';
const Footer = () => {
    return (
        <Container sx={{ display: {xs: 'none', md: 'block'}, bgcolor: teal[500], color: 'white', mt:2 }} component={'footer'} maxWidth={false}>
            <Grid container spacing={1} >
                <Grid item xs={4} md={4} justifyContent={'center'}>
                    <Typography variant='h4'>Mine.</Typography>
                    <br />
                    <Typography>
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered
                        alteration in some form, by injected humour, or randomised words which don’t look even slightly
                        believable.
                    </Typography>
                    <Grid item xs={12} md={12} textAlign={'center'}>
                        <IconButton children={<Facebook/>} sx={{bgcolor: '#3B5999', color: 'white', m: 1}}/>
                        <IconButton children={<Instagram/>} sx={{bgcolor: '#E4405F', color: 'white', m: 1}}/>
                        <IconButton children={<Twitter/>} sx={{bgcolor: '#55ACEE', color: 'white', m: 1}}/>
                        <IconButton children={<Pinterest/>} sx={{bgcolor: '#E60023', color: 'white', m: 1}}/>
                    </Grid>

                </Grid>
                <Grid item xs={4} md={4} textAlign={'center'}>
                    <Typography variant='h4'>Useful Links</Typography>
                    <br />
                    <Grid container columns={2} spacing={2}>
                        <Grid item xs textAlign={'center'}><Typography variant='h6'>Home</Typography></Grid>
                        <Grid item xs textAlign={'center'}><Typography variant='h6'>Cart</Typography></Grid>
                    </Grid>
                    
                </Grid>
                <Grid item xs={4} md={4} textAlign={'center'}>
                    <Typography variant='h4'>Contact</Typography>
                    <br />
                    <Grid item xs={12} md={12} textAlign={'center'}>
                        <ListItem>
                            <Room style={{ marginRight: '10px' }} />221B Baker Street
                        </ListItem>
                        <ListItem>
                            <Phone style={{ marginRight: '10px' }} />+84 012 345 6789
                        </ListItem>
                        <ListItem>
                            <MailOutline style={{ marginRight: '10px' }} />saptheoanh123@gmail.com
                        </ListItem>
                        <ListItem>
                            <img className='footer-payment' src="https://i.ibb.co/Qfvn4z6/payment.png" alt=''/>
                        </ListItem>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Footer;
