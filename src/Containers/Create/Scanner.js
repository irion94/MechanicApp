import * as React from 'react'
import {AppState, Platform} from "react-native";
import {Barcode, BarcodePicker, ScanditModule, ScanSettings} from 'scandit-react-native';
import withNavigation from "react-navigation/src/views/withNavigation";
import {scanditKey} from 'src/Utilities/config'
import * as R from "ramda";
import createStore from "../../Stores/Create_store";

const tmp = '6wMAANtYAAJDAP8xAHwAQgBBAL9LEjQANd0AMw6uBjAq0w4y3zISUwC/VEJSAE9uEyDtYhpa3QBFHq9uSUJ19wBsAC4utUc6Aa9KV0ZDfTNF7yJPLjV9zzP7mi0AOKrYMIe7Tzr3fABLJ7cyOQBOe1I5It1IMr4WRABBAHzdA0PvqlYGQ3ZOpoMsZrsgbj5BVE/vSAJNdop67zcANs+4VQY3ozgAOX2jMu0fai3eADAL1xY1Kr4tA3wPE1p7ZkKqzlTX8kUavVMmIPcbQbqxfDNbf0g0VzUeBzjdBzP4HjcAOGsPDCveSn8da07DAEmfbCcDTTh1u1DhLkzwa0F7nzGnwXcVEi0LNdgAMBMxQycxbSelI4UPGDdym9Q3i+dBOYbbLD+1Nhf3UAAgQ48jRzcT5Tf2NAB8zw5THjMKYkM+qtMOpiCeA9AGQnu7WdsGy5cjTTiM2xfWYQBy9wB0AHl++24AaQBlDt53GmTtLh5veEIwPccx4V/W1zADu3wj6ny2EyeWA2ROLZszOQvtMpuwJkkkkklQ/wM=u'

const {PolishVehicleRegistrationCertificateDecoder} = require('polish-vehicle-registration-certificate-decoder');
ScanditModule.setAppKey(scanditKey);

class Scanner extends React.Component {
    constructor(props) {
        super(props);
    }

    setStore(result){
        let vehicleOwnerData = R.map( item => result[item] ,vehicleOwner);
        let documentOwnerData = R.map( item => result[item] ,documentOwner);
        let vehicleData = R.map( item => result[item], vehicle);
        let requireData = R.map( item => result[item], requireInformation);
        console.log("result",requireData)


        createStore.setPersonalities(Object.values(vehicleOwnerData), 'vehicleOwnerData');
        createStore.setPersonalities(Object.values(documentOwnerData),'documentOwnerData');
        createStore.setPersonalities(Object.values(vehicleData),'vehicleData');
        createStore.setPersonalities(Object.values(requireData),'requireData');
    }

    onScan(session) {
        const decoder = new PolishVehicleRegistrationCertificateDecoder(session.newlyRecognizedCodes[0].data + " " + session.newlyRecognizedCodes[0].symbology);
        this.setStore(decoder.data);
        this.props.navigation.navigate('Viewer')
        //this.props.navigation.navigate('Viewer', {result: decoder.data})
    }

    componentWillMount() {
        this.settings = new ScanSettings();
        this.settings.setSymbologyEnabled(Barcode.Symbology.AZTEC, true);
    }

    componentDidMount() {
        this.scanner.startScanning();
        AppState.addEventListener('change', this._handleAppStateChange);
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }

    _handleAppStateChange = (nextAppState) => {
        if (nextAppState.match(/inactive|background/)) {
            this.scanner.stopScanning();
        } else {
            this.scanner.startScanning();
        }
    };

    render() {
        if(Platform.OS === 'ios'){
            const decoder = new PolishVehicleRegistrationCertificateDecoder(tmp)
            this.setStore(decoder.data)
            this.props.navigation.pop();
            //this.props.navigation.navigate('Viewer', {result: decoder.data})
            this.props.navigation.navigate('Viewer')
        }
        return (
            <BarcodePicker
                onScan={(session) => {
                    this.onScan(session)
                }}
                scanSettings={this.settings}
                ref={(scan) => {
                    this.scanner = scan
                }}
                style={{flex: 1}}
            />
        );
    }
}

let vehicle = [
    "markaPojazdu",
    "modelPojazdu",
    "numerRejestracyjnyPojazdu",
    "numerIdentyfikacyjnyPojazdu",
    //"wariantPojazdu",
    "wersjaPojazdu",
    //"typPojazdu",
    "rokProdukcji",
    "pojemnoscSilnikaCm3",
    "maksymalnaMocNettoSilnikaKW",
    //"masaWlasnaPojazduKg",
    //"rodzajPojazdu",
    // "liczbaMiejscSiedzacych",
    // "liczbaMiejscStojacych",
    "rodzajPaliwa",
    // "przeznaczenie",
    // "dopuszczalnaLadownosc",
    "dataPierwszejRejestracjiPojazdu",
];
let vehicleOwner = [
    "pelneNazwiskoLubNazwaWlascicielaPojazdu",
    "imieWlascicielaPojazdu",
    "nazwiskoWlascicielaPojazdu",
    "nazwaWlascicielaPojazdu",
    "numerPESELLubREGONWlascicielaPojazdu",
    "kodPocztowyWlascicielaPojazdu",
    "miejscowoscWlascicielaPojazdu",
    "gminaWlascicielaPojazdu",
    "ulicaWlascicielaPojazdu",
    "nrDomuWlascicielaPojazdu",
    "nrMieszkaniaWlascicielaPojazdu",
    "phoneNumber",
    "email"
];

let documentOwner = [
    "pelneNazwiskoLubNazwaPosiadaczaDowoduRejestracyjnego",
    "imiePosiadaczaDowoduRejestracyjnego",
    "nazwiskoPosiadaczaDowoduRejestracyjnego",
    "nazwaPosiadaczaDowoduRejestracyjnego",
    "numerPESELLubREGONPosiadaczaDowoduRejestracyjnego",
    "kodPocztowyPosiadaczaDowoduRejestracyjnego",
    "miejscowoscPosiadaczaDowoduRejestracyjnego",
    "gminaPosiadaczaDowoduRejestracyjnego",
    "ulicaPosiadaczaDowoduRejestracyjnego",
    "nrDomuPosiadaczaDowoduRejestracyjnego",
    "nrMieszkaniaPosiadaczaDowoduRejestracyjnego",
];

let requireInformation = [
    "phoneNumber",
    "email"
]

export default withNavigation(Scanner)