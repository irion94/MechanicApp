import {action, autorun, observable} from "mobx";
import {map} from 'ramda'

class Create_store {
    @observable PersonalitiesKeyboard = {

    }

    @observable personalities = {
        vehicleOwnerData: [],
        vehicleData: [],
        documentOwnerData: [],
        requireData: [],

        person:{},
        vehicle:{
            brand: "Acura",
            model: null
        }
    };

    @observable databaseFound = {
        person: false,
        vehicle: false
    };

    @observable visible: true;

    @action changePersonalitiesValue = (input, personalitiesKey ,objectKey) => {
        console.log('store:',createStore.personalities[personalitiesKey][0])
        this.personalities[personalitiesKey][objectKey].value = input
    }

    @action reset = (key) => {
        this.personalities[key] = {}
    };

    @action setPersonalities = (input, key) => {
        console.log('storePersonalities',input)
        this.personalities[key] = input;
    };

    @action setVisible = () => {
        this.visible = false
}

    getPersonalities = (key, method) => {
        if (method === 'object') {
            return this.personalities[key]
        }
        else if (method === 'inline') {
            let inline = '';
            map((item) => inline = inline.concat(" ", item), this.personalities[key]);
            return inline
        }
    }
}


let createStore = new Create_store();
autorun(() => console.log(createStore.personalities['vehicleData']));

export default createStore;