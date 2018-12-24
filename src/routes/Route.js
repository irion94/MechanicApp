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
import VehicleScreen from "../Containers/Vehicle/VehicleScreen";

export const CustomerStack = createStackNavigator({ //login by customer!!
        Customer: {screen: CustomerScreen},
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: applicationColor.header
            }
        }

    }
);

/** ---------------------------------------------------------------------------------------------------------**/

// const CustomerStack_MechanicView = createStackNavigator({
//         Customer: CustomerScreen,
//         Vehicle: VehicleScreen,
//     },
//     {
//         navigationOptions: {
//             tabBarVisible: false,
//         }
//     },
// );

const HomeStack = createStackNavigator({
        Home: {screen: HomeScreen},
        Option: {screen: OptionScreen},
        // Customer: {screen: CustomerStack_MechanicView}
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

HomeStack.navigationOptions = ({navigation}) => {
    return {
        tabBarVisible: navigation.state.index === 0,
    };
};


export const CreateStack = createStackNavigator({
        Create: {screen: Create},
        KeyboardInput: {screen: KeyboardInput},
        Customer: {screen: CustomerScreen},
        Vehicle: {screen: VehicleScreen},
    },
    {
        navigationOptions: {
            header: null,
        }
    }
);

CreateStack.navigationOptions = ({navigation}) => {
    return {
        tabBarVisible: navigation.state.index === 0,
    };
};


export const MechanicStack = createBottomTabNavigator({
        Home: {
            screen: HomeStack,
        },
        Search: {
            screen: SearchScreen,
        },
        Create: {
            screen: CreateStack
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