import * as React from 'react'
import * as R from 'ramda'
import {ScrollView, StyleSheet, View, FlatList} from "react-native";
import {Content} from 'native-base'
import {List, ListItem, Text} from "react-native-elements";
import vehicleStore from "../../Stores/dbData/VehicleStore";
import VehicleScreen from "../../Containers/Vehicle/VehicleScreen";

/**
 *
 * @param props
 * @constructor
 */

const TodoList = props => {
    const badge = () => {

    }

    return (
        <Content>
            <FlatList
                data={vehicleStore.vehicleInProgress}
                renderItem={(item) =>
                    <Item
                        item={item}
                        navigation={props.navigation}
                    />
                }
            />
        </Content>
    );
};


const Item = props => {
    const {item} = props.item;

    const title = () => {
        return String(item.markaPojazdu + ' | ' + item.modelPojazdu + ' | ' + item.numerRejestracyjnyPojazdu)
    };

    const subtitle = () => {
        return String("Make | Model | Reg")
    };

//TODO: kiedy repairsHistory === true > 1
    const badge = () => {
        console.log('val', item)
        const condition = R.ifElse(
            //propSatisfies( x => x === false, 'finished'),
            item => item.finished === false,
            R.view(R.lensProp('repairsList')),
            () => {
                return {}
            },
        );

        let list = R.pipe(
            R.map(condition),
        )(item.repairsHistory);

        let value = R.filter(
            R.compose(R.not, R.isEmpty)
        )(list);

        console.log('val', value)

        return value.length
    };

    return (
        <ListItem
            title={title()}
            subtitle={subtitle()}
            subtitleStyle={{fontSize: 10}}
            badge={{
                value: badge(),
                textStyle: {color: 'white'},
                containerStyle: {marginRight: 10, backgroundColor: 'red'}
            }}
            onPress={() => props.navigation.navigate('Vehicle', {
                ...item, ...{
                    labels: ['Make', 'Model', 'VIN', 'Reg.'],
                    keys: ['markaPojazdu', 'modelPojazdu', 'numerIdentyfikacyjnyPojazdu', 'numerRejestracyjnyPojazdu'],
                    buttonTitle: 'More Vehicle information',
                    listHeader: 'Repairs history',
                    renderFrom: 'Todo'
                }
            })}
        />
    )
}

export default (TodoList);