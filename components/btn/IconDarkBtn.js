import { View, Text, Pressable, StyleSheet } from 'react-native';
import SpeackImage from '../../assets/speak.svg';

import React from 'react';

function IconDarkBtn({ children, onPress, icon }) {
    if (icon === 'speak') {
        return (
            <View style={styles.buttonOuterContainer}>
                <Pressable
                    onPress={onPress}
                    style={({ pressed }) => pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer}
                    android_ripple={{ color: 'black' }}
                >
                    <SpeackImage />
                    <Text style={styles.buttonText}>{children}</Text>
                </Pressable>
            </View >
        );
    }
}

export default IconDarkBtn;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 12,
        margin: 12,
        marginBottom: 30,
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#FFFFFF33',
    },

    buttonInnerContainer: {
        backgroundColor: "#FFFFFF1A",
        borderRadius: 12,
        paddingVertical: 15,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: 'center',
    },

    buttonText: {
        color: "white",
        textAlign: "center",
        fontSize: 15,
        fontWeight: 'bold',
        paddingLeft: 10,
    },

    pressed: {
        opacity: 0.75,
    }
});