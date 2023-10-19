import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: 'LOGIN_REQUEST' });
        const config = { headers: { 'Content-Type': 'application/json' } };

        const { data } = await axios.post('/admin/login', { email, password }, { config });
        dispatch({ type: 'LOGIN_SUCCESS', payload: data.user });
    } catch (error) {
        dispatch({ type: 'LOGIN_FAIL', payload: error.response.data.message });
    }
};

export const logout = () => async (dispatch) => {
    try {
        await axios.get('/admin/users/logout');
        dispatch({ type: 'LOGOUT_SUCCESS' });
    } catch (error) {
        dispatch({ type: 'LOGOUT_FAIL', payload: error.response.data.message });
    }
};

export const updatePassword = (form) => async (dispatch) => {
    try {
        dispatch({ type: 'UPDATE_PASSWORD_REQUEST' });
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.put('/api/users/password/update', form, { config });

        dispatch({ type: 'UPDATE_PASSWORD_SUCCESS', payload: data.success });
    } catch (error) {
        dispatch({ type: 'UPDATE_PASSWORD_FAIL', payload: error.response.data.message });
    }
};

export const forgotPassword = (email) => async (dispatch) => {
    try {
        dispatch({ type: 'FORGOT_PASSWORD_REQUEST' });
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.post('/api/users/password/forgot', {email}, { config });
        dispatch({ type: 'FORGOT_PASSWORD_SUCCESS', payload: data.message });
    } catch (error) {
        dispatch({ type: 'FORGOT_PASSWORD_FAIL', payload: error.response.data.message });
    }
};

export const resetPassword = (token, password, confirmPassword) => async (dispatch) => {
    try {
        dispatch({ type: 'RESET_PASSWORD_REQUEST' });
        const config = { headers: { 'Content-Type': 'application/json' } };
        const { data } = await axios.put(`/api/users/password/reset/${token}`, {password, confirmPassword}, { config });

        dispatch({ type: 'RESET_PASSWORD_SUCCESS', payload: data.message });
    } catch (error) {
        dispatch({ type: 'RESET_PASSWORD_FAIL', payload: error.response.data.message });
    }
};

export const getAllUsers = (keyword = '', currentPage = 1) => async (dispatch) => {
    try {
        dispatch({ type: 'ALL_USER_REQUEST' })
        let link = `/admin/users?keyword=${keyword}&page=${currentPage}`
        const { data } = await axios.get(link)
        dispatch({ type: 'ALL_USERS_SUCCESS', payload: data })
    } catch (error) {
        dispatch({ type: 'ALL_USERS_FAIL', payload: error.response.data.message })
    }
}

export const getOneUser = (id) => async (distpatch) => {
    try {
        distpatch({ type: 'ONE_USER_REQUEST' })
        const { data } = await axios.get(`/admin/user/${id}`)
        distpatch({ type: 'ONE_USER_SUCCESS', payload: data.user })
    } catch (error) {
        distpatch({ type: 'ONE_USER_FAIL', payload: error.response.data.message })
    }
}
export const updateOneUser = (id, form) => async (dispatch) => {
    try {
        dispatch({ type: 'UPDATE_USER_REQUEST' })
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { data } = await axios.put(`/admin/user/${id}`, form , { config });
        console.log(data);
        dispatch({ type: 'UPDATE_USER_SUCCESS', payload: data.user })
    } catch (error) {
        dispatch({ type: 'UPDATE_USER_FAIL', payload: error.response.data.message })
        console.log(error);
    }
}