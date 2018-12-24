import React, {Component} from 'react'
import {View} from 'react-native'
import {Body, Button, Container, Content, Header, Icon, Left, List, ListItem, Right, Text,} from "native-base";
import {applicationColor, applicationFontSize} from "../../Styles/UniversalStyles";
import {map} from 'ramda'
import FloatButton from "../../Components/Buttons/FloatButton";
import MyListItem from "../../Components/Lists/MyListItem";
import PropTypes from 'prop-types'

class VehicleScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        header: () => {
            const {params} = navigation.state;
            return (
                <Header searchBar rounded style={{backgroundColor: applicationColor.header}}>
                    <Left>
                        <Button transparent onPress={
                            () => {
                                //createStore.reset();
                                navigation.goBack();
                            }
                        }
                        >
                            <Icon name='arrow-back'/>
                        </Button>
                    </Left>
                    <Body>
                    <Text style={{fontWeight: '700', color: 'white'}}>
                        Vehicle
                    </Text>
                    </Body>
                    <Right/>
                </Header>
            )
        },
    });

    render() {
        let params = this.props.navigation.state.params;
        let {labels, keys, buttonTitle, listHeader} = params;
        console.log(params);
        return (
            <View style={{justifyContent: 'center', flexDirection: 'column', height: '100%'}}>
                <View>
                    <List>
                        {
                            map(item => {
                                let index = keys.indexOf(item);
                                return <MyListItem key={index} label={labels[index]} value={params[item]}/>
                            }, keys)
                        }
                        <Button
                            style={{
                                backgroundColor: applicationColor.gray,
                                borderBottomRightRadius: 10,
                                borderBottomLeftRadius: 10
                            }}
                            full
                        >
                            <Text>{buttonTitle}</Text>
                        </Button>
                    </List>
                </View>
                <Button
                    style={{
                        marginTop: 10,
                        backgroundColor: applicationColor.header,
                        borderTopRightRadius: 10,
                        borderTopLeftRadius: 10
                    }}
                    disabled
                    full
                >
                    <Text style={{fontSize: applicationFontSize.medium}}>{listHeader}</Text>
                </Button>
                <Container>
                    <Content style={{height: '100%'}}>
                        <List>
                            <ListItem>
                                <MyListItem label={'Todolist'} value={'Value'}/>
                            </ListItem>
                        </List>
                    </Content>
                </Container>
                <FloatButton/>
            </View>
        )
    }
}

VehicleScreen.propTypes = {
    objectKeys: PropTypes.array.isRequired,
    labels: PropTypes.array.isRequired,
    buttonTitle: PropTypes.string.isRequired,
};

VehicleScreen.defaultProps = {
    objectKeys: [],
    labels: [],
    buttonTitle: '',
    headerTitle: ''
}

export default VehicleScreen