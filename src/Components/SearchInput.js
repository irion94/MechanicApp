import * as React from 'react'
import {Input, Item} from "native-base";
import {Icon} from "react-native-elements";

/**
 * @param props onChangeText => function , placeholder => string
 * @constructor
 */

const SearchInput = (props) => {
    let handleText = (input) => {
        props.onChangeText(input);
    };

    return(
        <Item style={{backgroundColor: 'white'}}>
            <Icon name='search' type={'EvilIcons'} iconStyle={{marginLeft: 10}}/>
            <Input placeholder={props.placeholder} onChangeText={(input) => handleText(input)}/>
        </Item>
    )
};

export default SearchInput;