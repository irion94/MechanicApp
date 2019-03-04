import {action, autorun, observable} from "mobx";
import {map} from 'ramda'

class SessionStore {
    @observable userId: true;

    @action setId = (data) => {
        this.userId = data
    }
}


let sessionStore = new SessionStore();

export default sessionStore;