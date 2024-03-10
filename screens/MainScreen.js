// MainScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import commonStyles from '../CommonStyles';
import IconButton from '../components/btn/IconButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const MainScreen = ({ navigation }) => {
    const questions = {
        1: {
            type: 'Info',
            question: 'Why it is a good idea to create an individualized meditation?',
            paragraphs: [
                "It has a voice watermark. You’ll get the whole version once you get a full version. ",
                "Mindfulness meditation is a practice that focuses on cultivating present-moment awareness and nonjudgmental observation of one's thoughts, feelings, bodily sensations, and surrounding environment. It involves intentionally directing attention to the present moment, without getting caught up in judgments or the urge to react.",
                "During mindfulness meditation, individuals typically find a comfortable position and bring their attention to their breath, using it as an anchor to the present moment. As thoughts, emotions, or sensations arise, practitioners are encouraged to observe them without attachment or aversion, acknowledging their presence and letting them pass by without judgment or analysis. "
            ],
            nextPage: 2,
        },
        2: {
            type: 'Redirect',
            question: 'How would you like to set the goal for this set of meditations?',
            options: [
                ["Select from the list", 4],
                ["By myself", 3],
            ]
        },
        3: {
            type: "TextInputBox",
            question: "Provide your text for this meditation",
            nextPage: 5,
        },
        4: {
            type: 'MultipleChoice',
            question: 'What is your goal for this meditation?',
            options: [
                ["Deal with Social Anxiety", "ExpressionlessCircle"],
                ["Meditation & Breathing", "MeditationRound"],
                ["Deal with Anxiety", "ExpressionlessCircle"],
                ["Deal with Stress", "ConfoundedCircle"],
                ["Sleep Better", "SleepingCircle"],
                ["Learn to Relax", "StarsCircle"],
            ],
            nextPage: 5,
        },
        5: {
            type: "Name",
            updateNamePage: 6,
            nextPage: 7,
        },
        6: {
            type: 'ShortTextInput',
            question: 'Your name',
            placeholder: 'Type your name here...',
            keyboardType: 'default',
            nextPage: 5,
            functions: 'updateName'
        },
        7: {
            type: "BulletList",
            question: "I identify as",
            options: [
                "Male",
                "Female",
                "Non-binary",
            ],
            buttons: {
                skip: true,
                next: true
            },
            nextPage: 8,
        },
        8: {
            type: 'ShortTextInput',
            question: 'How old are you',
            placeholder: 'Type your age here...',
            keyboardType: 'number-pad',
            nextPage: 9,
        },
        9: {
            type: "Voice",
            nextPage: 10,
        },
        10: {
            type: 'Redirect',
            question: 'Do you want to add some text by yourself?',
            info: "Choose 'Yes' only if you have a special education or a lot of experience in meditation practices, psychology, or coaching.",
            options: [
                ["Yes", 11],
                ["No", 12],
            ],
            modalAddText: true
        },
        11: {
            type: "TextInputBox",
            question: "Provide your text for this meditation",
            nextPage: 12,
        },
        12: {
            type: 'Thankyou',
            nextPage: 12,
        }
    };

    const startPage = 1;
    const startQuiz = () => {
        navigation.navigate(questions[startPage].type, { pageId: startPage, questions });
    };

    return (
        <SafeAreaView style={commonStyles.defaultWrapper}>
            <Text style={commonStyles.title}>Your Personal Meditations Library</Text>
            <View style={styles.middle}>
                <Text style={[commonStyles.text, { width: 176, textAlign: 'center', paddingBottom: 16 }]}>Let's create your first meditation</Text>
                <IconButton onPress={startQuiz}>Let's create</IconButton>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    middle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
});

export default MainScreen;
