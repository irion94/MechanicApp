import * as React from 'react'
import {Header, Icon, Picker} from "native-base";
import {map} from "ramda";
import {Platform, StyleSheet, TouchableOpacity} from "react-native";
import {borderStyles, universalStyles} from "src/Styles/UniversalStyles";
import searchInArray from "../../Utilities/FuseJS";
import SearchInput from "../Forms/SearchInput";
import {applicationColor} from "../../Styles/UniversalStyles";
import PropTypes from 'prop-types'
import {observer} from "mobx-react";


/**
 * WORK WITH IOS ONLY
 * Props: selectedValue - function, return selected value (required)
 *        SearchKeys - keys for ramdajs research (required)
 *        array - array of objects (required)
 *        withKeys - specify if keys are showing (optional)
 *        style - (optional)
 *        TODO: props describing object-key (printed title od Picker
 */
@observer
class ReusablePicker extends React.Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
        }

    }

    onChange = (obj) => {
        this.setState({selected: obj}, () => this.props.onChangeValue(obj))
    }

    onChangeText = (search) => {
        this.setState({search});
    };

    render() {
        let {array, searchByKeys, withKeys, deeperKey, placeholder} = this.props;
        if(Platform.OS === 'android') {
            return (
                <Picker
                    style={[componentStyle.picker, borderStyles.border]}
                    placeholder={placeholder}
                    selectedValue={this.state.selected}
                    onValueChange={this.onChange.bind(this)}
                >
                    {
                        map((item) => (
                            <Picker.Item
                                key={item[placeholder]}
                                label={item.brand}
                                value={item}
                            />
                        ), this.state.search === '' ? array : searchInArray(searchByKeys, this.state.search, array))
                    }
                </Picker>
            )
        }
        else {
            return (
                <Picker
                    style={[componentStyle.picker, borderStyles.border]}
                    renderHeader={(backAction) => (
                        <PickerHeader
                            backAction={backAction}
                            onChangeText={this.onChangeText}
                            //showContent={}
                        />
                    )}
                    placeholder={placeholder}
                    iosIcon={<Icon name="ios-arrow-down-outline"/>}
                    selectedValue={this.state.selected}
                    onValueChange={this.onChange.bind(this)}
                >
                    {
                        map((item) => (
                            <Picker.Item
                                key={item}
                                label={
                                    map((key) =>
                                        (withKeys ? key.toString().toUpperCase() + ": " : '') + (deeperKey && item[key][deeperKey] !== undefined ? item[key][deeperKey] : item[key]) + ' \n', searchByKeys).toString().split(',')
                                }
                                value={item}
                            />
                        ), this.state.search === '' ? array : searchInArray(searchByKeys, this.state.search, array))
                    }
                </Picker>
            )
        }
    }
}


const PickerHeader = (props: any) => {

    return (
        <Header searchBar rounded style={{backgroundColor: applicationColor.header}}>
            <TouchableOpacity
                style={universalStyles.centerItem}
                onPress={props.backAction}
            >
                <Icon name='arrow-back' color={'white'}/>
            </TouchableOpacity>
            <SearchInput onChangeText={props.onChangeText} placeholder={'Search...'} autoFocus={true}/>
            <TouchableOpacity
                style={universalStyles.centerItem}
                onPress={() => {
                    //TODO
                }}
            >
                <Icon name={'ios-add-circle'}/>
            </TouchableOpacity>
        </Header>
    )
};

const componentStyle = StyleSheet.create({
    picker: {
        width: '95%',
        //height: 'auto',

    }
});

ReusablePicker.propTypes = {
    array: PropTypes.any.isRequired,
    searchByKeys: PropTypes.array.isRequired,
    //deeperKey: PropTypes.string.isRequired,
    withKeys: PropTypes.bool,
    placeholder: PropTypes.string,
    onChangeValue: PropTypes.func
};

ReusablePicker.defaultProps = {
    array: [],
    searchByKeys: [],
    withKeys: false,
    placeholder: '',
    onChangeValue: () => {
    }
};


export default ReusablePicker

