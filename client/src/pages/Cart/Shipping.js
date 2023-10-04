import { LocationCity, Phone, Home, PinDrop, Public, TransferWithinAStation } from '@mui/icons-material';
import { Country, State } from 'country-state-city';
import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { saveShippingInfo } from '../../redux/actions/cartActions';
import CheckoutSteps from './CheckoutSteps';
import {
    Box,
    Container,
    Typography,
    Input,
    InputLabel,
    FormControl,
    InputAdornment,
    Select,
    MenuItem,
    Button,
} from '@mui/material';

const Shipping = () => {
    const dispatch = useDispatch();
    const { shippingInfo } = useSelector((state) => state.cart);
    const navigate = useNavigate();

    const [address, setAddress] = useState(shippingInfo.address);
    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [phoneNumber, setPhoneNumber] = useState(shippingInfo.phoneNumber);

    const shippingSubmit = (e) => {
        e.preventDefault();

        if (phoneNumber.length < 10 || phoneNumber.length > 10) {
            toast.success('Phone Number should be 10 digits long');
            return;
        }
        dispatch(saveShippingInfo({ address, city, state, country, pinCode, phoneNumber }));
        navigate('/cart/checkout/confirm');
    };

    return (
        <Fragment>
            <CheckoutSteps activeStep={0} />

            <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', my: '24px' }}>
                <Typography variant="h3">Shipping Details</Typography>

                <form encType="multipart/form-data" onSubmit={shippingSubmit} style={{}}>
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
                        <InputLabel>Enter your city</InputLabel>
                        <Input
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            endAdornment={
                                <InputAdornment position="start">
                                    <LocationCity />
                                </InputAdornment>
                            }
                            required
                        />
                    </FormControl>
                    <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                        <InputLabel>PinCode</InputLabel>
                        <Input
                            value={pinCode}
                            onChange={(e) => setPinCode(e.target.value)}
                            endAdornment={
                                <InputAdornment position="start">
                                    <PinDrop />
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
                    <Box display={'flex'} mb={2}>
                        <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                            <InputLabel>Country</InputLabel>
                            <Select required value={country} onChange={(e) => setCountry(e.target.value)}>
                                {Country &&
                                    Country.getAllCountries().map((item) => (
                                        <MenuItem key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                        <FormControl variant="standard" fullWidth sx={{ m: 1 }}>
                            <InputLabel>State</InputLabel>
                            <Select required value={state} onChange={(e) => setState(e.target.value)}>
                                {State &&
                                    State.getStatesOfCountry(country).map((item) => (
                                        <MenuItem key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box display={'flex'} justifyContent={'center'}>
                        <Button type="submit" disabled={state ? false : true} variant="contained">
                            Continue
                        </Button>
                    </Box>
                </form>
            </Container>
        </Fragment>
    );
};

export default Shipping;
