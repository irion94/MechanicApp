import * as React from 'react'
import {ImageBackground, TouchableOpacity, View, StyleSheet, Alert} from 'react-native'
import {Button, CheckBox, Container, Content, Form, Input, Item, Label, List, Spinner, Text} from "native-base";
import Row from "react-native-easy-grid/Components/Row";
import Grid from "react-native-easy-grid/Components/Grid";
import wallpaper from 'src/images/wallpaper2.jpg'
import axios from 'axios'
import sessionStore from 'src/Stores/dbData/SessionStore'
import {fetchClientData} from "../../api/ApiUtils";


class LoginScreen extends React.Component <State, Props> {
    constructor(props) {
        super(props);
        this.state = {
            mechanic: false,
            customer: true,
            loading: true,

            email: '',
            password: '',
            login: {
                email: 'tomasz@wp.pl',
                password: 'lol123',
            }
        };
    }

    static navigationOptions = ({navigation}) => ({
        header: null
    });

    onChangeText = (obj) => {
        this.setState(obj, () => console.log('state', this.state))
    };

    onPressCheckBox = () => {
        this.setState({customer: !this.state.customer});
        this.setState({mechanic: !this.state.mechanic});
    };

    onPressButton = () => {
        this.setState({loading: true});
        console.log(this.state.login);
        ///axios.get('http://localhost:3000/users/', {
        axios.get('https://mechanicappserver.herokuapp.com/users/', {
            params: {
                email: this.state.login.email,
                password: this.state.login.password
            }
        })
            .then(
                (response) => {
                    const userData = response.data;
                    sessionStore.setId(userData);
                    //TODO: rzuć tu do bazy to wszystko pobierze sie przy jednym loadingu
                    fetchClientData()
                        .then(this.setState({loading: false}, () => this.props.navigation.navigate('MechanicView')))
                        .catch(error => Alert.alert(error));
                }
            )
            .catch(error => Alert.alert('error' + error))
            .then(() => this.setState({loading: false}))
    };

    fun() {
        this.setState({loading: false})
    };

    componentWillMount() {
        this.fun()
    };


    render() {
        if (!this.state.loading) {
            return (
                <Container>
                    <ImageBackground
                        source={wallpaper}
                        style={{width: '100%', height: '100%'}}
                        resizeMode='cover'
                    >

                        <Grid>
                            <Row size={90} style={{alignItems: 'center', margin: 10}}>
                                <Content scrollEnabled={false}>
                                    <Form style={{
                                        backgroundColor: 'white',
                                        borderRadius: 10,
                                    }}>
                                        <Item fixedLabel>
                                            <Label>Login</Label>
                                            <Input onChangeText={(username) => {
                                                console.log(username)
                                                this.setState({email: username})
                                            }
                                            }/>
                                        </Item>
                                        <Item fixedLabel>
                                            <Label>Password</Label>
                                            <Input secureTextEntry
                                                   onChangeText={(password) => this.setState({password: password})}/>
                                        </Item>
                                        <Item inlineLabel>
                                            <Label>Login as:</Label>
                                            <List style={{width: '100%'}}>
                                                <TouchableOpacity onPress={() => this.onPressCheckBox()}>
                                                    <Row style={{margin: 8}}>
                                                        <CheckBox
                                                            color={'grey'}
                                                            checked={this.state.mechanic}
                                                        />
                                                        <View style={{marginLeft: 20}}>
                                                            <Text>Mechanic</Text>
                                                        </View>
                                                    </Row>
                                                </TouchableOpacity>

                                                <TouchableOpacity onPress={() => this.onPressCheckBox()}>
                                                    <Row style={{margin: 8}}>
                                                        <CheckBox
                                                            color={styles.colors.color}
                                                            checked={this.state.customer}
                                                        />
                                                        <View style={{marginLeft: 20}}>
                                                            <Text>Customer</Text>
                                                        </View>
                                                    </Row>
                                                </TouchableOpacity>
                                            </List>
                                        </Item>
                                        <Button
                                            // onPress={() => this.onPressButton()}
                                            onPress={this.onPressButton()}
                                            style={{
                                                borderBottomRightRadius: 10,
                                                borderBottomLeftRadius: 10,
                                                marginTop: 15,
                                                backgroundColor: styles.colors.color
                                            }}
                                            full
                                        >
                                            <Text>Login</Text>
                                        </Button>
                                    </Form>
                                </Content>
                            </Row>
                            <Row size={10}>
                                <Content>
                                    <Button transparent full onPress={() => this.props.navigation.navigate('Create')}>
                                        <Text style={[{alignItems: 'center'}, styles.colors]}>Create new Firebase for
                                            Your
                                            company</Text>
                                    </Button>
                                </Content>
                            </Row>
                        </Grid>
                    </ImageBackground>
                </Container>
            )
        }
        else {
            return (
                <Container style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
                    <Spinner color={'black'}/>
                </Container>
            )
        }
    }
}

const styles = StyleSheet.create({
    colors: {
        color: '#43464B'
    }
})

export default LoginScreen