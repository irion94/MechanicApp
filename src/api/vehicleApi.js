import axios from "axios";
import sessionStore from "../Stores/dbData/SessionStore";
import vehicleStore from "../Stores/dbData/VehicleStore";
import {Alert} from "react-native";

import {http} from './ApiUtils'



export const fetchVehicleData = async () => {
    await axios.get(`${http}/vehicles/?userId=${sessionStore.userId._id}`)
        .then(result => {
            vehicleStore.setVehicleArray(result.data);
        })
        .catch(error => Alert.alert('error' + error));

    console.log('vehicleArray:', vehicleStore.vehicleArray)
};

export const fetchVehicleInProgress = async () => {
    return await axios.get(`${http}/repairLists?_id=${sessionStore.userId._id}`)
        .then( result => {
            return result.data
        })
    //console.log('vehicleInProgressArray:', vehicleStore.vehicleInProgress)
};

export const createVehicle = async(object) => {
    let vehicle = JSON.stringify(object);
    return await axios.post(`${http}/vehicles/?args=${vehicle}`)
        .then(response => {
            return response.data
        })
        .catch(error => Alert.alert('error' + error));
};