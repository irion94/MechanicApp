import * as React from 'react'
import {View} from "react-native";
import {Button, Form, Text} from "native-base";
import UniversalFormInput from "./UniversalFormInput";
import {borderStyles} from 'src/Styles/UniversalStyles';

class VehicleForm_input extends React.Component {
    constructor(props){
        super(props);
    }

    _onPress = () => {
        this.props.navigation.pop();
    };


    render() {
        console.log(this.props);
        return (
            <View style={{flex: 1}}>
                <Form style={[borderStyles.border, {margin: 5, padding: 15}]}>
                    <UniversalFormInput stateKey='brand' onChangeText={this.props.onChangeText}/>
                    <UniversalFormInput stateKey='model' onChangeText={this.props.onChangeText}/>
                    <UniversalFormInput stateKey='vin' onChangeText={this.props.onChangeText}/>
                    <UniversalFormInput optional stateKey='reg' onChangeText={this.props.onChangeText}/>
                </Form>

                <Button onPress={this._onPress}>
                    <Text>Next</Text>
                </Button>
            </View>
        )
    }

}

export default VehicleForm_input