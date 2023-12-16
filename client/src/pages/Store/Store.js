import {
    Slider,
    Typography,
    Pagination,
    Button,
    Rating,
    Container,
    Card,
    Radio,
    RadioGroup,
    FormControlLabel,
    ImageList,
    useMediaQuery,
    Paper,
    Grid,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { clearErrors, getProduct } from '../../redux/actions/productActions';
import Product from '../../components/Product/Product';
import Loader from '../../components/Loader/Loader';
import { toast } from 'react-toastify';
import { teal } from '@mui/material/colors';
const categories = ['trending', 'shirts', 'hoodies'];
const heading = {
    borderBottom: '1px solid rgba(0, 0, 0, 0.171)',
    padding: '2vmax',
    color: 'rgba(0, 0, 0, 0.678)',
    margin: '30px',
    width: '15vw',
};

const Store = () => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);
    const [price, setPrice] = useState([0, 40000]);
    const [category, setCategory] = useState('');
    const [ratings, setRatings] = useState(0);

    const [vprice, setvPrice] = useState([0, 40000]);
    const [vcategory, setvCategory] = useState('');
    const [vratings, setvRatings] = useState(0);
    const isLargeScreen = useMediaQuery('(min-width:960px)');
    const { keyword } = useParams();
    const { products, isFetching, error, productsCount, resultPerPage, filteredProductsCount } = useSelector(
        (state) => state.products
    );

    const handlePageChange = (e, p) => {
        setCurrentPage(p);
    };
    const priceHandler = (e, newPrice) => {
        setvPrice(newPrice);
    };
    const ratingsHandler = (e, newRating) => {
        setvRatings(newRating);
    };
    const handleClick = () => {
        setPrice(vprice);
        setRatings(vratings);
        setCategory(vcategory);
    };

    useEffect(() => {
        if (error){
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings));
    }, [dispatch, keyword, currentPage, price, category, ratings, error]);

    let count = filteredProductsCount;
    let countPages = Math.ceil(count / resultPerPage);
    return (
        <Container maxWidth="xl">
            {isFetching ? (
                <Loader />
            ) : (
                <Grid container spacing={1}>
                    <Grid item xs={4} sx={{}}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography fontWeight={700}>Price</Typography>
                            <Slider
                                defaultValue={price}
                                value={vprice}
                                onChange={priceHandler}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                min={0}
                                max={40000}
                                step={10000}
                                sx={{ width: '80%', color: teal[500] }}
                            />
                            <Typography fontWeight={700}>Categories</Typography>
                            <RadioGroup defaultValue={category}>
                                {categories.map((category, index) => (
                                    <FormControlLabel
                                        value={category}
                                        control={<Radio />}
                                        label={category.charAt(0).toUpperCase() + category.slice(1)}
                                        onClick={(e) => setvCategory(category)}
                                        key={index}
                                    />
                                ))}
                            </RadioGroup>
                            <div>
                                <Typography fontWeight={700} >Ratings Above</Typography>
                                <Rating
                                    defaultValue={ratings}
                                    value={vratings}
                                    name="simple-controlled"
                                    onChange={ratingsHandler}
                                />
                            </div>
                            <Button onClick={handleClick}>Apply</Button>
                        </Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Typography textAlign="center" alignSelf="center" variant="h4" sx={heading}>
                            Products
                        </Typography>
                        <ImageList cols={isLargeScreen ? 4 : 2}>
                            {products && products.map((item) => <Product item={item} key={item._id} />)}
                        </ImageList>
                        {resultPerPage < count && (
                            <Pagination
                                count={countPages}
                                page={currentPage}
                                variant="outlined"
                                color="primary"
                                onChange={handlePageChange}
                                sx={{ alignSelf: 'center' }}
                            />
                        )}
                    </Grid>
                </Grid>
            )}
        </Container>
    );
};
export default Store;
