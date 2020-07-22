import axios from "axios";

import { USER_SERVER } from "../components/utils/misc";
import { LOGIN_USER, REGISTER_USER, AUTH_USER } from "./types";

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
