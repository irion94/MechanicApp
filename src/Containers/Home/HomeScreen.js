import * as React from 'react'
import {Icon} from 'react-native-elements'
import {ScrollView, StyleSheet, View, StatusBar} from "react-native";
import {Header} from 'native-base';
import {applicationColor} from "../../Styles/UniversalStyles";
import SearchInput from "../../Components/Forms/SearchInput";

class HomeScreen extends React.Component <State, Props> {
    constructor(props) {
        super(props);
        this.state = {
            input: '',
            token: null
        };
    }

    static navigationOptions = ({navigation}) => ({
        header: () => {
            const {
                params = {
                    onChangeText: () => {
                    }
                }
            } = navigation.state;
            return (
                <Header  style={{backgroundColor: applicationColor.header}}>
                    <SearchInput onChangeText={params.onChangeText} placeholder={'Search in Todo...'}/>
                    <Icon
                        iconStyle={{marginBottom:5}}
                        name="settings"
                        size={40}
                        onPress={() => {
                            navigation.navigate('Option')
                        }}
                    />
                </Header>
            )
        }

    });

    onChangeText = (input) => {
        this.setState({input: input});
    };

    componentDidMount() {
        this.props.navigation.setParams({
            onChangeText: this.onChangeText
        })
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <StatusBar hidden />
                <ScrollView>
                    {/*<VehiclesListTodo navigation={this.props.navigation} props={this.props} from={'HomeScreen'}*/}
                    {/*input={this.state}/>*/}
                </ScrollView>
                {/*<FloatButton active={false}/>*/}
            </View>
        )
    }
}


export default (HomeScreen)