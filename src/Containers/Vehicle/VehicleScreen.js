import React, {Component} from 'react'
import {View} from 'react-native'
import {Body, Button, Container, Content, Header, Icon, Left, List, Right, Fab, Text,} from "native-base";
import {applicationColor, applicationFontSize} from "../../Styles/UniversalStyles";
import {map} from 'ramda'
import FloatButton from "../../Components/Buttons/FloatButton";
import MyListItem from "../../Components/Lists/MyListItem";
import PropTypes from 'prop-types'
import ReusableList from "../../Components/Lists/ReusableList";
import {fetchOneClientData} from "../../api/ApiUtils";
import Loading from "../../Components/Loading";

class VehicleScreen extends Component {
    state = {
        loading: false
    };


    static navigationOptions = ({navigation}) => ({
        header: () => {
            const {params} = navigation.state;
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
                        Vehicle
                    </Text>
                    </Body>
                    <Right/>
                </Header>
            )
        },
    });

    dateFormatChange(date) {
        const dateOptions = {day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric'};
        return new Date(date).toLocaleString(dateOptions);
    }

    componentWillMount() {
        let params = this.props.navigation.state.params;
        console.log("params", params)
        map(date => date.created_at = this.dateFormatChange(date.created_at), params.repairsHistory)
    }


    render() {
        let params = this.props.navigation.state.params;
        let {renderFrom, labels, keys, repairsHistory} = params;
        console.log("vehicleScreen", params);

        if (!this.state.loading) {
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
                                }}
                                full
                            >
                                <Text>More Vehicles Information</Text>
                            </Button>

                            {
                                renderFrom === "Todo" ?
                                    <Button
                                        style={{
                                            backgroundColor: applicationColor.gray,
                                            borderBottomRightRadius: 10,
                                            borderBottomLeftRadius: 10,
                                            marginTop: 10
                                        }}
                                        full
                                        onPress={() => {
                                            this.setState({loading: true});
                                            fetchOneClientData([{_id: params['clientId']}]).then((response) => {
                                                this.setState({loading: false});
                                                this.props.navigation.navigate({
                                                    routeName: 'Customer',
                                                    params: {
                                                        ...{
                                                            labels: ['First Name:', 'Surname:', 'Full name:', 'Phone:', 'e-mail:'],
                                                            keys: ['imieWlascicielaPojazdu', 'nazwiskoWlascicielaPojazdu', 'nazwaWlascicielaPojazdu', 'numerTelefonu', 'email'],
                                                            buttonTitle: 'More information',
                                                            listHeader: 'Vehicles List',
                                                        }, ...response
                                                    },
                                                });
                                            })
                                        }}
                                    >
                                        <Text>Owner</Text>
                                    </Button>
                                    : null
                            }
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
                        <Text style={{fontSize: applicationFontSize.medium}}>Repairs History</Text>
                    </Button>
                    <Container>
                        <Content style={{height: '100%', width: '100%'}}>
                            <List>
                                <ReusableList
                                    array={repairsHistory}
                                    setFilteredArray={() => {
                                    }}
                                    objectKeys={[{key: 'created_at', label: 'Created at'}]}
                                    //arrayLimiter={5}
                                    navigateTo={'RepairHistory'}
                                    navigateToProps={
                                        {
                                            labels: ['Created at:', 'Finished:'],
                                            keys: ['created_at', 'finished'],
                                            listHeader: 'Repairs history'
                                        }
                                    }
                                />
                            </List>
                        </Content>
                    </Container>
                    <Fab
                        onPress={() => this.props.navigation.navigate('TodoCreator')}
                        position={"bottomRight"}
                    >
                        <Icon name="up" type={"AntDesign"}/>
                    </Fab>
                </View>
            )
        }
        else {
            return <Loading/>
        }
    }

}

VehicleScreen.propTypes = {
    objectKeys: PropTypes.array.isRequired,
    labels: PropTypes.array.isRequired,
    buttonTitle: PropTypes.string.isRequired,
    renderFrom: PropTypes.string
};

VehicleScreen.defaultProps = {
    objectKeys: [],
    labels: [],
    buttonTitle: '',
    headerTitle: '',
    renderFrom: ''
}

export default VehicleScreen