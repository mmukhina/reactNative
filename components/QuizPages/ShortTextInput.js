import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, TouchableWithoutFeedback, Keyboard, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QuizNextButton from '../btn/QuizNextButton';
import commonStyles from '../../CommonStyles';
import BackBtn from '../btn/BackBtn';

import { SafeAreaView } from 'react-native-safe-area-context';

// import { SERVER_URL } from '../../.env.js';

const ShortTextInput = ({ route }) => {
  const SERVER_URL = 'http://192.168.0.69:3000'; // Replace with your server URL
  function updateNameOnServer(newName) {
    fetch(`${SERVER_URL}/updateUserName`, {
      method: 'POST', // or 'PUT', 'DELETE', etc.
      headers: {
        'Content-Type': 'application/json', // Specify content type as JSON
      },
      body: JSON.stringify({newName}), // Convert data to JSON format
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Handle response data if needed
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  const { pageId, questions } = route.params; // Retrieve questionId and questions from navigation params
  const pageInfo = questions[pageId];
  const navigation = useNavigation(); // Get navigation object
  const nextQuestionId = pageInfo.nextPage;

  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (text) => {
    setInputValue(text); // Update the state with the entered value
  };

  const handleNextQuestion = () => {
    if (pageInfo.functions === 'updateName') {
      updateNameOnServer(inputValue);
    }
    navigation.navigate(questions[nextQuestionId].type, { pageId: nextQuestionId, questions });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={commonStyles.quizWrapper}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior based on platform
        >
          <View style={commonStyles.quizContainer}>
          <BackBtn onPress={() => navigation.goBack()} />
            <Text style={commonStyles.title}>{pageInfo.question}</Text>
            <TextInput
              style={styles.input}
              multiline={true}
              placeholderTextColor="#FFFFFF50"
              placeholder={pageInfo.placeholder}
              textAlignVertical="top" // Align text to the top
              keyboardType={pageInfo.keyboardType}
              onChangeText={handleInputChange}
            />
          </View>
          <View style={commonStyles.footer}>
          <QuizNextButton onPress={handleNextQuestion}>Next</QuizNextButton>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ShortTextInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#FFFFFF30',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 12,
    paddingBottom: 12,
    fontSize: 15,
    backgroundColor: '#FFFFFF20',
    color: 'white',
  },
});
