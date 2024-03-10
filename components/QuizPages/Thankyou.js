import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QuizNextButton from '../btn/QuizNextButton';
import RadioButton from '../btn/RadioButton';
import DarkBtn from '../btn/DarkBtn';
import { LinearGradient } from 'expo-linear-gradient';

import commonStyles from '../../CommonStyles';

//import { SERVER_URL } from '../../.env.js';

import { SafeAreaView } from 'react-native-safe-area-context';

import BellImage from '../../assets/Bell-ringing.svg';

const Thankyou = ({ route }) => {
  const { pageId, questions } = route.params; // Retrieve questionId and questions from navigation params
  const pageInfo = questions[pageId];
  const navigation = useNavigation(); // Get navigation object

  const [loadingText, setLoadingText] = useState('Loading...');
  const [isLoading, setIsLoading] = useState(true);

  const SERVER_URL = 'http://192.168.0.69:3000';

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Simulate fetching data from server
      fetch(`${SERVER_URL}/updateLoadingText`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log(data.loadedPercents);
          setLoadingText(`${data.loadedPercents}%`);
          // If data is loaded, stop the interval
          if (data.loadedPercents === 100) {
            clearInterval(intervalId);
            setIsLoading(false);
            redirectOnReady();
          }
        })
        .catch(error => {
          console.error('There was a problem with the fetch operation:', error);
        });
    }, 500); // Fetch data every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  const handleNextQuestion = () => {
    const nextQuestionId = pageInfo.nextPage;
    navigation.navigate(questions[nextQuestionId].type, { pageId: nextQuestionId, questions });
  };

  const redirectOnReady = () => {
    navigation.navigate('Congratulations');
  }

  return (
    <SafeAreaView style={commonStyles.quizWrapper}>
      <View style={[commonStyles.quizContainer, styles.container]}>
        <Text style={commonStyles.title}>Thank you!</Text>
        <Text style={commonStyles.text}>AI is creating an individual meditation based on your answers. Estimated time is about 5 minutes.</Text>

        <View style={styles.circleContainer}>
          <View style={styles.gradientCircle}>
            <LinearGradient
              colors={['#A1C1FF', '#CAA1FF', '#939DFF']}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 1 }}
              style={styles.gradient}
            >
              <Text style={styles.centeredText}>{loadingText}</Text>
            </LinearGradient>
          </View>
        </View>
        <View style={styles.notification} >
          <BellImage />
          <Text style={commonStyles.smallText}> We'll send you a notification when it's ready.</Text>
        </View>
      </View>

      <View style={commonStyles.footer}>
        <QuizNextButton onPress={handleNextQuestion}>Go to meditation</QuizNextButton>
      </View>
    </SafeAreaView>
  );
};

export default Thankyou;

const styles = StyleSheet.create({
  circleContainer: {
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#2D2D41',
    borderRadius: 100,
  },
  gradientCircle: {
    width: 187,
    height: 187,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center', // Center text vertically
    alignItems: 'center', // Center text horizontally
    borderRadius: 100,
  },
  centeredText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  notification: {
    flexDirection: 'row',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 0,
    paddingBottom: 0,
    margin: 0
  },
});
