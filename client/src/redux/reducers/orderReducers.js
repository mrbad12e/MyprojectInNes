export const newOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case 'CREATE_ORDER_REQUEST':
            return { isFetching: true, ...state };
        case 'CREATE_ORDER_SUCCESS':
            return { isFetching: false, link: action.payload };
        case 'CREATE_ORDER_FAIL':
            return { isFetching: false, error: action.payload };
        case 'CLEAR_ERRORS':
            return { ...state, error: null };
        default:
            return state;
    }
};

export const myOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case 'MY_ORDERS_REQUEST':
            return { isFetching: true };
        case 'MY_ORDERS_SUCCESS':
            return {
                isFetching: false,
                orders: action.payload.orders,
                filteredOrdersCount: action.payload.filteredOrdersCount,
                resultPerPage: action.payload.resultPerPage,
            };
        case 'MY_ORDERS_FAIL':
            return { isFetching: false, error: action.payload };
        case 'CLEAR_ERRORS':
            return { ...state, error: null };
        default:
            return state;
    }
};

export const orderDetailReducer = (state = { order: {} }, action) => {
    switch (action.type) {
        case 'ORDER_DETAIL_REQUEST':
        case 'CONFIRM_ORDER_REQUEST':
            return { isFetching: true, ...state };
        case 'ORDER_DETAIL_SUCCESS':
        case 'CONFIRM_ORDER_SUCCESS':
            return { isFetching: false, order: action.payload };
        case 'ORDER_DETAIL_FAIL':
        case 'CONFIRM_ORDER_FAIL':
            return { isFetching: false, error: action.payload };
        case 'CLEAR_ERRORS':
            return { ...state, error: null };
        default:
            return state;
    }
};

export const returnRequestReducer = (state = {}, action) => {
    switch (action.type) {
        case 'REQUEST_RETURN_REQUEST':
            return { isFetching: true };
        case 'REQUEST_RETURN_SUCCESS':
            return { isFetching: false, success: true, order: action.payload };
        case 'REQUEST_RETURN_FAIL':
            return { isFetching: false, error: action.payload };
        case 'CLEAR_ERRORS':
            return { ...state, error: null };
        default:
            return state;
    }
};
