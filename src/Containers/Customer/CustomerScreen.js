import React, {Component} from 'react'
import {View} from 'react-native'
import {Body, Button, Container, Content, Header, Icon, Left, List, Right, Text,} from "native-base";
import {applicationColor, applicationFontSize} from "../../Styles/UniversalStyles";
import {map} from 'ramda'
import ReusableList from "../../Components/Lists/ReusableList";
import FloatButton from "../../Components/Buttons/FloatButton";
import vehicleList_Store from "../../Stores/VehicleList_Store";
import selectedCustomer_Store from "../../Stores/SelectedCustomer_Store";
import MyListItem from "../../Components/Lists/MyListItem";
import PropTypes from 'prop-types'

class CustomerScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        header: () => {
            const {params = {hideTabBar: true}} = navigation.state;
            return (
                <Header searchBar rounded style={{backgroundColor: applicationColor.header}}>
                    <Left>
                        <Button transparent onPress={
                            () => {
                                //createStore.reset();
                                navigation.goBack();
                            }
                        }
                        >
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                    <Text style={{fontWeight: '700', color: 'white'}}>
                        Customer
                    </Text>
                    </Body>
                    <Right/>
                </Header>
            )
        },
    });

    componentWillMount() {
        selectedCustomer_Store.setCustomer(this.props.navigation.state.params);
        selectedCustomer_Store.setCustomersVehicles();
    }

    render() {
        let params = this.props.navigation.state.params;
        let {labels, keys, buttonTitle, listHeader} = params;
        console.log(params);
        return (
            <View style={{justifyContent: 'center', flexDirection: 'column', height: '100%'}}>
                <View>
                    <List>
                        {
                            map(item => {
                                let index = keys.indexOf(item);
                                return <MyListItem key={index} label={labels[index]} value={params[item]}/>
                            }, keys)
                        }
                        <Button
                            style={{
                                backgroundColor: applicationColor.gray,
                                borderBottomRightRadius: 10,
                                borderBottomLeftRadius: 10
                            }}
                            full
                        >
                            <Text>{buttonTitle}</Text>
                        </Button>
                    </List>
                </View>
                <Button
                    style={{
                        marginTop: 10,
                        backgroundColor: applicationColor.header,
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10
                    }}
                    disabled
                    full
                >
                    <Text style={{fontSize: applicationFontSize.medium}}>{listHeader}</Text>
                </Button>
                <Container>
                    <Content style={{height: '100%'}}>
                        <List>
                            <ReusableList
                                array={vehicleList_Store.getVehicleArray()}
                                setFilteredArray={vehicleList_Store.setFilteredArray}
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
                        </List>
                    </Content>
                </Container>
                <FloatButton/>
            </View>
        )
    }
}

CustomerScreen.propTypes = {
    objectKeys: PropTypes.array.isRequired,
    labels: PropTypes.array.isRequired,
    buttonTitle: PropTypes.string.isRequired,
};

CustomerScreen.defaultProps = {
    objectKeys: [],
    labels: [],
    buttonTitle: '',
    headerTitle: ''
}

export default CustomerScreen