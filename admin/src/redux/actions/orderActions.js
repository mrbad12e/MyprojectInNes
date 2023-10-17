import axios from "axios";

export const recentOrders = () => async (dispatch) => {
    try {
        dispatch({ type: 'RECENT_ORDER_REQUEST' })
        const { data } = await axios.get('/admin/order/recent')
        dispatch({ type: 'RECENT_ORDER_SUCCESS', payload: data })
        
    } catch (error) {
        console.log(error);
        dispatch({ type: 'RECENT_ORDER_FAIL', payload: error.response.data.message })
    }
}