import {action, observable} from "mobx";
import {loadRandomCarList} from "../ObjectGenerator";

class VehicleList_Store {
    @observable vehicleArray = loadRandomCarList();
    @observable filteredArray = [];

    @action setVehicleArray = (input) => {
        this.vehicleArray = input;
    };

    @action setFilteredArray = (input) => {
        this.filteredArray = input;
    };

    @action getFilteredArray = () => {
        return this.filteredArray;
    }

}

let vehicleList_Store = new VehicleList_Store();
export default vehicleList_Store;