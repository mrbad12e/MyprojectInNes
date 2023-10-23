export const productsReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case 'ALL_PRODUCT_REQUEST':
            return { isFetching: true, products: [] }
        case 'ALL_PRODUCT_SUCCESS':
            return{
                isFetching: false, products: action.payload.products,
                productsCount: action.payload.productsCount,
                resultPerPage: action.payload.resultPerPage,
                filteredProductsCount: action.payload.filteredProductsCount
            }
        case 'ALL_PRODUCT_FAIL':
            return { isFetching: false, error: action.payload }
        default:
            return state
    }
}

export const productDetailReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case 'PRODUCT_DETAIL_REQUEST':
        case 'UPDATE_PRODUCT_REQUEST':
            return { isFetching: true, ...state }
        case 'PRODUCT_DETAIL_SUCCESS':
        case 'UPDATE_PRODUCT_SUCCESS':
            return { isFetching: false, product: action.payload }
        case 'PRODUCT_DETAIL_FAIL':
        case 'UPDATE_PRODUCT_FAIL':
            return { isFetching: false, error: action.payload }
        default:
            return state
    }
}