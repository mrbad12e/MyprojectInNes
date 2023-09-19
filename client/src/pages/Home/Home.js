import React from 'react';
import Categories from '../../components/Category/Categories';
import Products from '../../components/Product/Products';
// import Slider from '../../components/Slider/Slider';

const Home = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {/* <Slider /> */}
            <Categories />
            <Products />
        </div>
    );
};

export default Home;
