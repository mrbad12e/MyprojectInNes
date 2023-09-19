import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: 'LOGIN_REQUEST' });
        const config = { headers: { 'Content-Type': 'application/json' } };

        const { data } = await axios.post('/api/users/login', { email, password }, { config });
        dispatch({ type: 'LOGIN_SUCCESS', payload: data.user });
    } catch (error) {
        dispatch({ type: 'LOGIN_FAIL', payload: error.response.data.message });
    }
};

export const register = (username, email, password) => async (dispatch) => {
    try {
        dispatch({ type: 'REGISTER_USER_REQUEST' });
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { data } = await axios.post('/api/users/register', { username, email, password }, { config });

        dispatch({ type: 'REGISTER_USER_SUCCESS', payload: data.user });
    } catch (error) {
        dispatch({ type: 'REGISTER_USER_FAIL', payload: error.response.data.message });
    }
};

export const addProfile = (form) => async (dispatch) =>{
    try {
        dispatch({ type: 'ADD_PROFILE_REQUEST' })
        console.log(form);
        const config = { headers: { 'Content-Type': 'multipart/form-data' } };
        const { data } = await axios.post('/api/users/me/profile/add', form , {config})

        dispatch({ type: 'ADD_PROFILE_SUCCESS', payload: data.message })
    } catch (error) {
        dispatch({ type: 'ADD_PROFILE_FAIL', payload: error.message });
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: 'LOAD_USER_REQUEST' });

        const { data } = await axios.get('/api/users/me');

        dispatch({ type: 'LOAD_USER_SUCCESS', payload: data.user });
    } catch (error) {
        dispatch({ type: 'LOAD_USER_FAIL', payload: error.response.data.message });
    }
};

export const logout = () => async (dispatch) => {
    try {
        await axios.get('/api/users/logout');
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
