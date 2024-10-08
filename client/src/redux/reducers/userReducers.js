export const userReducers = (state = { user: {} }, action) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
        case 'REGISTER_USER_REQUEST':
            return {
                isFetching: true,
                isAuthenticated: false,
            };
        case 'LOAD_USER_REQUEST':
        case 'ADD_PROFILE_REQUEST':
        case 'UPDATE_PASSWORD_REQUEST':
            return {
                ...state,
                isFetching: true,
            };
        case 'ADD_PROFILE_SUCCESS':
        case 'UPDATE_PASSWORD_SUCCESS':
            return {
                ...state,
                isFetching: false,
                isUpdated: action.payload,
            };
        case 'ADD_PROFILE_FAIL':
        case 'UPDATE_PASSWORD_FAIL':
            return {
                ...state,
                isFetching: false,
                error: action.payload,
            };
        case 'UPDATE_PASSWORD_RESET':
            return {
                ...state,
                isUpdated: false,
            };
        case 'LOGIN_SUCCESS':
        case 'REGISTER_USER_SUCCESS':
        case 'LOAD_USER_SUCCESS':
            return {
                ...state,
                isFetching: false,
                isAuthenticated: true,
                user: action.payload,
            };
        case 'LOGOUT_SUCCESS':
            return {
                isFetching: false,
                isAuthenticated: false,
                user: null,
            };
        case 'LOGIN_FAIL':
        case 'REGISTER_USER_FAIL':
            return {
                ...state,
                isFetching: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        case 'LOAD_USER_FAIL':
            return {
                isFetching: false,
                isAuthenticated: false,
                user: null,
                error: action.payload,
            };
        case 'LOGOUT_FAIL':
            return {
                ...state,
                isFetching: false,
                error: action.payload,
            };
        case 'CLEAR_ERRORS':
            return { ...state, error: null };
        default:
            return state;
    }
};

export const forgotPasswordReducer = (state = {}, action) => {
    switch (action.type) {
        case 'FORGOT_PASSWORD_REQUEST':
        case 'RESET_PASSWORD_REQUEST':
            return {
                ...state,
                isFetching: true,
                error: null,
            };
        case 'FORGOT_PASSWORD_SUCCESS':
            return {
                ...state,
                isFetching: false,
                message: action.payload,
            };
        case 'RESET_PASSWORD_SUCCESS':
            return {
                ...state,
                isFetching: false,
                success: action.payload,
            };
        case 'FORGOT_PASSWORD_FAIL':
        case 'RESET_PASSWORD_FAIL':
            return {
                ...state,
                isFetching: false,
                error: action.payload,
            };
        case 'CLEAR_ERRORS':
            return { ...state, error: null };
        default:
            return state;
    }
};
