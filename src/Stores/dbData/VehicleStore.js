import {action, observable} from "mobx";


class VehicleStore {
    @observable vehicleArray = [{}];
    @observable filteredArray = [{}];
    @observable vehicleInProgress = [{}];

    @action setVehicleArray = (input) => {
        this.vehicleArray = input;
    };

    @action setVehicleInProgress = (input) => {
        this.vehicleInProgress = input;
    };

    @action setFilteredArray = (input) => {
        this.filteredArray = input;
    };

    getVehicleArray = () => {
        return this.vehicleArray.slice()
    };

    getFilteredArray = () => {
        return this.filteredArray;
    }

}

let vehicleStore = new VehicleStore();
export default vehicleStore;