import {Item, Label, ListItem, Text, Button, Icon} from "native-base";
import {TextInput, TouchableOpacity} from 'react-native'
import React from "react";
import PropTypes from 'prop-types'
import createStore from "../../Stores/ScannerStore";

class MyListItem extends React.Component {
    // constructor(props){
    //     super(props);
    //     this.state = {
    //         editable: false
    //     }
    // }
    state = {
        editable: false
    };

    edit(){
        if(this.props.edit.editButton){
            return (
                <TouchableOpacity
                    onPress={()=>{
                        this.setState({editable: !this.state.editable})
                    }}
                >
                    <Icon
                        type={"AntDesign"}
                        name={"edit"}
                        //color={this.state.editable ? "black" : 'blue'}
                        style={this.state.editable ? {color: 'green'} : {color:'black'}}
                    />
                </TouchableOpacity>
            )
        }
    }

        render(){
            let {label, value ,objectKey, storePosition, edit} = this.props;
            return (
                <ListItem itemDivider={true}>
                    <Item fixedLabel>
                        <Label>{label}</Label>
                        <TextInput
                            editable={edit.editable ? true : this.state.editable}
                            style={{minWidth: 150}}
                            onChangeText={(value) => {
                                createStore.changePersonalitiesValue(value, storePosition, objectKey);
                            }}
                            value={value}
                        />
                        {
                            this.edit()
                        }

                    </Item>
                </ListItem>
            )
        }
}

MyListItem.propTypes = {
    label: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    objectKey: PropTypes.number,
    storePosition: PropTypes.string,
    edit: PropTypes.object
};

MyListItem.defaultProps = {
    edit: {
        edit: false,
        editButton: false
    },
    storePosition: '',
    objectKey: 0
};


export default MyListItem