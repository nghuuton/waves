import {
    GET_PRODUCTS_BY_ARRIVAL,
    GET_PRODUCTS_BY_SELL,
    GET_WOODS,
    GET_BRANDS,
} from "../actions/types";

export default function (state = {}, action) {
    switch (action.type) {
        case GET_PRODUCTS_BY_ARRIVAL:
            return { ...state, byArrival: action.payload };
        case GET_PRODUCTS_BY_SELL:
            return { ...state, bySell: action.payload };
        case GET_WOODS:
            return { ...state, woods: action.payload };
        case GET_BRANDS:
            return { ...state, brands: action.payload };
        default:
            return state;
    }
}
