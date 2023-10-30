import axios from "axios";

export const recentOrders = () => async (dispatch) => {
    try {
        dispatch({ type: 'RECENT_ORDER_REQUEST' })
        const { data } = await axios.get('/admin/order/recent')
        dispatch({ type: 'RECENT_ORDER_SUCCESS', payload: data })
        
    } catch (error) {
        dispatch({ type: 'RECENT_ORDER_FAIL', payload: error.response.data.message })
    }
}

export const getAllOrders = () => async (dispatch) => {
    try {
        dispatch({ type: 'ALL_ORDERS_REQUEST' })
        const { data } = await axios.get('/admin/order/all')
        dispatch({ type: 'ALL_ORDERS_SUCCESS', payload: data })
    } catch (error) {
        dispatch({ type: 'ALL_ORDERS_FAIL', payload: error.response.data.message })
    }
}

export const getOrderDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'ORDER_DETAIL_REQUEST' })
        const { data  } = await axios.get(`/admin/order/${id}`)
        dispatch({ type: 'ORDER_DETAIL_SUCCESS', payload: data })
    } catch (error) {
        dispatch({ type: 'ORDER_DETAIL_FAIL', payload: error.response.data.message })
    }
}