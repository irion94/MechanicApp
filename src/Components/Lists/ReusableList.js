/**
 * This component takes require props and create list of items with keys.
 * Props:
 *      objectKeys - array of string, contains keys of object ( ['id', 'title', 'description'] )
 *      input - string, word to research
 *      array - array of objects
 *      arrayLimiter - to limit results view
 */

import * as React from 'react'
import {List} from "react-native-elements";
import {ListItem, Left, Body, Right, Text, View} from 'native-base'
import * as R from 'ramda'
import searchInArray from 'src/Utilities/FuseJS'
import PropTypes from 'prop-types'
import {withNavigation} from 'react-navigation'
import {Grid, Col, Row} from 'react-native-easy-grid'

const uuid = require('uuid/v4');

const ReusableList = (props) => {
    let {array, input, objectKeys, arrayLimiter, setFilteredArray, navigateTo, navigateToProps, col} = props;
    console.log('props', props)

    const onResearch = () => {
        let filteredArray;
        let keys = R.pipe(
            R.map(R.pick(["key"])),
            R.pluck("key"),
            //R.flatten
        )(objectKeys);

        //console.log(keys)
        if (arrayLimiter) {
            filteredArray = searchInArray(keys, input, array).slice(0, arrayLimiter);
        }
        else {
            filteredArray = searchInArray(keys, input, array)
        }

        console.log(filteredArray)

        setFilteredArray(filteredArray);
        return filteredArray;
    };

    let arr = onResearch();


    return (
        <List containerStyle={{width: '100%'}}>

            {
                R.map(object => {
                    return <ListItem
                        onPress={() => props.navigation.navigate({
                                routeName: navigateTo,
                                params: {...navigateToProps, ...object},
                                key: uuid()
                            }
                        )}
                        key={object._id}
                        style={[{flex: 1}, arr[0] === object && input.length > 5 ? {backgroundColor: 'rgba(238, 63, 63, 0.21)'} : {}]}
                    >
                        <Body>
                        {
                            col ? (
                                    <Grid>
                                        {
                                            R.map((item) => (
                                                <Row
                                                    style={{fontSize: 10, height: 20}}
                                                    key={item.key}
                                                >
                                                    <Col>
                                                        <Text note>{item.label + ':\n'}</Text>
                                                    </Col>
                                                    <Col>
                                                        <Text>{object[item.key] + '\n'}</Text>
                                                    </Col>
                                                </Row>


                                            ), objectKeys)
                                        }
                                    </Grid>
                                ) :

                                R.map((item) => (
                                    <View
                                        style={{fontSize: 10}}
                                        key={item.key}
                                    >
                                        <Text note>{item.label + ':\n'}</Text>
                                        <Text>{object[item.key] + '\n'}</Text>
                                    </View>


                                ), objectKeys)

                        }
                        </Body>
                    </ListItem>
                }, input === ''
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
    setFilteredArray: PropTypes.func.isRequired,
    input: PropTypes.string,
    arrayLimiter: PropTypes.number,
    alertFirst: PropTypes.bool,
    navigateTo: PropTypes.any,
    navigateToProps: PropTypes.object,
    col: PropTypes.bool
};

ReusableList.defaultProps = {
    arrayLimiter: 0,
    input: '',
    alertFirst: false,
    navigateToProps: {},
    col: true
};