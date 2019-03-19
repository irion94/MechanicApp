import * as React from 'react'
import {Button, Container, Content, Fab, Icon, List, Text} from 'native-base'
import {Alert} from 'react-native'
import * as R from 'ramda'
import MyListItem from "./Lists/MyListItem";
import scannerStore from "../Stores/ScannerStore";
import {observer} from "mobx-react";
import {requireInformation, vehicleKeys, vehicleOwner} from "../Utilities/databaseKeys";
import {createClient, createVehicle} from "../api/ApiUtils";

@observer
class Viewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            done: false,
        }
    }

    _create = () => {
        //To działa
        createClient(scannerStore.personalities.vehicleOwnerData)
            .then(client => {
                createVehicle({...scannerStore.personalities.vehicleData, clientId: client.data._id})
                    .then((vehicle) => {
                        Alert.alert(vehicle.message + " " + client.message, "", [{
                            text: "ok", onPress: () => this.props.navigation.replace('Vehicle', {
                                ...vehicle.data, ...{
                                    labels: ['Make', 'Model', 'VIN', 'Reg.'],
                                    keys: ['markaPojazdu', 'modelPojazdu', 'numerIdentyfikacyjnyPojazdu', 'numerRejestracyjnyPojazdu'],
                                    buttonTitle: 'More Vehicle information',
                                    listHeader: 'Repairs history',
                                    renderFrom: 'Todo'
                                }
                            })
                        }])
                    })
            })
            .catch( error => error);
    };


    render() {
        let owner = scannerStore.personalities.vehicleOwnerData;
        let vehicle = scannerStore.personalities.vehicleData;
        return (
            <Container>
                <Button full disabled>
                    <Text> Require Information </Text>
                </Button>

                <List>
                    {
                        R.map(item => {
                            if (owner[item] !== undefined && owner[item] !== '---')
                                return <MyListItem key={item}
                                                   label={item}
                                                   value={owner[item]}
                                                   objectKey={item}
                                                   storePosition={'vehicleOwnerData'}
                                                   edit={
                                                       {
                                                           editButton: false,
                                                           editable: true
                                                       }
                                                   }
                                />;
                            else
                                return null
                        }, requireInformation)
                    }
                </List>
                <Content>
                    <Button full disabled>
                        <Text> Owner Information</Text>
                    </Button>
                    <List>
                        {
                            R.map(item => {
                                if (owner[item] !== undefined && owner[item] !== '---')
                                    return <MyListItem key={item}
                                                       label={item}
                                                       value={owner[item]}
                                                       objectKey={item}
                                                       storePosition={'vehicleOwnerData'}
                                                       edit={
                                                           {
                                                               editButton: true,
                                                               editable: true
                                                           }
                                                       }
                                    />;
                                else
                                    return null
                            }, vehicleOwner)
                        }
                    </List>
                    <Button full disabled>
                        <Text> Vehicle Information </Text>
                    </Button>
                    <List>
                        {
                            R.map(item => {
                                if (vehicle[item] !== undefined && vehicle[item] !== '---')
                                    return <MyListItem key={item}
                                                       label={item}
                                                       value={vehicle[item]}
                                                       objectKey={item}
                                                       storePosition={'vehicleData'}
                                                       edit={
                                                           {
                                                               editButton: true,
                                                               editable: false
                                                           }
                                                       }
                                    />;
                                else
                                    return null
                            }, vehicleKeys)
                        }
                    </List>
                </Content>
                <Fab
                    position={"bottomRight"}
                    onPress={() => this._create()}
                >
                    <Icon name="up" type={"AntDesign"}/>
                </Fab>
            </Container>
        );

    }
}


export default (Viewer)