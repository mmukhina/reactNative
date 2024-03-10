import { View, Text, Pressable, StyleSheet, Image } from 'react-native';

import React from 'react';
import StarsImg from "../../assets/stars.svg";

function IconButton({ children, onPress }) {

    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
                onPress={onPress}
                style={({ pressed }) => pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer}
                android_ripple={{ color: 'black' }}
            >
                
                <StarsImg />
                
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View >
    );
}

export default IconButton;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 28,
        margin: 4,
    },

    buttonInnerContainer: {
        backgroundColor: "white",
        borderRadius: 12,
        paddingVertical: 8,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: 'center', 
    },

    buttonText: {
        color: "black",
        textAlign: "center"

    },

    pressed: {
        opacity: 0.75,
    },

    image: {
        width: 24,
        height: 24,
        marginRight: 8,
    }
});