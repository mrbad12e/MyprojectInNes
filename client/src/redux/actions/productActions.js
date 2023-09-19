import axios from 'axios';

export const getProduct =
    (keyword = '', currentPage = 1, price = [0, 40000], category, ratings = 0) =>
    async (dispatch) => {
        try {
            dispatch({ type: 'ALL_PRODUCT_REQUEST' });
            // let link = '/api/product/products'
            let link = `/api/product/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
            if (category) {
                link = `/api/product/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&categories=${category}`;
            }
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
        console.log(id);
        const { data } = await axios.get(`/api/product/product/${id}`)
        console.log(data);
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

export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: 'NEW_REVIEW_REQUEST' })
        const config = { headers:  { 'Content-Type': 'application/json' } }
        const { data } = await axios.put(`/api/product/review`, reviewData, {config})
        dispatch({
            type: 'NEW_REVIEW_SUCCESS',
            payload: data.success
        })
    } catch (error) {
        dispatch({
            type: 'NEW_REVIEW_FAIL',
            payload: error.response.data.message
        });
    }
}

export const getAllReviews = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'ALL_REVIEW_REQUEST' })
        const { data } = await axios.get(`/api/product/reviews?id=${id}`)
        dispatch({
            type: 'ALL_REVIEW_SUCCESS',
            payload: data.reviews
        })
    } catch (error) {
        dispatch({
            type: 'ALL_REVIEW_FAIL',
            payload: error.response.data.message
        });
    }
}
