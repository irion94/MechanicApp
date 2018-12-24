import * as React from 'react'
import {Alert, ScrollView, View} from "react-native";
import {Body, Button, Container, Header, Icon, Left, Right, Text} from "native-base";
import {observer} from "mobx-react";
import {Grid, Row} from "react-native-easy-grid";
import createStore from 'src/Stores/Create_store'
import customerList_Store from "../../Stores/CustomerList_Store";
import vehicleList_Store from "../../Stores/VehicleList_Store";
import ReusableList from "../../Components/Lists/ReusableList";
import FormInput from "../../Components/Forms/FormInput";
import {applicationColor} from "../../Styles/UniversalStyles";
import brandModelStore from "../../Stores/BrandModelList_Store";
import {loadRandomCarList} from "../../ObjectGenerator";
import selectedCustomer_Store from "../../Stores/SelectedCustomer_Store";


@observer
class KeyboardInput extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            form: 1,
            inlineInput: '',
            vehicleSelected: {
                brand: null,
                model: null,
            },
            array: brandModelStore.setBrandList(),
            modelArray: [{}],
            filteredArray: [{}]
        };
    }

    static navigationOptions = ({navigation}) => ({
        header: () => {
            const {params = {title: 'Personal Inf'}} = navigation.state;
            return (
                <Header searchBar rounded style={{backgroundColor: applicationColor.header}}>
                    <Left>
                        <Button transparent onPress={
                            () => {
                                createStore.reset();
                                navigation.goBack();
                            }
                        }
                        >
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                    <Text style={{fontWeight: '700', color: 'white'}}>
                        {params.title}
                    </Text>
                    </Body>
                    <Right/>
                </Header>
            )
        },
    });


    onChangeTextPerson = (obj) => {
        createStore.setPersonalities(obj, 'person');
        this.setState({inlineInput: createStore.getPersonalities('person', 'inline')})
    };

    onChangeTextVehicle = (obj) => {
        console.log(obj)
        createStore.setPersonalities(obj, 'vehicle')
        setTimeout(() => {
            this.setState({inlineInput: createStore.getPersonalities('vehicle', 'inline')})
        }, 5000)

    };

    onSend = () => {
        let {form} = this.state;
        let onPress = () => {
            this.setState({form: 2}, () => this.setState({inlineInput: ''}, () => this.props.navigation.setParams({title: 'Vehicle Inf'})));
            // this.props.navigation.setParams({title: 'Vehicle Inf'})
            // this.setState({inlineInput: ''});
        };

        if (form === 1 ? customerList_Store.getFilteredArray().length !== 0 : vehicleList_Store.getFilteredArray().length !== 0) {
            Alert.alert(
                'Warning',
                'W bazie znajduje się ktoś o podobnych personaliach...',
                [
                    {text: 'ok, dodaj mimo wszystko', onPress: () => onPress()},
                    {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                    {text: 'OK', onPress: () => console.log('OK Pressed')},
                ],
                {cancelable: false}
            )
        }
        else {
            onPress()
        }
    };

    componentDidMount() {
        brandModelStore.setBrandList().then(() => this.setState({array: brandModelStore.brandList}))
    }

    render() {
        return (
            <Container>
                <Grid>
                    <Row size={30} style={{alignItems: 'center', margin: 10}}>
                        <ScrollView>
                            {
                                this.state.form === 1 ?
                                    <View>
                                        <FormInput navigation={this.props.navigation}
                                                   keys={['name', 'surname', 'phone', 'email']}
                                                   searchByKeys={['vin', 'rej']}
                                                   disabled={false}
                                                   onChangeText={this.onChangeTextPerson}
                                                   onSend={this.onSend}
                                                   oneColumn={false}
                                        />
                                    </View>
                                    :
                                    <View>
                                        <FormInput navigation={this.props.navigation}
                                                   keys={['brand', 'model', 'vin', 'rej']}
                                                   searchByKeys={['vin', 'rej']}
                                                   disabled={false}
                                                   onChangeText={this.onChangeTextVehicle}
                                                   onSend={this.onSend}
                                                   oneColumn={false}
                                                   pickerProps={{
                                                       pickerKeys: ['brand', 'model'],
                                                       picker: {
                                                           brand: {
                                                               array: this.state.array,
                                                               keys: ['brand'],
                                                           },
                                                           model: {
                                                               array: brandModelStore.getModelList(createStore.personalities.vehicle.brand),
                                                               keys: ['model'],
                                                               //vehicleSelected: this.state.vehicleSelected.model
                                                           }

                                                       }
                                                   }}
                                        />
                                    </View>
                            }
                        </ScrollView>
                    </Row>


                    <Row size={60} style={{width: '100%'}}>
                        <ScrollView>
                            {
                                this.state.form === 1 ?
                                    <ReusableList
                                        array={customerList_Store.getCustomerArray()}
                                        setFilteredArray={customerList_Store.setFilteredArray}
                                        input={this.state.inlineInput}
                                        objectKeys={['name', 'surname', 'email', 'phone']}
                                        primaryKey={'phone'}
                                        arrayLimiter={5}
                                        navigateTo={'Customer'}
                                        navigateToProps={
                                            {
                                                labels: ['ID', 'Name', 'Surname', 'e-mail', 'Phone'],
                                                keys: ['id', 'name', 'surname', 'email', 'phone'],
                                                buttonTitle: 'More information',
                                                listHeader: 'Vehicles List',
                                            }
                                        }
                                    />
                                    :
                                    <ReusableList
                                        array={vehicleList_Store.getVehicleArray()}
                                        setFilteredArray={vehicleList_Store.setFilteredArray}
                                        input={this.state.inlineInput}
                                        objectKeys={['brand', 'model', 'vin', 'rej']}
                                        arrayLimiter={5}
                                        navigateTo={'Vehicle'}
                                        navigateToProps={
                                            {
                                                labels: ['ID', 'Make', 'Model', 'Year', 'VIN', 'REJ'],
                                                keys: ['id', 'brand', 'model', 'year', 'vin', 'rej'],
                                                buttonTitle: 'More Vehicle information',
                                                listHeader: 'Repairs history'
                                            }
                                        }
                                    />
                            }
                        </ScrollView>
                    </Row>
                </Grid>
            </Container>
        )
    }
}

export default KeyboardInput