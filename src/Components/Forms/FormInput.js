import * as React from 'react'
import {map} from 'ramda'
import {observer} from "mobx-react";
import Col from "react-native-easy-grid/Components/Row";
import objectDeepFromEntries from "object-deep-from-entries";
import {Input, Item, Label, View} from "native-base";
import {Platform} from 'react-native'
import PropTypes from 'prop-types'
import ReusablePicker from "../Lists/ReusablePicker";
import createStore from "../../Stores/ScannerStore";

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
        const {keys, disabled, oneColumn} = this.props;
        const {pickerKeys, picker} = this.props.pickerProps

        if (!oneColumn) {
            let rows = Math.ceil(keys.length / 2);
            let modifyKeys = [];
            if (rows > 1) {
                for (let i = 0; i <= rows; i = i + rows) {
                    modifyKeys.push(keys.slice(i, rows + i))
                }
            }
            else {
                modifyKeys.push(keys)
            }

            return (

                map(item =>
                    <Col key={item}>
                        {
                            map((key) => {
                                    if (pickerKeys !== undefined && pickerKeys.includes(key)) {
                                        return (
                                            <View style={{flex: 1, width: '100%'}} key={key}>
                                                <ReusablePicker
                                                    key={key}
                                                    array={picker[key].array}
                                                    searchByKeys={picker[key].keys}
                                                    onChangeValue={this.props.onChangeText}
                                                    placeholder={key}
                                                />
                                            </View>
                                        )
                                    }
                                    else {
                                        return (
                                            <UniversalFormInput
                                                key={key}
                                                stateKey={key}
                                                onChangeText={this.props.onChangeText}
                                                disabled={disabled}
                                                focusNextField={this.focusNextField}
                                                nextKey={keys[keys.indexOf(key) + 1]}
                                                inputs={this.inputs}
                                                onSend={this.props.onSend}
                                            />
                                        )
                                    }
                                },
                                item)
                        }
                    </Col>, modifyKeys)
            )
        }
        else {
            return (
                map((key) =>
                        <UniversalFormInput
                            key={key}
                            stateKey={key}
                            onChangeText={this.props.onChangeText}
                            disabled={disabled}
                            focusNextField={this.focusNextField}
                            nextKey={keys[keys.indexOf(key) + 1]}
                            inputs={this.inputs}
                            onSend={this.props.onSend}
                        />

                    ,
                    keys)
            )
        }
    }

}

export const UniversalFormInput = (props) => {
    let {nextKey, stateKey, onChangeText, optional, disabled} = props;
    let placeholder = stateKey.charAt(0).toUpperCase() + stateKey.slice(1);

    if (optional) {
        placeholder = placeholder.concat(' (optional)');
    }

    let _onChangeText = (text) => {
        let object = objectDeepFromEntries([[stateKey, text]]);
        onChangeText(object)
    };

    return (
        <Item floatingLabel={true} style={{width: '100%', flex: 1, margin: 15, backgroundColor:'white'}}>
            <Label style={{textAlign: 'center'}}>{placeholder}</Label>
            <Input
                disabled={disabled}
                autoCorrect={false}
                onChangeText={(text) => _onChangeText(text)}
                blurOnSubmit={nextKey !== undefined}
                returnKeyType={nextKey === undefined ? 'send' : 'next'}
                onSubmitEditing={nextKey === undefined ?
                    () => props.onSend() :
                    () => props.focusNextField(nextKey)}
                getRef={input => {
                    props.inputs[stateKey] = input
                }}
            />
        </Item>
    )
};

UniversalFormInput.propTypes = {
    nextKey: PropTypes.any,
    stateKey: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
    optional: PropTypes.bool,
    disabled: PropTypes.bool
};

UniversalFormInput.defaultProps = {
    nextKey: undefined,
    optional: false,
    disabled: false,
};


FormInput.propTypes = {
    keys: PropTypes.array.isRequired,
    onChangeText: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired,
    onBack: PropTypes.func,
    onSend: PropTypes.func,
    disabled: PropTypes.bool,
    pickerKey: PropTypes.any,
    //oneColumn: PropTypes.bool,
    pickerProps: PropTypes.object
};

FormInput.defaultProps = {
    onBack: () => {
    },
    onSend: () => {
    },
    disabled: false,
    pickerKey: false,
    //oneColumn: true,
    pickerProps: {}
};


export default FormInput