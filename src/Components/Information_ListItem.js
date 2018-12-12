import {List, ListItem, Content, Header} from "native-base";
import {Text} from "react-native";
import {map} from 'ramda'
import React from "react";

const Information_ListItem = (props) => {
    let object = Object.values(props.object);
    // console.log('asdasd', object.person)
    return (
        <Content style={{width: '100%', flex:1}}>
            <Header>
                <Text style={{fontSize:20}}>{props.header}</Text>
            </Header>
            <List>
                {
                    map(item =>

                            <ListItem onPress={() => props.onPress()} key={object.indexOf(item)}>
                                <Text>{item} </Text>
                            </ListItem>
                        , object)
                }
            </List>
        </Content>
    )
}
export default Information_ListItem;
