import {
    USER_LOADED,
    USER_LOADING,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    NAME_UPDATE_SUCCESS,
    NAME_UPDATE_FAIL,
    PASSWORD_UPDATE_SUCCESS,
    PASSWORD_UPDATE_FAIL
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null,
    userType: null,
    name: null,
    password: null,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
                userType: action.payload
            };
        case PASSWORD_UPDATE_SUCCESS:
            localStorage.setItem(action.payload.token);
            return {
                ...state,
                user: state.user.filter(user => user._id == action.payload)
            };
        case NAME_UPDATE_SUCCESS:
            localStorage.setItem(action.payload.token);
            return {
                ...state,
                user: state.user.filter(user => user._id == action.payload)
            };
        case PASSWORD_UPDATE_FAIL:
        case NAME_UPDATE_FAIL:
            return {
                ...state
            }
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            };
        default:
            return state;
    }
}