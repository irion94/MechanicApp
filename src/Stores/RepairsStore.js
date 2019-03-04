import {action, observable} from "mobx";

class RepairsStore {
    @observable vehicleArray = [{}];
    @observable filteredArray = [{}];

    @action setVehicleArray = (input) => {
        this.vehicleArray = input;
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

let repairsStore = new RepairsStore();
export default repairsStore;