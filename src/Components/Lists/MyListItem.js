import {Item, Label, ListItem, Text} from "native-base";
import React from "react";
import PropTypes from 'prop-types'

const MyListItem = (props) => {
    let {label, value} = props;
    console.log(props)
    return (
        <ListItem itemDivider={true}>
            <Item fixedLabel>
                <Label>{label}</Label>
                <Text>{value}</Text>
            </Item>
        </ListItem>
    )
}

MyListItem.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired
};


export default MyListItem