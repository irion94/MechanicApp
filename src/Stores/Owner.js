import {observable, action, computed} from 'mobx'
import stackStore from "./StackStore";
import sessionStore from "./dbData/SessionStore";

export default class Owner {
    @observable pelneNazwiskoLubNazwaWlascicielaPojazdu;
    @observable imieWlascicielaPojazdu;
    @observable nazwiskoWlascicielaPojazdu;
    @observable nazwaWlascicielaPojazdu;
    @observable numerPESELLubREGONWlascicielaPojazdu;
    @observable kodPocztowyWlascicielaPojazdu;
    @observable miejscowoscWlascicielaPojazdu;
    @observable gminaWlascicielaPojazdu;
    @observable ulicaWlascicielaPojazdu;
    @observable nrDomuWlascicielaPojazdu;
    @observable nrMieszkaniaWlascicielaPojazdu;
    @observable phoneNumber;
    @observable email;
    @observable vehicleList;
    @observable userId;

    constructor
    ({
         pelneNazwiskoLubNazwaWlascicielaPojazdu,
         imieWlascicielaPojazdu,
         nazwiskoWlascicielaPojazdu,
         nazwaWlascicielaPojazdu,
         numerPESELLubREGONWlascicielaPojazdu,
         kodPocztowyWlascicielaPojazdu,
         miejscowoscWlascicielaPojazdu,
         gminaWlascicielaPojazdu,
         ulicaWlascicielaPojazdu,
         nrDomuWlascicielaPojazdu,
         nrMieszkaniaWlascicielaPojazdu,
         phoneNumber,
         email,
        vehicleList,

        userId
     }
    ) {
        this.gminaWlascicielaPojazdu = gminaWlascicielaPojazdu;
        this.imieWlascicielaPojazdu = imieWlascicielaPojazdu;
        this.nazwiskoWlascicielaPojazdu = nazwiskoWlascicielaPojazdu
        this.kodPocztowyWlascicielaPojazdu = kodPocztowyWlascicielaPojazdu;
        this.miejscowoscWlascicielaPojazdu = miejscowoscWlascicielaPojazdu;
        this.nazwaWlascicielaPojazdu = nazwaWlascicielaPojazdu;
        this.nrDomuWlascicielaPojazdu = nrDomuWlascicielaPojazdu;
        this.nrMieszkaniaWlascicielaPojazdu = nrMieszkaniaWlascicielaPojazdu;
        this.numerPESELLubREGONWlascicielaPojazdu = numerPESELLubREGONWlascicielaPojazdu;
        this.pelneNazwiskoLubNazwaWlascicielaPojazdu = pelneNazwiskoLubNazwaWlascicielaPojazdu;
        this.ulicaWlascicielaPojazdu = ulicaWlascicielaPojazdu;
        this.phoneNumber = phoneNumber;
        this.email = email;
        this.vehicleList = vehicleList;

        //this.userId = sessionStore.userId._id
    }

    @action.bound setVarable(key, value){
        this[key] = value
    }
}