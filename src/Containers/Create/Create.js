import * as React from 'react'
import {Image, TouchableOpacity, View} from 'react-native';
import {Body, Button, Card, CardItem, Container, Header, Icon, Left, Right, Text} from 'native-base';
import keyboard from 'src/images/keyboard.gif'
import scan from 'src/images/scan.gif'
import {applicationColor} from "../../Styles/UniversalStyles";
import createStore from "../../Stores/ScannerStore";

export default class Create extends React.Component {
    constructor(props: any) {
        super(props);
    }

    static navigationOptions = ({navigation}) => ({
        header: () => {
            const {params = {title: 'Personal Inf'}} = navigation.state;
            return (
                <Header style={{height:1}}>

                </Header>
            )
        },
    });

    render() {
        return (
            <Container>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <CreateCard
                        text={"Scan AZTEC code to join new customer."}
                        note={"AZTEC code is located on every vehicle docs."}
                        image={scan}
                        navigate={'Scanner'}
                        navigation={this.props.navigation}
                    />
                    <CreateCard
                        text={"Fill out form with your keyboard."}
                        note={"If you haven't vehicle docs, choose this option."}
                        image={keyboard}
                        navigate={'KeyboardInput'}
                        navigation={this.props.navigation}
                    />
                </View>
            </Container>
        )
    }
}

const CreateCard = (props) => {
    let {text, note, image, navigate} = props;
    const onPress = () => {
        props.navigation.navigate(navigate)
    };

    return (
        <TouchableOpacity
            style={{flex: 1, width: '100%'}}
            onPress={() => onPress()}
        >
            <Card style={{flex: 1}}>
                <CardItem>
                    <Left>
                        <Body>
                        <Text>{text}</Text>
                        <Text note>{note}</Text>
                        </Body>
                    </Left>
                </CardItem>
                <CardItem cardBody>
                    <Image source={image} style={{width: null, flex: 1}}/>
                </CardItem>
            </Card>
        </TouchableOpacity>
    )
}