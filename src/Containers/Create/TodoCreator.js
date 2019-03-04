import * as React from 'react';
import {Alert, AlertIOS, ScrollView, View} from "react-native";
import {Button, Form, Icon, List, ListItem, Segment, Text, Textarea, Container, Content} from "native-base";
import Swipeout from 'react-native-swipeout';
import {map} from 'ramda'
// import {applicationColor, borderStyles, universalStyles} from "../Styles/UniversalStyles";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

/**
 * Component where we just create list of new thinks to do.
 * Text Area, Scrollable List
 */

class TodoCreator extends React.Component {

    state = {
        description: '',
        todos: [],
    };

    _onPressAdd = (todos, description) => {
        todos.push(description);
        this.setState({description: ''})
    };

    _deleteTodo = (key, todos) => {
        todos.splice(key, 1);
        this.setState({todos: todos});
    };

    render() {
        let {todos, description} = this.state;
        return (
            <Container>
                <Content>
                <Form>
                    <Textarea
                        onChangeText={(description) => this.setState({description})}
                        //style={[{margin: 5}, borderStyles.border]}
                        rowSpan={4}
                        value={description}
                        placeholder="Todo description"
                        autoCorrect={false}
                    />

                    <Segment style={{backgroundColor: 'parent'}}>
                        <Button first onPress={() => this._onPressAdd(todos, description)}>
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
                                                             //style={[{color:'white', marginLeft: 20}, universalStyles.centerItem]}
                                            />,
                                            //backgroundColor: applicationColor.redAlertColor
                                        }]}
                                        autoClose={true}
                                        //style={[borderStyles.border, {margin: 5}]}
                                    >
                                        <View>
                                            <ListItem>
                                                <Text>{item}</Text>
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

