import {action, autorun, observable} from "mobx";
import {map} from 'ramda'

class Create_store {
    @observable personalities = {
        person: {},
        vehicle: {},
    };
    @observable visible: true;

    @action reset = (key) => {
        this.personalities[key] = {}
    };

    @action setPersonalities = (input, key) => {
        this.personalities[key] = {...this.personalities[key] ,...input};
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
autorun(() => console.log(createStore.personalities));

export default createStore;