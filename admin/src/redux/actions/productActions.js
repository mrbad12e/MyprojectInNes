import axios from 'axios';

export const getProduct =
    (keyword = '', currentPage = 1) =>
    async (dispatch) => {
        try {
            dispatch({ type: 'ALL_PRODUCT_REQUEST' });
            // let link = '/api/product/products'
            let link = `/admin/product/products?keyword=${keyword}&page=${currentPage}`;
            const { data } = await axios.get(link);
            dispatch({
                type: 'ALL_PRODUCT_SUCCESS',
                payload: data
            });
        } catch (error) {
            dispatch({
                type: 'ALL_PRODUCT_FAIL',
                payload: error.response.data.message
            });
        }
    };
export const getProductDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'PRODUCT_DETAIL_REQUEST' })
        const { data } = await axios.get(`/api/product/product/${id}`)
        dispatch({
            type: 'PRODUCT_DETAIL_SUCCESS',
            payload: data.product
        })
    } catch (error) {
        dispatch({
            type: 'PRODUCT_DETAIL_FAIL',
            payload: error.response.data.message
        });
    }
};