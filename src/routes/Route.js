import * as React from 'react'
import {createBottomTabNavigator, createStackNavigator, createSwitchNavigator} from 'react-navigation'
import {Icon} from 'react-native-elements';
import HomeScreen from "../Containers/Home/HomeScreen";
import OptionScreen from "../Containers/Home/OptionScreen";
import {applicationColor} from "../Styles/UniversalStyles";
import SearchScreen from "../Containers/Search/SearchScreen";
import Create from "../Containers/Create/Create";
import KeyboardInput from "../Containers/Create/KeyboardInput";
import CustomerScreen from "../Containers/Customer/CustomerScreen";
import LoginScreen from "../Containers/Root/LoginScreen";
import NewFirebase from "../Containers/Root/NewFirebase";

const HomeStack = createStackNavigator({
        Home: {screen: HomeScreen},
        Option: {screen: OptionScreen},
        Customer: {screen: CustomerScreen}
        //Todo: {screen: TodoScreen},
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

export const CustomerStack = createStackNavigator({
        Customer: {screen: CustomerScreen},
        Vehicle: {screen: OptionScreen}
    }
    ,
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
        Customer: {screen: CustomerScreen}
    },
    {
        navigationOptions: {
            headerStyle: {
                height: 0
            }
        },

    },
);


export const MechanicStack = createBottomTabNavigator({
        Home: {
            screen: HomeStack,
        },
        Search: {
            screen: SearchScreen,
        },
        Create: {
            screen: CreateStack,
        }
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
        initialRouteName: 'Home',
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

const LoginStack = createStackNavigator({
        Login: {screen: LoginScreen},
        Create: {screen: NewFirebase},
    }
);


export const RootStack = createSwitchNavigator({
        Login: LoginStack,
        MechanicView: MechanicStack,
        CustomerView: CustomerStack
    },
    {
        initialRouteName: 'Login',
        navigationOptions: {
            header: null
        },

    }
);