import {Item, Label, ListItem, Text} from "native-base";
import {TextInput} from 'react-native'
import React from "react";
import PropTypes from 'prop-types'
import createStore from "../../Stores/Create_store";

const MyListItem = (props) => {
        let {label, value ,objectKey, storePosition, editable} = props;
        return (
            <ListItem itemDivider={true}>
                <Item fixedLabel>
                    <Label>{label}</Label>
                    <TextInput
                        editable={editable}
                        style={{minWidth: 150}}
                        onChangeText={(value) => {
                            createStore.changePersonalitiesValue(value, storePosition, objectKey);
                        }}
                        value={value}
                    />
                </Item>
            </ListItem>
        )
}

MyListItem.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    objectKey: PropTypes.number,
    storePosition: PropTypes.string,
    editable: PropTypes.bool
};

MyListItem.defaultProps = {
    editable: false,
    storePosition: '',
    objectKey: 0
};


export default MyListItem