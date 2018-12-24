import {action, autorun, observable} from "mobx";
import {map} from 'ramda'

class StackStore {
    @observable visible: true;

    @action setVisible = () => {
        this.visible = !this.visible
    }
}


let stackStore = new StackStore();

export default stackStore;