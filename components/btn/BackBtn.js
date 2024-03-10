import { View, Text, Pressable, StyleSheet } from 'react-native';

import React from 'react';
import BackBtnImage from '../../assets/backArrow.svg';

function BackBtn({ onPress }) {

    return (
        <View>
            <Pressable
                onPress={onPress}
                style={({ pressed }) => pressed ? styles.pressed : [] }
                android_ripple={{ color: 'black' }}
            >
                <BackBtnImage />
            </Pressable>
        </View >
    );
}

export default BackBtn;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
    }
});