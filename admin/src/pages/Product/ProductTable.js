import { Button, Grid, Link, Pagination, Paper, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Title } from '../../components/Title/Title';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import { Products } from './Products';
import { getProduct } from '../../redux/actions/productActions';
import { Add } from '@mui/icons-material';
export const ProductTable = () => {
    const dispatch = useDispatch();
    const { keyword } = useParams();
    const [currentPage, setCurrentPage] = useState(1);

    const { products, isFetching, error, resultPerPage, filteredProductsCount } = useSelector(
        (state) => state.products
    );
    const handlePageChange = (e, p) => setCurrentPage(p);
    useEffect(() => {
        if (error) console.log(error);
        dispatch(getProduct(keyword, currentPage));
    }, [dispatch, keyword, currentPage, error]);

    let count = filteredProductsCount;
    let countPages = Math.ceil(count / resultPerPage);
    return (
        <Products>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Grid item display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
                        <Title>Products</Title>
                        <Button variant='contained' color='error' href='/product/create'>Add product<Add/></Button>
                    </Grid>
                    {isFetching ? (
                        <Loader />
                    ) : (
                        <>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Index</TableCell>
                                        <TableCell>Title</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {products ?.map((product, index) => (
                                        <TableRow key={product._id}>
                                            <TableCell>{index + 1}</TableCell>
                                            <TableCell>
                                                <Link color={'primary'} href={`/product/${product._id}`}>
                                                    {product.title}
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <Pagination
                                count={countPages}
                                page={currentPage}
                                variant="outlined"
                                color="primary"
                                onChange={handlePageChange}
                                sx={{ alignSelf: 'center', mt: 2 }}
                            />
                        </>
                    )}
                </Paper>
            </Grid>
        </Products>
    );
};
