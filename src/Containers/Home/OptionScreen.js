import * as React from 'react'
import {Alert, AppState, Text, TouchableOpacity, View} from "react-native";
import {Button} from "native-base"
import axios from 'axios'

import withNavigation from "react-navigation/src/views/withNavigation";

class OptionScreen extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {

        return (
            <View style={{flex: 1, alignItems: 'center'}}>

                <TouchableOpacity
                    style={{
                        backgroundColor: 'blue',
                        height: 50,
                        width: '100%',
                        justifyContent: 'center'
                    }}
                >
                    <Text style={{textAlign: 'center'}}> Przycisk </Text>
                </TouchableOpacity>


                <Button full onPress={() => axios.get('http://localhost:3000/users/logout').then(() => this.props.navigation.navigate('Login'))}>
                    <Text> Przycisk </Text>
                </Button>


            </View>
        );
    }
}


export default withNavigation(OptionScreen)