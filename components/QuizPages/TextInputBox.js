import React from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QuizNextButton from '../btn/QuizNextButton';
import commonStyles from '../../CommonStyles';
import BackBtn from '../btn/BackBtn';

import { SafeAreaView } from 'react-native-safe-area-context';

const TextInputBox = ({ route }) => {
  const { pageId, questions } = route.params; // Retrieve questionId and questions from navigation params
  const pageInfo = questions[pageId];
  const navigation = useNavigation(); // Get navigation object
  const nextQuestionId = pageInfo.nextPage;

  const handleNextQuestion = () => {
    navigation.navigate(questions[nextQuestionId].type, { pageId: nextQuestionId, questions });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={commonStyles.quizWrapper}>
        <View style={commonStyles.quizContainer}>
        <BackBtn onPress={() => navigation.goBack()} />
          <Text style={commonStyles.title}>{pageInfo.question}</Text>
          <TextInput
            style={styles.input}
            multiline={true}
            placeholderTextColor="#FFFFFF50"
            placeholder="Type your text here..."
            textAlignVertical="top" // Align text to the top
          />
        </View>
        <View style={commonStyles.footer}>
          <QuizNextButton onPress={handleNextQuestion}>Submit and Continue</QuizNextButton>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default TextInputBox;

const styles = StyleSheet.create({
  input: {
    flex: 1, // Take remaining space
    borderWidth: 1,
    borderColor: '#FFFFFF30',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 12,
    fontSize: 15,
    backgroundColor: '#FFFFFF20',
    color: 'white',
  },
});
