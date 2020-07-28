import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART,
    GET_CART_ITEMS_USER,
    REMOVE_ITEM_FROM_CART,
    ON_SUCCESS_BUY_USER,
    UPDATE_DATA,
    CLEAR_UPDATE_USER,
} from "../actions/types";

export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return { ...state, loginSuccess: action.payload };
        case REGISTER_USER:
            return { ...state, register: action.payload };
        case AUTH_USER:
            return { ...state, userData: action.payload };
        case LOGOUT_USER:
            return { ...state };
        case ADD_TO_CART:
            return { ...state, userData: { ...state.userData, cart: action.payload } };
        case GET_CART_ITEMS_USER:
            return { ...state, cartDetail: action.payload.product };
        case REMOVE_ITEM_FROM_CART:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    cart: action.payload.cart,
                },
                cartDetail: action.payload.cartDetail,
            };
        case ON_SUCCESS_BUY_USER:
            return {
                ...state,
                successBuy: action.payload.success,
                userData: {
                    ...state.userData,
                    cart: action.payload.cart,
                },
                cartDetail: action.payload.cartDetail,
            };
        case UPDATE_DATA:
            return {
                ...state,
                updateUser: action.payload,
            };
        case CLEAR_UPDATE_USER:
            return {
                ...state,
                updateUser: action.payload,
            };
        default:
            return state;
    }
}
