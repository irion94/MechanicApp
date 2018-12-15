import {action, autorun, observable} from "mobx";
import {map} from 'ramda'
import {makeGenerator} from "../ObjectGenerator";

class Create_store {
    constructor(){
    }
    @observable brand_models = makeGenerator();

    @observable personalities = {
        person: {},
        vehicle: {}
    };

    @action reset = (key) => {
        this.personalities[key] = {}
    };

    @action setSelected = (item) => {
        this.selected = item
    }

    @action setPersonalities = (input, key) => {
        console.log('store',input)
        this.personalities[key] = {...this.personalities[key] ,...input};
        console.log('store2',this.personalities)
    };

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