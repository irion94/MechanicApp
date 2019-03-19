import {action, observable} from "mobx";
import {loadRandomOwnerList} from "../../ObjectGenerator";

class CustomerStore {
    @observable customerArray = [{}];
    @observable filteredArray = [{}];

    @action setCustomerArray = (data) => {
        this.customerArray = data;
    }

    @action setFilteredArray = (input) => {
        this.filteredArray = input
    };

    getFilteredArray = () => {
        return this.filteredArray;
    }

    getCustomerArray = () => {
        return this.customerArray;
    }

}

let customerStore = new CustomerStore();
export default customerStore;
