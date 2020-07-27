import axios from "axios";

import { USER_SERVER, PRODUCT_SERVER } from "../components/utils/misc";
import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER,
    LOGOUT_USER,
    ADD_TO_CART,
    GET_CART_ITEMS_USER,
    REMOVE_ITEM_FROM_CART,
    ON_SUCCESS_BUY_USER,
} from "./types";

export function loginUser(dataToSubmit) {
    const request = axios.post(`${USER_SERVER}/login`, dataToSubmit).then((response) => {
        return response.data;
    });
    return {
        type: LOGIN_USER,
        payload: request,
    };
}

export function registerUser(dataToSubmit) {
    const requset = axios
        .post(`${USER_SERVER}/register`, dataToSubmit)
        .then((response) => {
            return response.data;
        });
    return {
        type: REGISTER_USER,
        payload: requset,
    };
}

export function auth() {
    const request = axios.get(`${USER_SERVER}/auth`).then((response) => {
        return response.data;
    });
    return {
        type: AUTH_USER,
        payload: request,
    };
}

export function logoutUser() {
    const request = axios.get(`${USER_SERVER}/logout`).then((response) => {
        return response.data;
    });
    return {
        type: LOGOUT_USER,
        payload: request,
    };
}

export function addToCart(_id) {
    const request = axios.post(`${USER_SERVER}/add-to-cart`, { _id }).then((response) => {
        return response.data;
    });
    return {
        type: ADD_TO_CART,
        payload: request,
    };
}

export function getCartItems(cartItems, userCart) {
    const request = axios
        .get(`${PRODUCT_SERVER}/article_by_id?id=${cartItems}&type=array`)
        .then((response) => {
            userCart.forEach((item) => {
                response.data.product.forEach((k, i) => {
                    if (item._id === k._id) {
                        response.data.product[i].quantity = item.quantity;
                    }
                });
            });
            return response.data;
        });

    return {
        type: GET_CART_ITEMS_USER,
        payload: request,
    };
}

export function removeItem(_id) {
    const request = axios
        .post(`${USER_SERVER}/remove-from-cart`, { _id })
        .then((response) => {
            return response.data;
        });
    return {
        type: REMOVE_ITEM_FROM_CART,
        payload: request,
    };
}

export function onSuccessBuy(data) {
    const request = axios.post(`${USER_SERVER}/success-buy`, data).then((response) => {
        return response.data;
    });

    return {
        type: ON_SUCCESS_BUY_USER,
        payload: request,
    };
}
