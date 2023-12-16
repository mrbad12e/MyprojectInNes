import Product from './Product';
import { useEffect } from 'react';
import { clearErrors, getProduct } from '../../redux/actions/productActions';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Grid, ImageList, Typography, useMediaQuery } from '@mui/material';
import { toast } from 'react-toastify';
import { teal } from '@mui/material/colors';
const Products = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isFetching, error, products } = useSelector((state) => state.products);
    const isLargeScreen = useMediaQuery('(min-width:960px)');
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch, error]);
    const handleStoreClick = () => navigate('/store');
    return (
        <>
            {isFetching ? (
                <Loader />
            ) : (
                <Box my={2} p={1}>
                    <Grid container justifyContent={'space-between'}>
                        <Grid item textAlign={'start'}>
                            <Typography variant={isLargeScreen ? 'h3' : 'h5'} fontWeight={500}>
                                Featured Products
                            </Typography>
                        </Grid>
                        <Grid item display={'flex'} justifyItems={'center'} alignItems={'center'}>
                            <Button variant="outlined" onClick={handleStoreClick} sx={{ color: teal[500] }}>
                                Store
                            </Button>
                        </Grid>
                    </Grid>
                    <ImageList cols={isLargeScreen ? 4 : 2}>
                        {products && products.map((item) => <Product key={item._id} item={item} />)}
                    </ImageList>
                </Box>
            )}
        </>
    );
};

export default Products;
