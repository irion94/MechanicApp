import axios from "axios";
import sessionStore from "../Stores/dbData/SessionStore";
import {http} from './ApiUtils'

export const login = async (userData) => {
    return await axios.get(`${http}/users`, {
        params: userData
    }).then((response) => {
        return response.data
    })
};

//TODO: Priority[3] Działa tylko bezpośrednio z przycisku
export const logout = async () => {
    return await axios.get(http).then(() => {
        return sessionStore.setId(null);
    })
};