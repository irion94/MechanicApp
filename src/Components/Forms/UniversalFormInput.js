/**
 * Standardized form input used to in whole application
 * @param props stateKey
 * @constructor
 */

import * as React from 'react'
import {Input, Item, Label,} from "native-base";
import objectDeepFromEntries from "object-deep-from-entries"

const UniversalFormInput = (props) => {
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
        <Item floatingLabel={true} style={{width:'100%', flex:1, margin:15}}>
            <Label style={{textAlign: 'center'}}>{placeholder}</Label>
            <Input disabled={disabled}
                   onChangeText={(text) => _onChangeText(text)}
                   defaultValue={'ehh'}
                   //blurOnSubmit={false}
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

export default UniversalFormInput