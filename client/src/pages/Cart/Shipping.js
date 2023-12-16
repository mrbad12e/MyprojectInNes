import { Phone, Home } from '@mui/icons-material';
import { Country, State } from 'country-state-city';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { saveShippingInfo } from '../../redux/actions/cartActions';
import CheckoutSteps from './CheckoutSteps';
import {
    Container,
    Typography,
    Input,
    InputLabel,
    FormControl,
    InputAdornment,
    Select,
    MenuItem,
    Button,
    Grid,
    Paper,
} from '@mui/material';
import { teal } from '@mui/material/colors';

const Shipping = () => {
    const dispatch = useDispatch();
    const { shippingInfo } = useSelector((state) => state.cart);
    const navigate = useNavigate();

    const [address, setAddress] = useState(shippingInfo.address);
    const [selectedCountry, setSelectedCountry] = useState(shippingInfo.country ? shippingInfo.country : '');
    const [selectedState, setSelectedState] = useState(shippingInfo.state ? shippingInfo.state : '');
    const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNumber);

    const contries = Country.getAllCountries();
    const states = selectedCountry ? State.getStatesOfCountry(selectedCountry) : [];
    const shippingSubmit = (e) => {
        e.preventDefault();

        if (phoneNumber.length < 10 || phoneNumber.length > 10) {
            toast.success('Phone Number should be 10 digits long');
            return;
        }
        dispatch(saveShippingInfo({ 
            address: address, 
            country: selectedCountry,
            state: selectedState, 
            phoneNumber: phoneNumber }));
        navigate('/cart/checkout/confirm');
    };

    return (
        <Container maxWidth="xl">
            <Grid container justifyContent={'center'}>
                <CheckoutSteps activeStep={0} />
            </Grid>
            <Grid container justifyContent={'center'}>
                <Paper elevation={3} sx={{ p: 3 }}>
                    <Typography variant="h3" textAlign={'center'}>
                        Shipping Details
                    </Typography>
                    <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                        <InputLabel>Enter your address</InputLabel>
                        <Input
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            endAdornment={
                                <InputAdornment position="start">
                                    <Home />
                                </InputAdornment>
                            }
                            required
                        />
                    </FormControl>
                    <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                        <InputLabel>Phone Number</InputLabel>
                        <Input
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            endAdornment={
                                <InputAdornment position="start">
                                    <Phone />
                                </InputAdornment>
                            }
                            required
                        />
                    </FormControl>
                    <Grid container spacing={1}>
                        <Grid item xs={6}>
                            <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                                <InputLabel>Country</InputLabel>
                                <Select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                                    {contries.map((country) => (
                                        <MenuItem key={country.isoCode} value={country.isoCode}>
                                            {country.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        {selectedCountry ? (
                            <Grid item xs={6}>
                                <FormControl variant="standard" defaultValue='' fullWidth sx={{ m: 1 }}>
                                    <InputLabel>State</InputLabel>
                                    <Select value={selectedState} onChange={(e) => setSelectedState(e.target.value)}>
                                        {states.map((state) => (
                                            <MenuItem key={state.isoCode} value={state.name}>
                                                {state.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        ) : null}
                    </Grid>
                    <Grid container justifyContent={'center'}>
                        <Button
                            disabled={selectedState ? false : true}
                            variant="contained"
                            onClick={shippingSubmit}
                            sx={{ color: teal[50], bgcolor: teal[500], m: 1 }}
                        >
                            Continue
                        </Button>
                    </Grid>
                </Paper>
            </Grid>
        </Container>
    );
};

export default Shipping;