import { Add, Remove } from '@mui/icons-material';
import {
    Container,
    FormControl,
    ImageList,
    ImageListItem,
    InputLabel,
    MenuItem,
    Select,
    Typography,
    IconButton,
    Grid,
    Button,
    TextField,
} from '@mui/material';
import { teal } from '@mui/material/colors';
import { useParams } from 'react-router-dom';
import { useState, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProductDetail } from '../../redux/actions/productActions';
import { addItemsToCart } from '../../redux/actions/cartActions';
import Loader from '../../components/Loader/Loader';
import { toast } from 'react-toastify';

const Product = () => {
    const backend_url = process.env.BACKEND_URL;
    const { id } = useParams();
    const dispatch = useDispatch();

    const { product, isFetching, error } = useSelector((state) => state.productDetail);
    const [quantity, setQuantity] = useState(1);
    const [color, setColor] = useState('');
    const [size, setSize] = useState('');
    const [disable, setDisable] = useState(true);

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
    const handleSizeChange = (e) => {
        setSize(e.target.value);
        if (e.target.value && color) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    };
    const handleColorChange = (e) => {
        setColor(e.target.value)
        if (e.target.value && size) {
            setDisable(false);
        } else {
            setDisable(true);
        }
    }
    const handleAddToCart = () => {
        dispatch(addItemsToCart(id, quantity));
    };
    useEffect(() => {
        if (error) {
            toast.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProductDetail(id));
    }, [dispatch, id, error]);
    return (
        <Fragment>
            {isFetching ? (
                <Loader />
            ) : (
                <Container maxWidth="xl">
                    <Grid container mt={5}>
                        <Grid item xs={5}>
                            <ImageList cols={1} sx={{ flex: '1' }}>
                                {product.img.slice(0, 2).map((img) => (
                                    <ImageListItem key={img}>
                                        <img src={`${backend_url}/${img.replace(/\\/g, '/')}`} alt="" />
                                    </ImageListItem>
                                ))}
                            </ImageList>
                        </Grid>

                        <Grid item xs p={3}>
                            <Grid>
                                <Typography variant="h4">{product.title}</Typography>
                                <br />
                                <Typography variant="h5">{product.descrip}</Typography>
                                <br />
                                <Typography variant="h5">$ {product.price}</Typography>
                                <br />
                            </Grid>
                            <Grid>
                                <Grid container>
                                    <FormControl sx={{ width: 200 }}>
                                        <InputLabel>Color</InputLabel>
                                        <Select label="Color" displayEmpty defaultValue={''} onChange={handleColorChange}>
                                            {product.color.map((c, index) => (
                                                <MenuItem value={c} key={index}>
                                                    {c}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <br />
                                <Grid container>
                                    <FormControl sx={{ width: 200 }}>
                                        <InputLabel>Size</InputLabel>
                                        <Select label="Size" displayEmpty defaultValue={''} onChange={handleSizeChange}>
                                            {product.size.map((s, index) => (
                                                <MenuItem value={s} key={index}>
                                                    {s}
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <br />
                            <Grid>
                                <Grid container>
                                    <IconButton onClick={decreaseQuantity}>
                                        <Remove />
                                    </IconButton>
                                    <TextField value={quantity} InputProps={{ readOnly: true }} />
                                    <IconButton onClick={increaseQuantity}>
                                        <Add />
                                    </IconButton>
                                </Grid>
                                <br />
                                <Grid container>
                                    <Button
                                        onClick={handleAddToCart}
                                        disabled={disable}
                                        variant="outlined"
                                        sx={{ borderColor: teal[500], color: teal[500] }}
                                    >
                                        ADD TO CART
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Container>
            )}
        </Fragment>
    );
};

export default Product;
