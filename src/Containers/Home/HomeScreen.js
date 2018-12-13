import * as React from 'react'
import {Icon} from 'react-native-elements'
import {ScrollView, StyleSheet, View} from "react-native";
import {Header} from 'native-base';
import {applicationColor} from "../../Styles/UniversalStyles";
import SearchInput from "../../Components/Forms/SearchInput";
import FloatButton from "../../Components/Buttons/FloatButton";

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
            const {params = {}} = navigation.state;
            return (
                <Header searchBar rounded style={{backgroundColor: applicationColor.header}}>
                    <SearchInput onChangeText={params.changeText} placeholder={'Search in TODO'}/>
                    <Icon
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

    changeText = (input) => {
        this.setState({input: input});
    };



    componentWillMount() {
        this.props.navigation.setParams({
            changeText: this.changeText
        })
    }

    render() {
        return (
            <View style={{flex: 1, backgroundColor: 'white'}}>
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

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: 'white'
    }
});


