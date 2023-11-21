import axios from "axios";

export const createOrder = (order) =>  async (dispatch) => {
    try {
        dispatch({ type: 'CREATE_ORDER_REQUEST' })
        const config = { headers:  { 'Content-Type': 'application/json' } }
        const { data } = await axios.post('/api/order/order/new', order, config)
        dispatch({ type: 'CREATE_ORDER_SUCCESS', payload: data })
    } catch (error) {
        dispatch({
            type: 'CREATE_ORDER_FAIL',
            payload: error
        })
    }
}

export const myOrders = () => async (dispatch) => {
    try {
        dispatch({ type: 'MY_ORDERS_REQUEST' })
        const { data } = await axios.get('/api/order/orders/me')
        dispatch({ type: 'MY_ORDERS_SUCCESS', payload: data })
    } catch (error) {
        dispatch({
            type: 'MY_ORDERS_FAIL',
            payload: error.response.data.message
        })
    }
}

export const getOrderDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'ORDER_DETAIL_REQUEST' })
        const { data } = await axios.get(`/api/order/order/${id}`)
        dispatch({ type: 'ORDER_DETAIL_SUCCESS', payload: data.order })
    } catch (error) {
        dispatch({
            type: 'ORDER_DETAIL_FAIL',
            payload: error.response.data.message
        })
    }
}

export const returnRequest = (id, returnReason) => async (dispatch) => {
    try {
        dispatch({ type: 'REQUEST_RETURN_REQUEST' })
        const config = { headers:  { 'Content-Type': 'application/json' } }
        const { data } = await axios.post(`/api/order/order/${id}`, { returnReason }, {config})

        dispatch({ type: 'REQUEST_RETURN_SUCCESS', payload: data.order })
    } catch (error) {
        dispatch({
            type: 'REQUEST_RETURN_FAIL',
            payload: error.response.data.message
        })
    }
}

export const confirmOrder = (id) => async (dispatch) => {
    try {
        dispatch({ type: 'CONFIRM_ORDER_REQUEST' })
        const { data } = await axios.put(`/api/order/order/${id}`)
        dispatch({ type: 'CONFIRM_ORDER_SUCCESS', payload: data.order })
    } catch (error) {
        dispatch({
            type: 'CONFIRM_ORDER_FAIL',
            payload: error.response.data.message
        })
    }
}