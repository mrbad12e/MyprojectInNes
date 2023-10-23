import axios from 'axios';

export const getProduct =
    (keyword = '', currentPage = 1) =>
    async (dispatch) => {
        try {
            dispatch({ type: 'ALL_PRODUCT_REQUEST' });
            // let link = '/api/product/products'
            let link = `/admin/products?keyword=${keyword}&page=${currentPage}`;
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
        const { data } = await axios.get(`/admin/product/${id}`)
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

export const updateProduct = (id, form) => async (dispatch) => {
    try {
        dispatch({ type: 'UPDATE_PRODUCT_REQUEST' })
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { data } = await axios.put(`/admin/product/${id}`, form, { config })
        dispatch({ type: 'UPDATE_PRODUCT_SUCCESS', payload: data.updatedProduct })
    } catch (error) {
        dispatch({ type: 'UPDATE_PRODUCT_FAIL', payload: error.response.data.message })
    }
}