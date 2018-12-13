/**
 * This component takes require props and create list of items with keys.
 * Props:
 *      objectKeys - array of string, contains keys of object ( ['id', 'title', 'description'] )
 *      input - string, word to research
 *      array - array of objects
 *      arrayLimiter - to limit results view
 */

import * as React from 'react'
import {List, ListItem, Text} from "react-native-elements";
import {map} from 'ramda'
import searchInArray from 'src/Utilities/FuseJS'
import customerList_Store from "../../Stores/CustomerList_Store";
import PropTypes from 'prop-types'


const ReusableList = (props) => {
    let {array, input, objectKeys, arrayLimiter} = props;

    const onResearch = () => {
        let filteredArray;
        if (arrayLimiter) {
            filteredArray = searchInArray(objectKeys, input, array).slice(0, arrayLimiter);
        }
        else {
            filteredArray = searchInArray(objectKeys, input, array)
        }

        customerList_Store.setFilteredArray(filteredArray);
        return filteredArray;
    };

    return (
        <List>
            {
                map((object) => (
                    <ListItem
                        key={object.phone}
                        title={
                            map(item => {
                                    return <Text
                                        key={objectKeys.indexOf(item)}>{item.charAt(0).toUpperCase() + item.slice(1) + ': ' + object[item]}</Text>
                                }
                                , objectKeys)
                        }
                    />
                ), input === ''
                    ?
                    arrayLimiter ? array.slice(0, arrayLimiter) : array
                    :
                    onResearch())
            }
        </List>

    )
};


export default (ReusableList);

ReusableList.propTypes = {
    array: PropTypes.object.isRequired,
    objectKeys: PropTypes.array.isRequired,
    input: PropTypes.string,
    arrayLimiter: PropTypes.number
};

ReusableList.defaultProps = {
    arrayLimiter: 0,
    input: ''
};