import {action, observable} from "mobx";
import {map} from 'ramda'

class Create_store {
    // @observable person = {
    //     name: ''
    // };
    //
    // @observable vehicle = {
    //     brand: ''
    // };

    @observable personalities = {
        person: {
        },
        vehicle: {
        }
    }

    @action reset = (key) => {
        this.personalities[key] = {

        }
    }

    @action setPersonalities = (input, key) => {
        this.personalities[key] = input;
    };

    @action getPersonalities = (key, method) => {
        if (method === 'object') {
            return this.personalities[key]
        }
        else if (method === 'inline') {
            let inline = '';
            map((item) => inline = inline.concat(" ", item), this.personalities[key]);
            return inline
        }
    }

    // @action setPerson = (input) => {
    //     this.person = {...this.person, ...input};
    // };
    //
    // @action getPerson = (method) => {
    //     if (method === 'object') {
    //         return this.person
    //     }
    //     else if (method === 'inline') {
    //         let inline = '';
    //         map((item) => inline = inline.concat(" ", item), this.person);
    //         return inline
    //     }
    // };
    //
    // @action setVehicle = (input) => {
    //     this.vehicle = {...this.vehicle, ...input}
    // };
    //
    // @action getVehicle = () => {
    //     return this.vehicle
    // }

}

let createStore = new Create_store();

export default createStore;