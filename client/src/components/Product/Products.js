import Product from './Product';
import { useEffect } from 'react';
import './products.css';
import { getProduct } from '../../redux/actions/productActions';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Loader/Loader'
import { useNavigate } from 'react-router-dom';
import { Button, Container } from '@mui/material';
const Products = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const { isFetching, error, products} = useSelector(
        (state) => state.products
    );
    useEffect(() => {
        if (error) console.log(error);
        dispatch(getProduct());
    }, [dispatch, error]);
    const handleStoreClick = () => navigate('/store')
    return (
        <>
            {isFetching ? <Loader/> :
            <>
                <>
                    <div style={{display: 'block', paddingLeft: '24px', paddingRight: '24px'}}>
                        <h1 className='featured-products'>Featured Products</h1>
                        <Button variant="outlined" size="large" sx={{ float: 'right' }}  onClick={handleStoreClick}>Store</Button>
                    </div>
                </>
                <Container maxWidth={false} sx={{ display: 'inline-flex', flexWrap: 'wrap', justifyContent: 'center'}}>
                    {products && products.map((item) => <Product item={item} key={item._id} />)}
                </Container>
            </>
            }
        </>
    );
};

export default Products;
