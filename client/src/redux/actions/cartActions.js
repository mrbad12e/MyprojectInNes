import axios from "axios"

export const addItemsToCart = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/product/product/${id}`)
    dispatch({
        type: 'ADD_TO_CART',
        payload: {
            product: data.product._id,
            img: data.product.img[0],
            title: data.product.title,
            price: data.product.price,
            stock: data.product.Stock,
            quantity
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeItemsFromCart = id => async (dispatch, getState) =>{
    dispatch({ type: 'REMOVE_CART_ITEM', payload: id })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch({
        type: 'SAVE_SHIPPING_INFO', payload: data
    })
    localStorage.setItem('shippingInfo', JSON.stringify(data))
}
export const clearCart = () => dispatch => {
    dispatch({
        type: 'CLEAR_CART_ITEMS'
    });

    localStorage.removeItem('cartItems');
};

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: 'CLEAR_ERRORS' })
}