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
