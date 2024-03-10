import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';

import React from 'react';

import ExpressionlessCircle from '../../assets/ExpressionlessCircle.svg'
import MeditationRound from '../../assets/MeditationRound.svg'
import ConfoundedCircle from '../../assets/ConfoundedCircle.svg'
import SleepingCircle from '../../assets/SleepingCircle.svg'
import StarsCircle from '../../assets/StarsCircle.svg'




function MultipleChoiceBtn({ children, onPress, svg, id }) {
    const [isPressed, setIsPressed] = useState(false); // State to track pressed state
    const [containerStyle, setContainerStyle] = useState(styles.buttonInnerContainer);

    const handlePress = () => {
        onPress(id); // Pass the id to the onPress function
        setIsPressed(!isPressed); // Update the pressed state
        if (isPressed) {
            setContainerStyle(styles.buttonInnerContainer);
        }
        else {
            setContainerStyle(styles.buttonInnerContainerSelected);
        }
        console.log("Pressed", isPressed);
    };

    let SvgComponent;
    switch (svg) {
        case 'ExpressionlessCircle':
            SvgComponent = ExpressionlessCircle;
            break;
        case 'MeditationRound':
            SvgComponent = MeditationRound;
            break;
        case 'ConfoundedCircle':
            SvgComponent = ConfoundedCircle;
            break;
        case 'SleepingCircle':
            SvgComponent = SleepingCircle;
            break;
        case 'StarsCircle':
            SvgComponent = StarsCircle;
            break;
        default:
            SvgComponent = null;
    }
    

    return (
        <View style={styles.optionContainer}>
            <Pressable
                onPress={handlePress}
                style={({ pressed }) => pressed ? [containerStyle, styles.pressed] : containerStyle}
                android_ripple={{ color: 'black' }}
            >
                {SvgComponent && <SvgComponent />}
                <Text style={styles.optionText}>{children}</Text>
            </Pressable>

        </View>
    );
}

export default MultipleChoiceBtn;

const styles = StyleSheet.create({
    buttonInnerContainer: {
        backgroundColor: "#1E1E32",
        borderRadius: 12,
        paddingVertical: 15,
        borderColor: '#3C3C50',
        borderWidth: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonInnerContainerSelected: {
        backgroundColor: "#596BC1",
        borderRadius: 12,
        paddingVertical: 15,
        borderColor: '#94A6F8',
        borderWidth: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },

    pressed: {
        opacity: 0.75,
    },
    optionContainer: {
        width: '48%', 
        marginBottom: 10,
        alignItems: 'center',
    },
    optionText: {
        marginTop: 5,
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
});
