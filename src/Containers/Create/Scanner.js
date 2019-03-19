import * as React from 'react'
import {AppState, Platform} from "react-native";
import {Barcode, BarcodePicker, ScanditModule, ScanSettings} from 'scandit-react-native';
import withNavigation from "react-navigation/src/views/withNavigation";
import {scanditKey} from 'src/Utilities/config'
import * as R from "ramda";
import createStore from "../../Stores/ScannerStore";
import {vehicleKeys, vehicleOwner, requireInformation, documentOwner} from 'src/Utilities/databaseKeys'
import Owner from "../../Stores/Owner";
import Vehicle from "../../Stores/Vehicle";
import Loading from "../../Components/Loading";

const tmp = '6wMAANtYAAJDAP8xAHwAQgBBAL9LEjQANd0AMw6uBjAq0w4y3zISUwC/VEJSAE9uEyDtYhpa3QBFHq9uSUJ19wBsAC4utUc6Aa9KV0ZDfTNF7yJPLjV9zzP7mi0AOKrYMIe7Tzr3fABLJ7cyOQBOe1I5It1IMr4WRABBAHzdA0PvqlYGQ3ZOpoMsZrsgbj5BVE/vSAJNdop67zcANs+4VQY3ozgAOX2jMu0fai3eADAL1xY1Kr4tA3wPE1p7ZkKqzlTX8kUavVMmIPcbQbqxfDNbf0g0VzUeBzjdBzP4HjcAOGsPDCveSn8da07DAEmfbCcDTTh1u1DhLkzwa0F7nzGnwXcVEi0LNdgAMBMxQycxbSelI4UPGDdym9Q3i+dBOYbbLD+1Nhf3UAAgQ48jRzcT5Tf2NAB8zw5THjMKYkM+qtMOpiCeA9AGQnu7WdsGy5cjTTiM2xfWYQBy9wB0AHl++24AaQBlDt53GmTtLh5veEIwPccx4V/W1zADu3wj6ny2EyeWA2ROLZszOQvtMpuwJkkkkklQ/wM=u'

const {PolishVehicleRegistrationCertificateDecoder} = require('polish-vehicle-registration-certificate-decoder');
ScanditModule.setAppKey(scanditKey);

class Scanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }

    _alg(keys, array){
        return R.pipe(
            R.pickBy((value, key) => R.contains(key, keys)),
            R.map(R.prop('value'))
        )(array)
    }

    setStore(result){
        let vehicleOwnerData = this._alg(vehicleOwner,result);
        let vehicleData = this._alg(vehicleKeys, result);

        let documentOwnerData = R.map( item => result[item] ,documentOwner);
        let requireData = R.map( item => result[item], requireInformation);

        let owner = new Owner(vehicleOwnerData);
        let vehicle = new Vehicle(vehicleData);

        createStore.setPersonalities(owner, 'vehicleOwnerData');
        createStore.setPersonalities(documentOwnerData,'documentOwnerData');
        createStore.setPersonalities(vehicle,'vehicleData');
        createStore.setPersonalities(requireData,'requireData');
    }

     onScan(session) {
        this.setState({loading: true}, () => {
            const decoder = new PolishVehicleRegistrationCertificateDecoder(session.newlyRecognizedCodes[0].data + " " + session.newlyRecognizedCodes[0].symbology);
            this.setStore(decoder.data);
            this.props.navigation.replace('Viewer')
        });
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
            this.setStore(decoder.data);
            this.props.navigation.replace('Viewer')
        }

        if(!this.state.loading)return (
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
        else return <Loading/>
    }
}

export default withNavigation(Scanner)