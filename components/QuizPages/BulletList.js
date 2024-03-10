import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QuizNextButton from '../btn/QuizNextButton';
import RadioButton from '../btn/RadioButton';
import DarkBtn from '../btn/DarkBtn';
import BackBtn from '../btn/BackBtn';

import commonStyles from '../../CommonStyles';

import { SafeAreaView } from 'react-native-safe-area-context';

const BulletList = ({ route }) => {
  const { pageId, questions } = route.params; // Retrieve questionId and questions from navigation params
  const pageInfo = questions[pageId];
  const navigation = useNavigation(); // Get navigation object

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (index) => {
    setSelectedOption(index);
  };

  const handleNextQuestion = () => {
    const nextQuestionId = pageInfo.nextPage;
    navigation.navigate(questions[nextQuestionId].type, { pageId: nextQuestionId, questions });
  };


  return (
    <SafeAreaView style={commonStyles.quizWrapper}>
      <View style={commonStyles.quizContainer}>
      <BackBtn onPress={() => navigation.goBack()} />
        <Text style={commonStyles.title}>{pageInfo.question}</Text>
        {pageInfo.options.map((option, index) => (
          <RadioButton
            key={index}
            value={index}
            selectedValue={selectedOption}
            onValueChange={handleOptionChange}>{option}</RadioButton>
        ))}
      </View>

      <View style={commonStyles.footer}>
        {pageInfo.buttons.skip && (
          <DarkBtn onPress={handleNextQuestion}>Skip</DarkBtn>
        )}
        <QuizNextButton onPress={handleNextQuestion}>Next</QuizNextButton>
      </View>
    </SafeAreaView>

  );
};

export default BulletList;

