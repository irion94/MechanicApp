import {action, observable} from "mobx";
import vehicleStore from "./dbData/VehicleStore";


//TODO: To delete!

class SelectedCustomer_Store {
    @observable customer = {};
    @observable customersVehicles = [{}];

    @action setCustomer = (input) => {
        this.customer = input
    };

    @action setCustomersVehicles = () => {
        this.customersVehicles = vehicleStore.getVehicleArray().slice(0,3)
    };

}

let selectedCustomer_Store = new SelectedCustomer_Store();
export default selectedCustomer_Store;