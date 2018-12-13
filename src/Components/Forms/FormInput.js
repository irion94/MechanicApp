import * as React from 'react'
import UniversalFormInput from "./UniversalFormInput";
import {map} from 'ramda'
import {observer} from "mobx-react";
import Col from "react-native-easy-grid/Components/Row";

@observer
class FormInput extends React.Component {
    constructor(props) {
        super(props);
    }

    inputs = {};

    focusNextField = (nextInput) => {
        this.inputs[nextInput]._root.focus();
    }


    render() {
        const {keys, disabled} = this.props;
        let rows = Math.ceil(keys.length / 2);
        let k = [];
        for (let i = 0; i <= rows; i = i + rows) {
            k.push(keys.slice(i, rows + i))
        }
        return (

                    map( item =>
                        <Col>
                            {
                                map((key) =>
                                    <UniversalFormInput key={key}
                                                        stateKey={key}
                                                        onChangeText={this.props.onChangeText}
                                                        disabled={disabled}
                                                        focusNextField={this.focusNextField}
                                                        nextKey={keys[keys.indexOf(key) + 1]}
                                                        inputs={this.inputs}
                                                        onSend={this.props.onSend}
                                    />, item)
                            }
                        </Col> , k
                    )

        )
    }

}

export default FormInput