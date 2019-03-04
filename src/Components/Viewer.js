import * as React from 'react'
import {Button, Container, Content, List, Spinner, Text} from 'native-base'
import {Alert, ListView, View} from 'react-native'
import {map} from 'ramda'
import MyListItem from "./Lists/MyListItem";
import FloatButton from "./Buttons/FloatButton";
import * as R from "ramda";
import createStore from "../Stores/Create_store";
import {observer} from "mobx-react";
import TodoCreator from "../Containers/Create/TodoCreator";

@observer
class Viewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        }
    }

    fun = () => {
        this.setState({loading: false})
        this.checkVahicle();
        this.checkPerson();
        this.checkingResult();
    };

    checkVahicle = () => {
        //SERVER/ if found set it in store to true
    };

    checkPerson = () => {
        //SERVER/ if found set it in store to true
    };


    checkingResult = () => {
        const VEHICLE_FOUND = 'vehicleFound';
        const PERSON_FOUND = 'personFound';
        const PERSON_AND_VEHICLE = 'personAndVehicle';
        const NOT_FOUND = 'notFound';

        let option = NOT_FOUND;
        switch (option) {
            case PERSON_AND_VEHICLE: {
                Alert.alert(
                    'Warning',
                    'Person and Vehicle Found in Database',
                    [
                        {
                            text: 'Show Vehicle', onPress: () => {
                            }
                        },
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    ],
                    {cancelable: false}
                );
                break;
            }
            case PERSON_FOUND: {
                Alert.alert(
                    'Warning',
                    'Just Person Found in Database',
                    [
                        {
                            text: 'Add new vehicle', onPress: () => {
                            }
                        },
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    ],
                    {cancelable: false}
                );
                break;
            }
            case VEHICLE_FOUND: {
                Alert.alert(
                    'Warning',
                    'Vehicle Found in Database, but with different owner',
                    [
                        {
                            text: 'Assign to new Owner, and show Vehicle', onPress: () => {
                            }
                        },
                        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    ],
                    {cancelable: false}
                );
                break;
            }
            case NOT_FOUND: {
                Alert.alert(
                    'Warning',
                    'Not Found. Check information and confirm.',
                    [
                        {
                            text: 'Ok', onPress: () => {
                            }
                        },
                    ],
                    {cancelable: false}
                );
                break;
            }
        }
    };

    componentDidMount() {
        setTimeout(this.fun, 800)
    }

    labelManage = (item) => {
        let result = item.replace(/([a-z])([A-Z])/g, '$1 $2');
        return result[0].toUpperCase() + result.slice(1)
    };


    render() {
        console.log("personalities:", createStore.personalities)
        return (
            <Container>
                <Button full disabled>
                    <Text> Require Information </Text>
                </Button>
                <List>
                    {
                        R.map(item => {
                            let index = createStore.personalities.requireData.indexOf(item);
                            if (item.value !== undefined && item.value !== '---')
                                return <MyListItem key={index}
                                                   label={item.description}
                                                   value={item.value}
                                                   objectKey={index}
                                                   storePosition={'requireData'}
                                />;
                            else
                                return null
                        }, createStore.personalities.requireData)
                    }
                </List>
                <Content>
                    <Button full disabled>
                        <Text> Vehicle Information </Text>
                    </Button>

                    <List>
                        {
                            R.map(item => {
                                let index = createStore.personalities.vehicleData.indexOf(item);
                                if (item.value !== undefined && item.value !== '---')
                                    return <MyListItem key={index}
                                                       label={item.description}
                                                       value={item.value}
                                                       objectKey={index}
                                                       storePosition={'vehicleData'}
                                    />;
                                else
                                    return null
                            }, createStore.personalities.vehicleData)
                        }
                    </List>

                    <Button full disabled>
                        <Text> Owner Information</Text>
                    </Button>
                    <List>
                        {
                            R.map(item => {
                                let index = createStore.personalities.vehicleOwnerData.indexOf(item);
                                if (item.value !== undefined && item.value !== '---')
                                    return <MyListItem key={index}
                                                       label={item.description}
                                                       value={item.value}
                                                       objectKey={index}
                                                       storePosition={'vehicleOwnerData'}
                                    />;
                                else
                                    return null
                            }, createStore.personalities.vehicleOwnerData)
                        }
                    </List>
                    <Button full disabled>
                        <Text> Document Owner Information </Text>
                    </Button>
                    <List>
                        {
                            R.map(item => {
                                let index = createStore.personalities.documentOwnerData.indexOf(item);
                                if (item.value !== undefined && item.value !== '---')
                                    return <MyListItem key={index}
                                                       label={item.description}
                                                       value={item.value}
                                                       objectKey={index}
                                                       storePosition={'documentOwnerData'}
                                    />;
                                else
                                    return null
                            }, createStore.personalities.documentOwnerData)
                        }
                    </List>
                </Content>
                <FloatButton
                    buttons={[{
                        navigation: 'TodoCreator',
                        name: 'Next',
                        icon: {name: 'plus', type: 'entypo'}
                    }]}
                    backgroundColor={'rgba(192,192,192,0.5)'}
                />
            </Container>
        );

    }
}


export default (Viewer)