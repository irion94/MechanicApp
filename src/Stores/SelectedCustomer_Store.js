import {action, observable} from "mobx";
import vehicleList_Store from "./VehicleList_Store";

class SelectedCustomer_Store {
    @observable customer = {};
    @observable customersVehicles = [{}];

    @action setCustomer = (input) => {
        this.customer = input
    };

    @action setCustomersVehicles = () => {
        this.customersVehicles = vehicleList_Store.getVehicleArray().slice(0,3)
    };

}

let selectedCustomer_Store = new SelectedCustomer_Store();
export default selectedCustomer_Store;