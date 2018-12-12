import * as React from 'react'
import {Image, TouchableOpacity, View} from 'react-native';
import {Body, Card, CardItem, Left, Text} from 'native-base';
import keyboard from 'src/images/keyboard.gif'
import scan from 'src/images/scan.gif'

export default class Create extends React.Component {
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <CreateCard
                    text={"Scan AZTEC code to join new customer."}
                    note={"AZTEC code is located on every vehicle documents."}
                    image={scan}
                    navigate={'KeyboardInput'}
                    navigation={this.props.navigation}
                />
                <CreateCard
                    text={"Fill out form with your keyboard."}
                    note={"If you haven't vehicle docs you choose this option."}
                    image={keyboard}
                    navigate={'KeyboardInput'}
                    navigation={this.props.navigation}
                />
            </View>
        )
    }
}

const CreateCard = (props) => {
    let {text, note, image, navigate} = props;
    console.log(props);
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