import * as React from 'react'
import {Icon} from 'react-native-elements'
import {ScrollView, StyleSheet, View, StatusBar, TouchableOpacity, Text, Alert} from "react-native";
import {Header} from 'native-base';
import {applicationColor} from "../../Styles/UniversalStyles";
import SearchInput from "../../Components/Forms/SearchInput";
import {createDatabaseObject} from "../../ObjectGenerator";
import axios from "axios";
import customerList_Store from "../../Stores/dbData/CustomerList_Store";
import sessionStore from 'src/Stores/dbData/SessionStore'
import * as R from 'ramda'
import vehicleList_Store from "../../Stores/dbData/VehicleList_Store";

class HomeScreen extends React.Component <State, Props> {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            token: null
        };
    }

    static navigationOptions = ({navigation}) => ({
        header: () => {
            const {
                params = {
                    onChangeText: () => {
                    }
                }
            } = navigation.state;
            return (
                <Header style={{backgroundColor: applicationColor.header}}>
                    <SearchInput onChangeText={params.onChangeText} placeholder={'Search in Todo...'}/>
                    <Icon
                        iconStyle={{marginBottom: 5}}
                        name="settings"
                        size={40}
                        onPress={() => {
                            navigation.navigate('Option')
                        }}
                    />
                </Header>
            )
        }

    });

    onChangeText = (input) => {
        this.setState({input: input});
    };

    async componentDidMount() {
        this.props.navigation.setParams({
            onChangeText: this.onChangeText
        })
    }

    render() {
        console.log('props', sessionStore.userId)


        // get clients by userId, map client vehicles -> setStore
        // axios.get(`http://localhost:3000/clients/?userId=${sessionStore.userId._id}`)
        //     .then(result => customerList_Store.setCustomerArray(result.data))
        //     .then(() => vehicleList_Store.setVehicleArray(
        //         R.pipe(
        //             R.map(R.pick(["vehicleList"])),
        //             R.pluck("vehicleList"),
        //             R.map(item => item.pop())
        //         )(customerList_Store.getCustomerArray())))
        //     .then(() => console.log(vehicleList_Store.vehicleArray))
        //     .catch(error => Alert.alert('error' + error));


        // axios.get(`http://localhost:3000/vehicles/`)
        //     .then( result => vehicleList_Store.setVehicleArray(result.data))
        //     .catch(error => Alert.alert('error'+error))
        //     .then(() => console.log(vehicleList_Store.getVehicleArray()))

        // axios.get(`http://localhost:3000/clients/?userId=${sessionStore.userId._id}`)
        //     .then(result => vehicleList_Store.setVehicleArray(result.data))
        //     .catch(error => Alert.alert('error' + error))
        //     .then(() => console.log(vehicleList_Store.getVehicleArray()))


        //console.log(customerList_Store.getCustomerArray())

        createDatabaseObject();

        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <StatusBar hidden/>


                {/*<VehiclesListTodo navigation={this.props.navigation} props={this.props} from={'HomeScreen'}*/}
                {/*input={this.state}/>*/}

                {/*<FloatButton active={false}/>*/}
            </View>
        )
    }
}


export default (HomeScreen)