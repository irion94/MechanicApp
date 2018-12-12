import * as React from 'react'
import {Image, TouchableOpacity, View} from "react-native";

class OptionScreen extends React.Component {
    state = {};


    render() {
        return (
            <View style={{flex: 1}}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={{width: 50, height: 50}}>
                        <Image
                            source={{uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQX8wezdDj-dV6lKgG8Dw00xe4BijUXNN7yiyKO_uR5pykNVb6T_g'}}
                            style={{height: '30%', width: '100%', flex: 1}}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


export default (OptionScreen)