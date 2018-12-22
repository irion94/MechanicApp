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
import PropTypes from 'prop-types'
import {withNavigation, NavigationActions} from 'react-navigation'


const ReusableList = (props) => {
    let {array, input, objectKeys, arrayLimiter, setFilteredArray, navigateTo} = props;

    const onResearch = () => {
        let filteredArray;
        if (arrayLimiter) {
            filteredArray = searchInArray(objectKeys, input, array).slice(0, arrayLimiter);
        }
        else {
            filteredArray = searchInArray(objectKeys, input, array)
        }

        setFilteredArray(filteredArray);
        return filteredArray;
    };

    let arr = onResearch();

    let promise = new Promise(resolve => {
        setTimeout(() => resolve(onResearch()), 3000)
    });

    promise.then((x) => console.log(x));

    return (
        <List>
            {
                map((object) => (
                    <ListItem
                        titleStyle={arr[0] === object && input.length > 5 ? {color:'red'} :{color:'black'}}
                        onPress={() => props.navigation.navigate(navigateTo)}
                        titleNumberOfLines={5}
                        key={object.id}
                        title={
                            map(item => {
                                    return item.charAt(0).toUpperCase() + item.slice(1) + ': ' + object[item] + '\n'
                                }
                                , objectKeys).join('')
                        }
                    />
                ), input === ''
                    ?
                    arrayLimiter ? array.slice(0, arrayLimiter) : array
                    :
                    arr)
            }
        </List>

    )
};


export default withNavigation(ReusableList);

ReusableList.propTypes = {
    array: PropTypes.any.isRequired,
    objectKeys: PropTypes.array.isRequired,
    primaryKey: PropTypes.string.isRequired,
    setFilteredArray: PropTypes.func.isRequired,
    input: PropTypes.string,
    arrayLimiter: PropTypes.number,
    alertFirst: PropTypes.bool,
    navigateTo: PropTypes.string
};

ReusableList.defaultProps = {
    arrayLimiter: 0,
    input: '',
    alertFirst: false
};