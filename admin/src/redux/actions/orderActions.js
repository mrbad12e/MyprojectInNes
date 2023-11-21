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

export const updateOrderDetail = (id, status) => async (dispatch) => {
    try {
        dispatch({ type: 'UPDATE_ORDER_REQUEST' })
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data  } = await axios.put(`/admin/order/${id}`, { status }, { config })
        dispatch({ type: 'UPDATE_ORDER_SUCCESS', payload: data })
    } catch (error) {
        dispatch({ type: 'UPDATE_ORDER_FAIL', payload: error.response.data.message })
    }
};

export const deleteOrder = (id) => async (dispatch) =>{
    try {
        dispatch({ type: 'DELETE_ORDER_REQUEST' })
        const { data } = await axios.delete(`/admin/order/${id}`)
        dispatch({ type: 'DELETE_ORDER_SUCCESS', payload: data })
    } catch (error) {
        dispatch({ type: 'DELETE_ORDER_FAIL', payload: error.response.data.message })
    }
};

export const getAllReturns = () => async (dispatch) => {
    try {
        dispatch({ type: 'ALL_RETURNS_REQUEST' })
        const { data } = await axios.get('/admin/returns')
        dispatch({ type: 'ALL_RETURNS_SUCCESS', payload: data })
    } catch (error) {
        dispatch({ type: 'ALL_RETURNS_FAIL', payload: error.response.data.message })
    }
}

export const refundOrder = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'REFUND_ORDER_REQUEST' })
        const { data } = await axios.post(`/admin/refund/${id}`)
        dispatch({ type: 'REFUND_ORDER_SUCCESS', payload: data })
    } catch (error) {
        dispatch({ type: 'REFUND_ORDER_FAIL', payload: error.response.data.message })
    }
}