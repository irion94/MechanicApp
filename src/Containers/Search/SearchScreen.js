import React, {Component} from 'react'
import {View} from "react-native";
import {Header} from "native-base";
import {styles} from "../Home/HomeScreen";
import {applicationColor} from "../../Styles/UniversalStyles";
import SearchInput from "../../Components/Forms/SearchInput";


class SearchScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input:''
        }
    }

    handleOnChangeText = (input) => {
        this.setState({input})
    };

    componentDidMount() {
        this.props.navigation.setParams({
            changeText: this.handleOnChangeText
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Header searchBar rounded style={{backgroundColor: applicationColor.header}}>
                    <SearchInput onChangeText={this.handleOnChangeText} placeholder={'Search in database'}/>
                </Header>
                {/*<PersonList input={this.state.input} input={this.state.input}/>*/}
                {/*<TodoComponent props={this.props} input={this.state}/>*/}
            </View>
        )
    }

}

export default SearchScreen


