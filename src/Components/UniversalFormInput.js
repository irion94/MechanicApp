/**
 * Standardized form input used to in whole application
 * @param props stateKey
 * @constructor
 */

import * as React from 'react'
import {Input, Item, Label,} from "native-base";
import objectDeepFromEntries from "object-deep-from-entries"
import personStore from "../Stores/Create_store";

const UniversalFormInput = (props) => {
    let {stateKey, onChangeText, optional, disabled} = props;
    let placeholder = stateKey.charAt(0).toUpperCase() + stateKey.slice(1);

    if (optional) {
        placeholder = placeholder.concat(' (optional)');
    }

    let _onChangeText = (text) => {
        let object = objectDeepFromEntries([[stateKey, text]]);
        onChangeText(object)
    };

    return (
        <Item floatingLabel={true}>
            <Label style={{textAlign: 'center'}}>{placeholder}</Label>
            <Input disabled={disabled} onChangeText={(text) => _onChangeText(text)}/>
        </Item>
    )
};

export default UniversalFormInput