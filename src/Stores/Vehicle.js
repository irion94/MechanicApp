import {observable, action, computed} from 'mobx'
import stackStore from "./StackStore";
import sessionStore from "./dbData/SessionStore";

export default class Vehicle {
    @observable markaPojazdu;
    @observable modelPojazdu;
    @observable numerRejestracyjnyPojazdu;
    @observable numerIdentyfikacyjnyPojazdu;
    @observable wersjaPojazdu;
    @observable rokProdukcji;
    @observable pojemnoscSilnikaCm3;
    @observable maksymalnaMocNettoSilnikaKW;
    @observable dataPierwszejRejestracjiPojazdu;
    @observable rodzajPaliwa;
    @observable clientId;
    @observable repairsHistory;

    constructor
    ({
         markaPojazdu,
         modelPojazdu,
         numerRejestracyjnyPojazdu,
         numerIdentyfikacyjnyPojazdu,
         wersjaPojazdu,
         rokProdukcji,
         pojemnoscSilnikaCm3,
         maksymalnaMocNettoSilnikaKW,
         dataPierwszejRejestracjiPojazdu,
         rodzajPaliwa,
         repairsHistory,
         clientId
     }
    ) {
        this.markaPojazdu = markaPojazdu;
        this.modelPojazdu = modelPojazdu;
        this.numerIdentyfikacyjnyPojazdu = numerIdentyfikacyjnyPojazdu
        this.numerRejestracyjnyPojazdu = numerRejestracyjnyPojazdu;
        this.wersjaPojazdu = wersjaPojazdu;
        this.rokProdukcji = rokProdukcji;
        this.pojemnoscSilnikaCm3 = pojemnoscSilnikaCm3;
        this.maksymalnaMocNettoSilnikaKW = maksymalnaMocNettoSilnikaKW;
        this.dataPierwszejRejestracjiPojazdu = dataPierwszejRejestracjiPojazdu;
        this.rodzajPaliwa = rodzajPaliwa;
        this.repairsHistory = repairsHistory;
        this.clientId = clientId
    }

    @action.bound setVarable(key, value) {
        this[key] = value
    }
}