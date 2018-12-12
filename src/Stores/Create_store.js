import {action, autorun, observable} from "mobx";

class Create_store{
    @observable person = {
        name:''
    };
    @observable vehicle = {
        brand:''
    };

    @action setPerson = (input) => {
        this.person = {...this.person, ...input};
    };

    @action setVehicle = (input) => {
        this.vehicle = {...this.vehicle, ...input}
    }

    @action getPerson = () => {
        return this.person
    }

    @action getVehicle = () => {
        return this.vehicle
    }
}

let personStore = new Create_store();

export default personStore;

autorun(() => {
    console.log('store', this.person)
    //this.getPerson()
});