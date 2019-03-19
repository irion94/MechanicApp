import * as React from 'react'
import {Alert, ScrollView, View} from "react-native";
import {Body, Button, Container, Header, Icon, Left, Right, Text} from "native-base";
import {observer} from "mobx-react";
import {Grid, Row} from "react-native-easy-grid";
import createStore from 'src/Stores/ScannerStore'
import customerStore from "../../Stores/dbData/CustomerStore";
import vehicleStore from "../../Stores/dbData/VehicleStore";
import ReusableList from "../../Components/Lists/ReusableList";
import FormInput from "../../Components/Forms/FormInput";
import {applicationColor} from "../../Styles/UniversalStyles";
import brandModelStore from "../../Stores/dbData/BrandModelList_Store";
import {fetchAllClientData, fetchVehicleInProgress} from "../../api/ApiUtils";
import Loading from "../../Components/Loading";


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
            filteredArray: [{}],
            loading: true
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
                                //createStore.reset(); //deprecated
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

        if (form === 1 ? customerStore.getFilteredArray().length !== 0 : vehicleStore.getFilteredArray().length !== 0) {
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

    //TODO: Loading Brand Model Data is here!
    componentDidMount() {
        brandModelStore.setBrandList().then(() => this.setState({array: brandModelStore.brandList}))
    }

    async componentWillMount() {
        this.setState({loading: true});
        fetchAllClientData()
            .then((result) => {
                customerStore.setCustomerArray(result);
            })
            .then(() => this.setState({loading: false}))
    }

    render() {
        if (!this.state.loading) {
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
                                            array={customerStore.getCustomerArray()}
                                            setFilteredArray={customerStore.setFilteredArray}
                                            input={this.state.inlineInput}
                                            objectKeys={[
                                                {label: 'Name', key: 'imieWlascicielaPojazdu'},
                                                {label: 'Surname', key: 'nazwiskoWlascicielaPojazdu'},
                                                {label: 'Full name', key: 'nazwaWlascicielaPojazdu'},
                                                {label: 'Phone', key: 'numerTelefonu'},
                                                {label: 'e-mail', key: 'email'}]}
                                            primaryKey={'phone'}
                                            arrayLimiter={5}
                                            navigateTo={'Customer'}
                                            navigateToProps={
                                                {
                                                    labels: ['First Name:', 'Surname:', 'Full name:', 'Phone:', 'e-mail:'],
                                                    keys: ['imieWlascicielaPojazdu', 'nazwiskoWlascicielaPojazdu', 'nazwaWlascicielaPojazdu', 'numerTelefonu', 'email'],
                                                    buttonTitle: 'More information',
                                                    listHeader: 'Vehicles List',
                                                }
                                            }
                                        />
                                        :
                                        <ReusableList
                                            array={vehicleStore.getVehicleArray()}
                                            setFilteredArray={vehicleStore.setFilteredArray}
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
        else {
            return <Loading/>

        }
    }
}

export default KeyboardInput