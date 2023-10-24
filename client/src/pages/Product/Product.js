import { Add, Remove } from '@mui/icons-material';
import {
    Box,
    Container,
    FormControl,
    ImageList,
    ImageListItem,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    IconButton,
} from '@mui/material';
import styled from 'styled-components';
import { mobile } from '../../responsive';
import { useParams } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { getProductDetail } from '../../redux/actions/productActions';
import { addItemsToCart } from '../../redux/actions/cartActions';
import Loader from '../../components/Loader/Loader';

const Wrapper = styled.div`
    padding: 50px;
    display: flex;
    ${mobile({ padding: '10px', flexDirection: 'column' })}
`;

const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.color};
    margin: 0px 5px;
    cursor: pointer;
    border: 5px solid lightgrey;
`;

const Amount = styled.span`
    width: 36px;
    height: 36px;
    border-radius: 10px;
    border: 1px solid teal;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
    font-weight: 700;
    cursor: auto;
`;

const Button = styled.button`
    padding: 15px;
    border: 2px solid teal;
    background-color: white;
    cursor: pointer;
    font-weight: 500;
    &:hover {
        background-color: #f8f4f4;
    }
`;

const Product = () => {
    const backend_url = process.env.BACKEND_URL
    const { id } = useParams();
    const dispatch = useDispatch();

    const { product, isFetching, error } = useSelector((state) => state.productDetail);
    const [quantity, setQuantity] = useState(1);
    const increaseQuantity = () => {
        if (product.Stock <= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
    };

    const decreaseQuantity = () => {
        if (1 >= quantity) return;

        const qty = quantity - 1;
        setQuantity(qty);
    };

    const handleAddToCart = () => {
        dispatch(addItemsToCart(id, quantity));
    };
    useEffect(() => {
        if (error) console.log(error);

        dispatch(getProductDetail(id));
    }, [dispatch, id, error]);
    return (
        <Fragment>
            {isFetching ? (
                <Loader />
            ) : (
                <Container>
                    <Wrapper>
                        <Container>
                            <ImageList cols={1} sx={{ flex: '1' }}>
                                {product.img.slice(0, 2).map((img) => (
                                    <ImageListItem key={img}>
                                        <img src={`${backend_url}/${img.replace(/\\/g, '/')}`} alt="" />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </Container>
                        <Container>
                            <Typography variant="h4" py={2}>
                                {product.title}
                            </Typography>
                            <Typography variant="h5" py={2}>
                                {product.descrip}
                            </Typography>
                            <Typography variant="h5" py={2}>
                                $ {product.price}
                            </Typography>
                            <Box display={'flex'} flexDirection={'row'} py={2} alignItems={'center'} paddingY={2}>
                                <Box width="50%" display={'flex'} flexDirection={'row'} alignItems={'center'}>
                                    <Typography fontSize={20} fontWeight={200}>
                                        Color
                                    </Typography>
                                    {product.color && product.color.map((c) => <FilterColor color={c} key={c} />)}
                                </Box>
                                <Box width="50%">
                                    <FormControl sx={{ width: 200 }}>
                                        <InputLabel>Size</InputLabel>
                                        <Select label="Size" displayEmpty defaultValue={''}>
                                            {product.size.map((s, index) => (
                                                <MenuItem value={s} key={index}>
                                                    {s}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                            <Box display={'flex'} flexDirection={'row'} alignItems={'center'} pt={2}>
                                <Box width="50%" display={'flex'} flexDirection={'row'} alignItems={'center'}>
                                    <IconButton onClick={decreaseQuantity}>
                                        <Remove />
                                    </IconButton>
                                    <Amount>{quantity}</Amount>
                                    <IconButton onClick={increaseQuantity}>
                                        <Add />
                                    </IconButton>
                                </Box>
                                <Button onClick={handleAddToCart}>ADD TO CART</Button>
                            </Box>
                        </Container>
                    </Wrapper>
                </Container>
            )}
        </Fragment>
    );
};

export default Product;
