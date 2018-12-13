import * as React from 'react'
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation'
import {Icon} from 'react-native-elements';
import HomeScreen from "../Containers/Home/HomeScreen";
import OptionScreen from "../Containers/Home/OptionScreen";
import {applicationColor} from "../Styles/UniversalStyles";
import SearchScreen from "../Containers/Search/SearchScreen";
import Create from "../Containers/Create/Create";
import KeyboardInput from "../Containers/Create/KeyboardInput";


const HomeStack = createStackNavigator({
        Home: {screen: HomeScreen},
        Option: {screen: OptionScreen},
        //Todo: {screen: TodoScreen},
        // Customer: {screen: CustomerScreen},
        // TodoDetails: {screen: TodoListItemScreen},
        // NewRepair: {screen: New_repair},
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: applicationColor.header
            }
        }

    }
);

const CreateStack = createStackNavigator({
        Create: {screen: Create},
        KeyboardInput: {screen: KeyboardInput},
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: applicationColor.header
            }
        }

    }
);

// const SearchStack = createStackNavigator({
//         Search: {screen: SearchScreen},
//         Customer: {screen: CustomerScreen},
//     },
//     {
//         navigationOptions: {
//             headerStyle: {
//                 backgroundColor: applicationColor.header
//             }
//         }
//     }
// );


export default createBottomTabNavigator({
        Home: {
            screen: HomeStack,
        },
        Search: {
            screen: SearchScreen,
        },
        Create: {
            screen: CreateStack,
        },
    },
    {
        navigationOptions: ({navigation}) => ({
            navigationOptions: {
                headerStyle: {backgroundColor: applicationColor.header},
            },
            tabBarIcon: ({tintColor}) => {
                const {routeName} = navigation.state;
                let iconName;
                if (routeName === 'Home') {
                    iconName = `home`;
                } else if (routeName === 'Search') {
                    iconName = `search`;
                } else if (routeName === 'Create') {
                    iconName = 'dock'
                }
                return <Icon name={iconName} size={25} color={tintColor}/>;
            },
            header: {
                color: applicationColor.header
            }
        }),
        initialRouteName: 'Create',
        tabBarOptions: {
            activeTintColor: applicationColor.activeTintColor,
            inactiveTintColor: 'gray',
            showLabel: true,
            style: {
                height: 50
            },
        },
    },
);