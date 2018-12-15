import * as React from 'react'
import {Input, Item} from "native-base";
import {StyleSheet} from 'react-native'
import {Icon} from "react-native-elements";
import PropTypes from 'prop-types'

/**
 * @param props onChangeText => function , placeholder => string
 * @constructor
 */

const SearchInput = (props) => {

    let {placeholder, onChangeText} = props;

    return (
        <Item style={styles.header}>
            <Icon name='search' type={'EvilIcons'} iconStyle={{marginLeft: 10}}/>
            <Input placeholder={placeholder} onChangeText={(input) => onChangeText(input)}/>
        </Item>
    )
};

SearchInput.propTypes = {
    onChangeText: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
};

SearchInput.defautProps = {
    placeholder: '',
};

const styles = StyleSheet.create({
    header: {
        backgroundColor: 'white',
        borderRadius: 25,
        flex: 1,
        flexDirection: 'row',
        margin: 5,
        marginTop: 5,
        marginBottom: 5
    }
});

export default SearchInput;