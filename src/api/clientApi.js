import axios from "axios";
import sessionStore from "../Stores/dbData/SessionStore";
import {Alert} from "react-native";
import {http} from './ApiUtils'


export const fetchAllClientData = async () => {
    return await axios.get(`${http}/clients/all/${sessionStore.userId._id}`)
        .then(result => {
            return result.data
        })
}

export const fetchOneClientData = async (params:[]) => {
    params = JSON.stringify(params);
    return await axios.get(`${http}/clients/one/${params}`) //REST
        .then(result => {
            console.log("findOne", result)
            return result.data
        })
};

/**
 * CREATE from SCANNER
 * @param object
 * @returns {Promise<void>}
 */
export const createClient = async(object) => {
    let owner = JSON.stringify(object);
    return await axios.post(`${http}/clients/?args=${owner}`)
        .then(response => {
            return response.data
        })
        .catch(error => Alert.alert('Error' + error));
};

//TODO:
export const updateClient = async(object, value) => {
    let client = JSON.stringify(object);
    let updatedValue = JSON.stringify(value);
    return await axios.post(`${http}/clients/?client=${client}&&vehicle=${updatedValue}`)
        .then(response => {
            return response.data
        })
        .catch(error => Alert.alert('error' + error));
}