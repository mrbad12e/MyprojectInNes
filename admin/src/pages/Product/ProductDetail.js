import { Title } from '../../components/Title/Title';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../components/Loader/Loader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CameraAlt, RemoveCircle } from '@mui/icons-material';
import { Products } from './Products';
import { getProductDetail, updateProduct } from '../../redux/actions/productActions';
import { InputTags } from '../../components/Tag/InputTags';
import { ImgList } from '../../components/Image/List';
import { VisuallyHiddenInput } from '../../components/VisuallyHiddenInput';

const myForm = new FormData()

function addArray(data, field) {
    if (data.length <= 0) myForm.set(`${field}`, [])
    data.forEach((vdata, index) => {
        myForm.append(`${field}[${index}]`, vdata)
    });
}

export const ProductDetail = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { product, isFetching, error } = useSelector((state) => state.productDetail);

    const [name, setName] = useState('');
    const [stock, setStock] = useState(0);
    const [descrip, setDescrip] = useState('');
    const [categories, setCategories] = useState([]);
    const [colors, setColors] = useState([]);
    const [sizes, setSizes] = useState([]);

    const [images, setImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    useEffect(() => {
        if (error) console.log(error);
        dispatch(getProductDetail(id));
    }, [dispatch, error, id]);

    useEffect(() => {
        if (product) {
            setCategories(product.categories);
            setName(product.title);
            setStock(product.Stock);
            setDescrip(product.descrip);
            setColors(product.color);
            setSizes(product.size);
            setImages(product.img);
            setPreviewImages(product.img);
        }
    }, [product]);
    const handleCatChange = (e, newValue) => {
        if (newValue !== undefined) {
            setCategories(newValue);
        } else setCategories([]);
    };
    const handleColorChange = (e, newValue) => {
        if (newValue !== undefined) {
            setColors(newValue);
        } else setColors([]);
    };
    const handleSizeChange = (e, newValue) => {
        if (newValue !== undefined) {
            setSizes(newValue);
        } else setSizes([]);
    };
    const handleAddImage = (e) => {
        // const newPreviewImages = [...previewImages]
        const file = e.target.files[0];
        if (file) {
            setImages([...images, file]);
            const newPreviewImage = URL.createObjectURL(file);
            setPreviewImages([...previewImages, newPreviewImage]);
        }
    };
    const handleRemoveImage = (index) => {
        const newImages = [...previewImages];
        newImages.splice(index, 1);
        setPreviewImages(newImages);
        setImages(newImages);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        myForm.set('type', 'product');
        myForm.set('title', name)
        myForm.set('descrip', descrip)
        myForm.set('Stock', stock)
        addArray(images, 'images')
        addArray(categories, 'categories')
        addArray(sizes, 'size')
        addArray(colors, 'color')
        dispatch(updateProduct(id, myForm))
    };
    
    return (
        <Products>
            <Grid item md={8}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        m: 2,
                    }}
                >
                    <Title>Product Detail</Title>
                    {isFetching ? (
                        <Loader />
                    ) : (
                        <Grid container columnSpacing={3} rowGap={3}>
                            <Grid container spacing={3} alignItems={'center'}>
                                <Grid item xs>
                                    <Typography align={'center'}>Title</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <TextField
                                        fullWidth
                                        value={name}
                                        variant="outlined"
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} alignItems={'center'}>
                                <Grid item xs>
                                    <Typography align={'center'}>Stock</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <TextField
                                        fullWidth
                                        value={stock}
                                        variant="outlined"
                                        onChange={(e) => setStock(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} alignItems={'center'}>
                                <Grid item xs>
                                    <Typography align={'center'}>Description</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <TextField
                                        multiline
                                        rows={4}
                                        fullWidth
                                        value={descrip}
                                        variant="outlined"
                                        onChange={(e) => setDescrip(e.target.value)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} alignItems={'center'}>
                                <Grid item xs>
                                    <Typography align={'center'}>Categories</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <InputTags
                                        variant={'outlined'}
                                        data={categories}
                                        handleTagChange={handleCatChange}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} alignItems={'center'}>
                                <Grid item xs>
                                    <Typography align={'center'}>Colors</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <InputTags variant={'outlined'} data={colors} handleTagChange={handleColorChange} />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} alignItems={'center'}>
                                <Grid item xs>
                                    <Typography align={'center'}>Sizes</Typography>
                                </Grid>
                                <Grid item xs={9}>
                                    <InputTags variant={'outlined'} data={sizes} handleTagChange={handleSizeChange} />
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Paper>
            </Grid>
            <Grid item md={4}>
                <Paper sx={{ p: 2, m: 2, display: 'flex', alignItems: 'center' }}>
                    {isFetching ? (
                        <Loader />
                    ) : (
                        <Grid container justifyContent={'center'}>
                            <ImgList images={previewImages} deleteFunc={handleRemoveImage} element={<RemoveCircle />} />
                            <Grid container>
                                <Grid item justifyContent={'center'}>
                                    <Button component="label" variant="contained" startIcon={<CameraAlt />}>
                                        Add a picture
                                        <VisuallyHiddenInput type="file" onChange={handleAddImage} />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    )}
                </Paper>
            </Grid>
            <Grid container justifyContent={'center'} sx={{ flexGrow: 1 }}>
                <Grid item>
                    <Button variant="contained" onClick={handleSubmit}>
                        Submit Changes
                    </Button>
                </Grid>
            </Grid>
        </Products>
    );
};
