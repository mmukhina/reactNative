import { View, Text, Pressable, StyleSheet, Image } from 'react-native';
import React, { useState, useEffect } from 'react';

import { Audio } from 'expo-av';

import CheckboxOff from '../../assets/CheckboxOff.svg';
import CheckboxOn from '../../assets/CheckboxOn.svg';
import AudioImage from '../../assets/audio.svg';

function RadioButton({ children, value, selectedValue, voice, onValueChange }) {
    const soundObject = new Audio.Sound();

    const loadSound = async (voice) => {
        try {
            // Stop playback if the sound is currently playing
            if (soundObject._playing) {
                await soundObject.stopAsync();
            }
    
            // Unload the sound if it's already loaded
            if (soundObject._loaded) {
                await soundObject.unloadAsync();
            }
    
            // Load the audio
            await soundObject.loadAsync(voice);
    
            // Play the audio
            await soundObject.playAsync();
        } catch (error) {
            console.error('Failed to load audio', error);
        }
    };

    const isSelected = value === selectedValue;

    const [checkBoxOnImageState, setcheckBoxOnImageState] = useState(true);
    const [checkBoxOffImageState, setcheckBoxOffImageState] = useState(false);
    const [containerStyle, setContainerStyle] = useState(styles.buttonInnerContainer);
    const [playAudioBtn, setPlayAudioBtn] = useState(styles.playAudioBtn);

    useEffect(() => {
        if (isSelected) {
            setcheckBoxOnImageState(true);
            setcheckBoxOffImageState(false);
            setContainerStyle(styles.buttonInnerContainerSelected);
            setPlayAudioBtn(styles.playAudioBtn);
        } else {
            setcheckBoxOnImageState(false);
            setcheckBoxOffImageState(true);
            setContainerStyle(styles.buttonInnerContainer);
            setPlayAudioBtn(styles.playAudioBtnDisabled);
        }
    }, [isSelected]);

    const handlePress = () => {
        onValueChange && onValueChange(value);
    };

    const playAudio = () => {
        loadSound(voice);

    };

    return (
        <View style={styles.buttonOuterContainer}>
            <Pressable
                onPress={handlePress}
                style={({ pressed }) => pressed ? [containerStyle, styles.pressed] : containerStyle}
                android_ripple={{ color: 'black' }}
            >
                <View style={styles.imageAndTextContainer}>
                <CheckboxOn style={checkBoxOnImageState ? styles.checkBoxImageVisible : styles.checkBoxImageNone} />
                <CheckboxOff style={checkBoxOffImageState ? styles.checkBoxImageVisible : styles.checkBoxImageNone} />
                <Text style={styles.buttonText}>{children}</Text>
                </View>
                {voice &&
                <Pressable onPress={playAudio} style={playAudioBtn}>
                    <AudioImage />
                </Pressable>
                }
            </Pressable>
        </View >
    );
}

export default RadioButton;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 12,
        marginBottom: 10,
    },

    buttonInnerContainer: {
        backgroundColor: "#2D2D41",
        borderRadius: 12,
        paddingVertical: 15,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: 'center',
    },

    buttonInnerContainerSelected: {
        backgroundColor: "#596BC1",
        borderRadius: 12,
        paddingVertical: 15,
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: 'space-between',
    },

    buttonText: {
        color: "#F3F3F3E5",
        textAlign: "left",
        fontSize: 15,
        fontWeight: 'normal',
        marginLeft: 10,
    },

    audioButtonText: {
        color: "blue",
        marginLeft: 10,
    },

    pressed: {
        opacity: 0.75,
    },

    checkBoxImageNone: {
        display: 'none'
    },
    checkBoxImageVisible: {
        display: 'flex'
    },
    playAudioBtn: {

    },
    playAudioBtnDisabled: {
        display: 'none'
    },
    imageAndTextContainer: {
        flexDirection: "row",
        alignItems: 'center',
    }
});
