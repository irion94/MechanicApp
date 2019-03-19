import * as React from 'react';
import {ScrollView, View} from "react-native";
import {Body, Button, Container, Content, Form, Header, Icon, Left, List, ListItem, Right, Segment, Text, Textarea, Input, Label, Item} from "native-base";
import Swipeout from 'react-native-swipeout';
import {map} from 'ramda'
import {applicationColor, borderStyles} from "../../Styles/UniversalStyles";
import ImgToBase64 from 'react-native-image-base64';

/**
 * Component where we just create list of new thinks to do.
 * Text Area, Scrollable List
 */
class Todo {
    title;
    description;
    photos = [];

    constructor({title, description, photos}) {
        this.title = title;
        this.description = description;
        this.photos = photos
    }
}

class TodoCreator extends React.Component {

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

    state = {
        item: {
            title: '',
            description: '',
            photos: [],
        },

        todos: []
    };

    _onPressAdd = () => {

        const todo = new Todo(this.state.item);
        console.log(todo)
        this.state.todos.push(todo);

        this.setState({item: {}})
    };

    _deleteTodo = (key, todos) => {
        todos.splice(key, 1);
        this.setState({todos: todos});
    };

    //TODO: wpisz tytuł, wpisz opis, zrb zdjęcie + dodaj do listy

    render() {
        let {todos} = this.state;
        return (
            <Container>
                <Content>
                    <Form>
                        <Input
                            placeholder="Title"
                            label={'Title'}
                            style={[{margin: 5}, borderStyles.border]}
                            onChangeText={(title) => this.setState({item:{title:title}})}
                        />
                        <Textarea
                            onChangeText={(description) => this.setState({item:{...this.state.item,description: description}})}
                            style={[{margin: 5}, borderStyles.border]}
                            rowSpan={4}
                            placeholder="Todo description"
                            autoCorrect={false}
                        />

                        <Segment style={{backgroundColor: 'parent'}}>
                            <Button first onPress={() => this._onPressAdd()}>
                                <Icon name={'ios-add-circle'}/>
                            </Button>
                            <Button>
                                <Icon name={'ios-camera'}/>
                            </Button>
                        </Segment>
                    </Form>
                    <ScrollView style={{maxHeight: 250}}>
                        <List>
                            {

                                todos.length !== 0 ?
                                    map((item) => (
                                        <Swipeout
                                            key={todos.indexOf(item)}
                                            right={[{
                                                onPress: () => this._deleteTodo(todos.indexOf(item), todos),
                                                component: <Icon active name="trash"
                                                                 style={{color: 'white', marginLeft: 20}}
                                                />,
                                                backgroundColor: "red"
                                            }]}
                                            autoClose={true}
                                            style={[borderStyles.border, {margin: 5}]}
                                        >
                                            <View>
                                                <ListItem>
                                                    <Text>{item.title+item.description}</Text>
                                                </ListItem>
                                            </View>
                                        </Swipeout>
                                    ), todos)
                                    : null

                            }
                        </List>
                    </ScrollView>
                </Content>
            </Container>
        )
    }
}

export default TodoCreator

