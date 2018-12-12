import * as React from 'react'
import {View, TouchableOpacity, Image} from "react-native";
import {Button, Text, Content} from "native-base";
import FormInput from "../../Components/FormInput";
import Information_ListItem from "../../Components/Information_ListItem";
import personStore from 'src/Stores/Create_store'
import {observer} from "mobx-react";
//import scan from 'src/images/scan.gif'

@observer
class KeyboardInput extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = {
            rerender: false
        };
    }

    onChangeTextPerson = (obj) => {
        personStore.setPerson(obj)
        console.log('person', personStore.getPerson())
    };

    onChangeTextVehicle = (obj) => {
        personStore.setVehicle(obj)
        console.log('vehicle', personStore.getVehicle())
    };

    onBack = () => {
        this.setState({rerender: true})
    };

    onPersonPress = () => {
        this.props.navigation.navigate('NewCustomer_Picker', {
            component: <FormInput navigation={this.props.navigation}
                                  keys={['name', 'surname', 'phone', 'email']}
                                  disabled={false}
                                  onChangeText={this.onChangeTextPerson}
                                  onBack={this.onBack}
            />
        })
    }

    onVehiclePress = () => {
        this.props.navigation.navigate('NewCustomer_Picker', {
            component: <FormInput navigation={this.props.navigation}
                                  keys={['brand', 'model', 'vin', 'rej']}
                                  disabled={false}
                                  onChangeText={this.onChangeTextVehicle}
                                  onBack={this.onBack}
            />
        })
    }

    render(){
        return(
            <FormInput navigation={this.props.navigation}
                       keys={['name', 'surname', 'phone', 'email']}
                       disabled={false}
                       onChangeText={this.onChangeTextPerson}
                       onBack={this.onBack}
            />
        )
    }

    // render() {
    //     let person = personStore.getPerson().name;
    //     let vehicle = personStore.getVehicle().brand;
    //     return (
    //         <Content padder>
    //             <Content>
    //
    //                 <Button
    //                     style={{width: '100%', height: 'auto'}}
    //                     light
    //                     onPress={() => this.onPersonPress()}
    //                 >
    //                     {
    //                         person !== '' ?
    //                             <Information_ListItem
    //                                 object={personStore.getPerson()}
    //                                 onPress={this.onPersonPress}
    //                                 header={"Personal Information"}
    //                             />
    //
    //                             : <Text>Personal Information</Text>
    //                     }
    //                 </Button>
    //             </Content>
    //
    //             <Content style={{marginTop:10}}>
    //                 {person !== '' ?
    //                     <Button style={{width: '100%', height: 'auto'}}
    //                             light
    //                             onPress={() => this.onVehiclePress()}
    //                     >
    //                         {
    //                             vehicle !== '' ?
    //                                 <Information_ListItem object={personStore.getVehicle()}
    //                                                       onPress={this.onVehiclePress}
    //                                                       header={"Vehicle Information"}
    //                                 />
    //
    //                                 : <Text>Vehicle Information</Text>
    //                         }
    //                     </Button>
    //                     :
    //                     null
    //                 }
    //             </Content>
    //             {
    //                 vehicle !== '' ?
    //                     <Button style={{width: '100%', height: 'auto'}}>
    //                         <Text>add</Text>
    //                     </Button>
    //                     : null
    //             }
    //         </Content>
    //     )
    // }
}

export default KeyboardInput