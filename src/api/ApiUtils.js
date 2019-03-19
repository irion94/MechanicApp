import {fetchVehicleData, createVehicle, fetchVehicleInProgress} from './vehicleApi'
import {fetchOneClientData, createClient, fetchAllClientData} from './clientApi'
import {login, logout} from './authorization'
//let http = 'https://mechanicappserver.herokuapp.com';
//let http = 'http://192.168.55.104:3000';
let http = 'http://localhost:3000';
export {
    fetchVehicleData,
    createVehicle,
    fetchVehicleInProgress,
    fetchOneClientData,
    fetchAllClientData,
    createClient,
    login,
    logout,
    http
}




// export const createAll = async(client, vehicle) => {
//     let owner = JSON.stringify(client);
//     let veh = JSON.stringify(vehicle);
//     return await axios.post(`${http}/clients/scanner/?client=${owner}&&vehicle=${veh}`)
//         .then(response => {
//             return response.data
//         })
//         .catch(error => Alert.alert('error' + error));
// };










