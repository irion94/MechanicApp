import * as React from 'react'
import {Icon} from 'react-native-elements'
import {StatusBar, View, Alert} from "react-native";
import {Container, Header, Text, ListItem, List, Spinner} from 'native-base';
import {applicationColor} from "../../Styles/UniversalStyles";
import SearchInput from "../../Components/Forms/SearchInput";
import vehicleStore from "../../Stores/dbData/VehicleStore";
import customerStore from "../../Stores/dbData/CustomerStore";
import ReusableList from "../../Components/Lists/ReusableList";
import {fetchVehicleInProgress} from "../../api/ApiUtils";
import TodoList from "../../Components/Lists/TodoList";

class HomeScreen extends React.Component <State, Props> {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            token: null,
            loading: true
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

    async componentWillMount(){
        this.setState({loading:true});
        fetchVehicleInProgress()
            .then((result) => vehicleStore.setVehicleInProgress(result))
            .then(() => this.setState({loading:false}))
            .catch(error => Alert.alert('VehicleInProgressFail', error));
    }


    render() {
        //let http = 'http://localhost:3000';
        // axios.get(`${http}/clients/?userId=${sessionStore.userId._id}`)
        //     .then( response => vehicleList_Store.getRepairLists(response.data))
        //     .then( res => console.log(res))

        //fetchVehicleWithRepairs(vehicleList_Store.getRepairLists()).then( () => console.log( vehicleList_Store.setVehicleWithRepairs()))

        //console.log(vehicleList_Store.getRepairLists());
        //console.log('props', sessionStore.userId)

        //createDatabaseObject();
        //console.log(vehicleStore.getVehicleArray());
        console.log('vehicleInProgress:',vehicleStore.vehicleInProgress);

        console.log(JSON.stringify([{userId:"5c7d139e0224c041255aaf38"}, {vehicleList:"5c7d14d10224c041255aaf41"}]));

        let t = this;

        if (!t.state.loading)
            return (
                <View style={{flex: 1, backgroundColor: 'white'}}>
                    <StatusBar hidden/>
                    <Container>

                        {/*<FlatList*/}
                        {/*data={vehicleStore.vehicleInProgress}*/}
                        {/*renderItem={({item}) =>*/}
                        {/*<Text>{item.markaPojazdu}</Text>*/}
                        {/*}*/}
                        {/*/>*/}
                        <TodoList
                            navigation={this.props.navigation}
                            props={this.props} from={'HomeScreen'}
                            input={this.state}
                        />

                    </Container>
                    {/*<FloatButton active={false}/>*/}
                </View>
            )
        else{
            return(
                <Container style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                    <Spinner color={'black'}/>
                </Container>
            )
        }
    }
}


export default (HomeScreen)