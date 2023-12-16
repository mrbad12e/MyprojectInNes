export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case 'ALL_PRODUCT_REQUEST':
            return { isFetching: true, products: [] };
        case 'ALL_PRODUCT_SUCCESS':
            return {
                isFetching: false,
                products: action.payload.products,
                productsCount: action.payload.productsCount,
                resultPerPage: action.payload.resultPerPage,
                filteredProductsCount: action.payload.filteredProductsCount,
            };
        case 'ALL_PRODUCT_FAIL':
            return { isFetching: false, error: action.payload };
        case 'CLEAR_ERRORS':
            return { ...state, error: null };
        default:
            return state;
    }
};

export const productDetailReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case 'PRODUCT_DETAIL_REQUEST':
        case 'UPDATE_PRODUCT_REQUEST':
        case 'DELETE_PRODUCT_REQUEST':
            return { isFetching: true, ...state };
        case 'DELETE_PRODUCT_SUCCESS':
            return { isFetching: false, ...state, isDeteled: action.payload };
        case 'PRODUCT_DETAIL_SUCCESS':
        case 'UPDATE_PRODUCT_SUCCESS':
            return { isFetching: false, product: action.payload };
        case 'PRODUCT_DETAIL_FAIL':
        case 'UPDATE_PRODUCT_FAIL':
        case 'DELETE_PRODUCT_FAIL':
            return { isFetching: false, error: action.payload };
        case 'CLEAR_ERRORS':
            return { ...state, error: null };
        default:
            return state;
    }
};

export const newProduct = (state = { product: {} }, action) => {
    switch (action.type) {
        case 'CREATE_PRODUCT_REQUEST':
            return { ...state, isFetching: true };
        case 'CREATE_PRODUCT_SUCCESS':
            return {
                isFetching: false,
                success: action.payload.success,
                product: action.payload.product,
            };
        case 'CREATE_PRODUCT_FAIL':
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case 'CREATE_PRODUCT_RESET':
            return { ...state, success: false };
        case 'CLEAR_ERRORS':
            return { ...state, error: null };
        default:
            return state;
    }
};
