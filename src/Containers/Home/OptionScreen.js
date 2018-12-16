import * as React from 'react'
import {Image, TouchableOpacity, View, Picker} from "react-native";
import {makeGenerator} from "../../ObjectGenerator";

class OptionScreen extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            selected:{
                brand: "Audi"
            }
        }
    }

    onChangeValue = (obj) =>{
        this.setState({selected:obj});
        console.log(this.state, obj)
    }

    render() {
        let array = makeGenerator();
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

                <Picker
                    mode={'dialog'}
                    selectedValue={this.state.language}
                    style={{ height: 50, width: 100 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({language: itemValue})}>
                    <Picker.Item label="Java" value="java" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
            </View>
        );
    }
}


export default (OptionScreen)