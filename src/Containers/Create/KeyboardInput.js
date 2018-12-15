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
import {makeGenerator, modelGenerator, randomModel} from "../../ObjectGenerator";


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
            array: makeGenerator()
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
        }

    });


    onChangeTextPerson = (obj) => {
        createStore.setPersonalities(obj, 'person');
        this.setState({inlineInput: createStore.getPersonalities('person', 'inline')})
    };

    onChangeTextVehicle = (obj) => {
        this.setState({...this.state, ...obj});
        console.log(obj)
        // console.log('keyboard input state', this.state.vehicleSelected)
        //createStore.setPersonalities(obj, 'vehicle');
        //this.setState({inlineInput: createStore.getPersonalities('vehicle', 'inline')})
    };

    onSend = () => {
        let onPress = () => {
            this.setState({inlineInput: ''});
            this.setState({form: 2});
            this.props.navigation.setParams({title: 'Vehicle Inf'})
        };

        if (customerList_Store.getFilteredArray().length > 0) {
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

    render() {
        console.log('keyboar input', this.state)
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
                                                   disabled={false}
                                                   onChangeText={this.onChangeTextVehicle}
                                                   onSend={this.onSend}
                                                   oneColumn={false}
                                                   pickerProps={{
                                                       pickerKeys:['brand','model'],
                                                       picker:{
                                                           brand: {
                                                               array:this.state.array,
                                                               keys: ['brand'],
                                                               //vehicleSelected: this.state.vehicleSelected.brand,
                                                           },
                                                           model:{
                                                               array:  createStore.personalities.vehicle !== undefined ? modelGenerator(createStore.personalities.vehicle.brand) : randomModel() ,
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
                                        input={this.state.inlineInput}
                                        objectKeys={['name', 'surname', 'email', 'phone']}
                                        arrayLimiter={4}
                                    />
                                    :
                                    <ReusableList
                                        array={vehicleList_Store.vehicleArray}
                                        input={this.state.inlineInput}
                                        objectKeys={['brand', 'model', 'vin', 'rej']}
                                        arrayLimiter={4}
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