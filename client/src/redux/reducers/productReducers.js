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

export const productDetailReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case 'PRODUCT_DETAIL_REQUEST':
            return { isFetching: true, ...state }
        case 'PRODUCT_DETAIL_SUCCESS':
            return { isFetching: false, product: action.payload }
        case 'PRODUCT_DETAIL_FAIL':
            return { isFetching: false, error: action.payload }
        default:
            return state
    }
}

export const newReviewReducer = (state = {}, action) => {
    switch (action.type) {
        case 'NEW_REVIEW_REQUEST':
            return { isFetching: true, ...state }
        case 'NEW_REVIEW_SUCCESS':
            return { isFetching: false, success: action.payload }
        case 'NEW_REVIEW_FAIL':
            return { isFetching: false, error: action.payload, ...state }
        default:
            return state
    }
}

export const productReviewsReducer = (state = { reviews: [] }, action) => {
    switch (action.type) {
        case 'ALL_REVIEW_REQUEST':
            return { isFetching: true, ...state }
        case 'ALL_REVIEW_SUCCESS':
            return { isFetching: false, reviews: action.payload }
        case 'ALL_REVIEW_FAIL':
            return { isFetching: false, error: action.payload, ...state }
        default:
            return state
    }
}