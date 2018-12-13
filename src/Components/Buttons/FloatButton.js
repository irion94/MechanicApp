import React,{Component} from 'react';
import {Fab} from 'native-base';
import {Button, Icon} from 'react-native-elements'
import {withNavigation} from "react-navigation";

class FloatButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
    }

    _onPressIcon(path: string) {
        this.setState({active: false},() => this.props.navigation.navigate(path) );

    }

    _onPressFab () {
        this.setState({active: !this.state.active})
    }

    render() {
        return (

            <Fab
                active={this.state.active}
                direction="up"
                style={{backgroundColor: 'red'}}
                position="bottomRight"
                onPress={() => this._onPressFab()}
            >
                <Icon name="plus" type={'entypo'} color={'white'}/>
                <Button style={{backgroundColor: '#c4c4c4'}}
                        title={'Exist'}
                        onPress={() => this._onPressIcon('Create')}
                >
                    <Icon name="ios-person-add" type={'ionicon'}/>
                </Button>
                <Button style={{backgroundColor: '#c4c4c4'}}
                        title={'Not exist'}
                        onPress={() => this._onPressIcon('NewRepair')}
                >
                    <Icon name="car-hatchback" type={'material-community'}/>
                </Button>
            </Fab>

        );
    }
}

export default withNavigation(FloatButton)