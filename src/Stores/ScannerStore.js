import {action, autorun, observable} from "mobx";
import {map} from 'ramda'

class ScannerStore {
    @observable personalities = {
        vehicleOwnerData: {},
        vehicleData: [],
        documentOwnerData: [],
        requireData: []
    };

    @action changePersonalitiesValue = (input, personalitiesKey ,objectKey) => {
        console.log(input, personalitiesKey, objectKey);
        this.personalities[personalitiesKey].setVarable(objectKey, input);
    };

    @action setPersonalities = (input, key) => {
        this.personalities[key] = input;
    };

    // @action reset = (key) => { //used to keyboard input, deprecated
    //     this.personalities[key] = {}
    // };


    //used in keyboard input //deprecated
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


let scannerStore = new ScannerStore();

export default scannerStore;