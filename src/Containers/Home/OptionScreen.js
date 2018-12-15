import * as React from 'react'
import {Image, TouchableOpacity, View} from "react-native";
import ReusablePicker from "../../Components/Lists/ReusablePicker";
import createStore from "../../Stores/Create_store";
import {makeGenerator, modelGenerator} from "../../ObjectGenerator";

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
                    <ReusablePicker array={array} searchByKeys={['brand']} onChangeValue={this.onChangeValue} selected={this.state.selected} placeholder={'brand'}/>
                <ReusablePicker array={array} searchByKeys={['brand']} onChangeValue={this.onChangeValue} selected={this.state.selected} placeholder={'brand'}/>
            </View>
        );
    }
}


export default (OptionScreen)