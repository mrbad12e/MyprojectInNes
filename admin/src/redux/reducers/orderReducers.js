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
                orders: action.payload
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
