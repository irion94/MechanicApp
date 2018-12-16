import {action, observable} from "mobx";
import {loadRandomOwnerList} from "../ObjectGenerator";

class CustomerList_Store {
    @observable customerArray = loadRandomOwnerList();
    @observable filteredArray = [{}];

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

let customerList_Store = new CustomerList_Store();
export default customerList_Store;