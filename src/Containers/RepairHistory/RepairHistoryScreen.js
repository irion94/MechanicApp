import React, {Component} from 'react'
import {View, FlatList} from 'react-native'
import {Body, Button, Container, Content, Header, Icon, Left, List, ListItem, Right, Text,} from "native-base";
import {applicationColor, applicationFontSize} from "../../Styles/UniversalStyles";
import {map} from 'ramda'
import FloatButton from "../../Components/Buttons/FloatButton";
import MyListItem from "../../Components/Lists/MyListItem";
import PropTypes from 'prop-types'
import ReusableList from "../../Components/Lists/ReusableList";

class RepairHistoryScreen extends Component {

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
        let {labels, keys, buttonTitle, listHeader, created_at, finished} = params;
        console.log(params);
        return (
            <View style={{justifyContent: 'center', flexDirection: 'column', height: '100%'}}>
                <View>
                    <List>
                        <MyListItem label={'Created at:'} value={created_at}/>
                        <MyListItem label={'Finished:'} value={finished.toString()}/>

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
                            <ReusableList
                                array={params.repairsList}
                                setFilteredArray={() => {
                                }}
                                objectKeys={[{label:'Title', key:'tytul'}, {label:'Description', key:'opis'}]}
                                //arrayLimiter={5}
                                navigateTo={'Home'}
                                col={false}
                                navigateToProps={
                                    {
                                        labels: ['Title', 'Description'],
                                        keys: ['tytul', 'opis'],
                                        //buttonTitle: 'More Vehicle information',
                                        listHeader: `Repair at ${created_at}`
                                    }
                                }
                            />
                        </List>
                    </Content>
                </Container>
                <FloatButton/>
            </View>
        )
    }
}

RepairHistoryScreen.propTypes = {
    objectKeys: PropTypes.array.isRequired,
    labels: PropTypes.array.isRequired,
    buttonTitle: PropTypes.string.isRequired,
};

RepairHistoryScreen.defaultProps = {
    objectKeys: [],
    labels: [],
    buttonTitle: '',
    headerTitle: ''
}

export default RepairHistoryScreen