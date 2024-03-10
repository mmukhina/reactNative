// Info.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

import QuizNextButton from '../btn/QuizNextButton';

import commonStyles from '../../CommonStyles';
import { SafeAreaView } from 'react-native-safe-area-context';

const Info = ({ route }) => {
  const { pageId, questions } = route.params; // Retrieve questionId and questions from navigation params
  const pageInfo = questions[pageId];
  const navigation = useNavigation(); // Get navigation object

  const handleAnswer = (answer) => {
    // Do something with the answer
    return true;
  };

  const handleNextQuestion = () => {
    const nextQuestionId = pageInfo.nextPage;
    navigation.navigate(questions[nextQuestionId].type, { pageId: nextQuestionId, questions });
  };

  return (
    <SafeAreaView style={commonStyles.quizWrapper}>
      <View style={commonStyles.quizContainerRounded}>
        <Text style={commonStyles.text}>{pageInfo.question}</Text>
        {pageInfo.paragraphs.map((option, index) => (
          <Text style={commonStyles.smallText} key={index}>{option}</Text>
        ))}
      </View>
      <View style={commonStyles.footer}>
        <QuizNextButton onPress={handleNextQuestion}>Got it</QuizNextButton>
      </View>
    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  

});

export default Info;
