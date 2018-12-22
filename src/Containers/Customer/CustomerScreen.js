import React, {Component} from 'react'
import {View} from 'react-native'
import {Body, Button, Header, Icon, Left, Right, Text} from "native-base";
import {applicationColor} from "../../Styles/UniversalStyles";
import createStore from "../../Stores/Create_store";

class CustomerScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        header: () => {
            const {params = {title: 'Personal Inf'}} = navigation.state;
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
                        {params.title}
                    </Text>
                    </Body>
                    <Right/>
                </Header>
            )
        }

    });

    render() {
        return (
            <View>
                <Text>
                    Customer Screeeeeeeen!
                </Text>
            </View>
        )
    }
}

export default CustomerScreen