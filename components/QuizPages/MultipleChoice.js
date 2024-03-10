import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import commonStyles from '../../CommonStyles';
import QuizNextButton from '../btn/QuizNextButton';
import MultipleChoiceBtn from '../btn/MultipleChoiceBtn';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import BackBtn from '../btn/BackBtn';



// Main page component
const MultipleChoice = ({ route }) => {
    const { pageId, questions } = route.params; // Retrieve questionId and questions from navigation params
    const pageInfo = questions[pageId];
    const navigation = useNavigation(); // Get navigation object

    const options = pageInfo.options.map((option, index) => {
        return { svg: option[1], text: option[0] };
    });

    const [pressedButtons, setPressedButtons] = useState([]);

    // Handler function to update pressed buttons
    const handlePress = (id) => {
        // Check if the button is already pressed
        const isPressed = pressedButtons.includes(id);
        if (isPressed) {
            // If already pressed, remove it from the list
            setPressedButtons(pressedButtons.filter((buttonId) => buttonId !== id));
        } else {
            // If not pressed, add it to the list
            setPressedButtons([...pressedButtons, id]);
        }
    };

    const redirectValue = () => {

        if (pressedButtons.length === 0) {
            return;
        }

        const nextPageId = pageInfo.nextPage;
        console.log("Next page id", questions[nextPageId]);
        navigation.navigate(questions[nextPageId].type, { pageId: nextPageId, questions });
    }

    return (
        <View style={commonStyles.quizWrapper}>
            <View style={commonStyles.quizContainer}>
            <BackBtn onPress={() => navigation.goBack()} />
                <Text style={commonStyles.title}>{pageInfo.question}</Text>
                <Text style={commonStyles.text}>You can choose multiple options</Text>
                <View style={styles.optionsContainer}>
                    {options.map((option, index) => (
                        <MultipleChoiceBtn onPress={handlePress} id={index} key={index} svg={option.svg}>{option.text}</MultipleChoiceBtn>
                    ))}
                </View>
            </View>
            <View style={commonStyles.footer}>
                <QuizNextButton onPress={redirectValue}>Next</QuizNextButton>
            </View>
        </View>
    );
};


export default MultipleChoice;

const styles = StyleSheet.create({
    buttonOuterContainer: {
        borderRadius: 12,
        margin: 12,
        marginBottom: 30,
        marginTop: 15,
    },

    buttonInnerContainer: {
        backgroundColor: "white",
        borderRadius: 12,
        paddingVertical: 15,
    },

    buttonText: {
        color: "black",
        textAlign: "center",
        fontSize: 15,
        fontWeight: 'bold',
    },

    pressed: {
        opacity: 0.75,
    },

    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    optionsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    optionContainer: {
        width: '48%', // Set width to occupy half of the container
        marginBottom: 10,
        alignItems: 'center',
    },
    optionText: {
        marginTop: 5,
        fontSize: 16,
    },
});

