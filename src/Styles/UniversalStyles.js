import {Dimensions, StyleSheet} from "react-native";

export const {height, width} = Dimensions.get('window');


export const universalStyles = StyleSheet.create({
    centerItem:{
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,
    }
});

export const borderStyles = StyleSheet.create({
    border: {
        borderWidth: 1,
        borderRadius: 25,
        borderColor: 'gray',
    }
});


export const applicationColor = ({
    header: '#5F6376',
    activeTintColor: 'black',
    inactiveTintColor: 'gray',
    redAlertColor: '#D53333',
    gray: '#43464B'
});

export const applicationFontSize = ({
    small: parseInt(height / 70),
    medium: parseInt(height / 50),
    large: parseInt(height / 35)
})