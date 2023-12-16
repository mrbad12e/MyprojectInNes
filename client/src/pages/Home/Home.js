import React from 'react';
import Categories from '../../components/Category/Categories';
import Products from '../../components/Product/Products';
import { Container } from '@mui/material'
import MySlider from '../../components/Slider/Slider';

const Home = () => {
    return (
        <Container maxWidth='xl'>
            <MySlider/>
            <Categories />
            <Products />
        </Container>
    );
};

export default Home;
