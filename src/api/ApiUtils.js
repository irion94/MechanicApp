import axios from "axios";
import sessionStore from "../Stores/dbData/SessionStore";
import customerList_Store from "../Stores/dbData/CustomerList_Store";
import vehicleList_Store from "../Stores/dbData/VehicleList_Store";
import * as R from "ramda";
import {Alert} from "react-native";

export const fetchClientData = async () => {
     await axios.get(`https://mechanicappserver.herokuapp.com/clients/?userId=${sessionStore.userId._id}`)
    //await axios.get(`http://localhost:3000/clients/?userId=5c7d139e0224c041255aaf38`)
        .then(result => {
            customerList_Store.setCustomerArray(result.data);
            vehicleList_Store.setVehicleArray(
                R.pipe(
                    R.map(R.pick(["vehicleList"])),
                    R.pluck("vehicleList"),
                    R.flatten
                )(result.data)
            )

        })
        .catch(error => Alert.alert('error' + error));

    console.log('clientArray:', customerList_Store.customerArray);
    console.log('vehicleArray:', vehicleList_Store.vehicleArray)
};

export const fetchRepairData = () => {

};