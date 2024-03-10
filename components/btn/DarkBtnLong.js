import { View, Text, Pressable, StyleSheet } from 'react-native';

import React from 'react';

function DarkBtnLong({ children, onPress }) {

    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
                onPress={onPress}
                style={({ pressed }) => pressed ? [styles.buttonInnerContainer, styles.pressed] : styles.buttonInnerContainer}
                android_ripple={{ color: 'black' }}
            >
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View >
    );
}

export default DarkBtnLong;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 12,
        margin: 12,
        marginBottom: 30,
        marginTop: 15,
        borderWidth: 1,
        borderColor: '#FFFFFF33',
        flex: 1,
    },

    buttonInnerContainer: {
        backgroundColor: "#FFFFFF1A",
        borderRadius: 12,
        paddingVertical: 15,
        paddingHorizontal: 20,
    },

    buttonText: {
        color: "white",
        textAlign: "center",
        fontSize: 15,
        fontWeight: 'bold',
    },

    pressed: {
        opacity: 0.75,
    }
});