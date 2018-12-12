import * as React from 'react'
import {View} from "react-native";
import {Button, Form, Text} from "native-base";
import UniversalFormInput from "./UniversalFormInput";
import {map} from 'ramda'
import {observer} from "mobx-react";

@observer
class FormInput extends React.Component {
    constructor(props) {
        super(props);
    }

    _onPress = () => {
        this.props.onBack();
        this.props.navigation.pop();
    };



    render() {
        const {keys, disabled} = this.props;
        return(
            <View style={{flex: 1, width: '100%'}}>
                <Form style={[{margin: 5, padding: 15}]}>
                    {
                        map((key) => <UniversalFormInput key={key}
                                                         stateKey={key}
                                                         onChangeText={this.props.onChangeText}
                                                         disabled={disabled}
                        />, keys)
                    }
                </Form>
                <Button onPress={this._onPress}>
                    <Text>Next</Text>
                </Button>
            </View>
        )
    }

}

export default FormInput