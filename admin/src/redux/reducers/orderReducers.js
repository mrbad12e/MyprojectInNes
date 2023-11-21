export const recentOrderReducers = (state = { recentOrders: [] }, action) => {
    switch (action.type) {
        case 'RECENT_ORDER_REQUEST':
            return { isFetching: true };
        case 'RECENT_ORDER_SUCCESS':
            return {
                isFetching: false,
                recentOrders: action.payload.orders,
                ordersCount: action.payload.ordersCount,
            };
        case 'RECENT_ORDER_FAIL':
            return { isFetching: false, error: action.payload };
        default:
            return state;
    }
};

export const allOrdersReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case 'ALL_ORDERS_REQUEST':
            return { isFetching: true }
        case 'ALL_ORDERS_SUCCESS':
            return {
                isFetching: false,
                orders: action.payload.orders,
                filteredOrdersCount: action.payload.filteredOrdersCount,
                totalAmount: action.payload.totalAmount,
                resultPerPage: action.payload.resultPerPage,
            }
        case 'ALL_ORDERS_SUCCESS':
            return{
                isFetching: false,
                error: action.payload
            }
        default:
            return state
    }
}

export const orderDetailReducer = (state = { order: {} }, action) => {
    switch (action.type) {
        case 'ORDER_DETAIL_REQUEST':
        case 'UPDATE_ORDER_REQUEST':
        case 'DELETE_ORDER_REQUEST':
            return { isFetching: true, ...state }
        case 'ORDER_DETAIL_SUCCESS':
        case 'UPDATE_ORDER_SUCCESS':
        case 'DELETE_ORDER_SUCCESS':
            return { isFetching: false, order: action.payload.order }
        case 'ORDER_DETAIL_FAIL':
        case 'UPDATE_ORDER_FAIL':
        case 'DELETE_ORDER_FAIL':
            return { isFetching: false, error: action.payload }
        case 'DELETE_ORDER_RESET':
            return { isFetching: false, order: {} }
        default:
            return state
    }
}

export const allReturnsReducer = (state = { returns: [] }, action) => {
    switch (action.type) {
        case 'ALL_RETURNS_REQUEST':
            return { isFetching: true, ...state }
        case 'ALL_RETURNS_SUCCESS':
            return {
                isFetching: false,
                returns: action.payload.returns,
                returnsCount: action.payload.returnsCount,
                filteredReturnsCount: action.payload.filteredReturnsCount,
                resultPerPage: action.payload.resultPerPage,
            }
        case 'ALL_RETURNS_FAIL':
            return { isFetching: false, error: action.payload }
        default:
            return state
    }
}

export const refundOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case 'REFUND_ORDER_REQUEST':
            return { isFetching: true, ...state }
        case 'REFUND_ORDER_SUCCESS':
            return { isFetching: false, success: action.payload }
        case 'REFUND_ORDER_FAIL':
            return { isFetching: false, error: action.payload }
        case 'REFUND_ORDER_RESET':
            return {}
        default:
            return state
    }
}