import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QuizNextButton from '../btn/QuizNextButton.js';
import { LinearGradient } from 'expo-linear-gradient';
import commonStyles from '../../CommonStyles.js';
// import { SERVER_URL } from '../../.env.js';
import { SafeAreaView } from 'react-native-safe-area-context';
import Confetti from '../../assets/Confetti.svg';
import CirclesImage from '../../assets/circles_3.svg';

const Congratulations = ({ route }) => {
  const SERVER_URL = 'http://192.168.0.69:3000'; // Replace with your server URL
  const [userAuth, setUserAuth] = useState(false); // Initialize userAuth state

  useEffect(() => {
    fetch(`${SERVER_URL}/fetchUserAuth`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log(data.userAuth);
        setUserAuth(data.userAuth); // Update userAuth state
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }, []); // Empty dependency array to ensure useEffect runs only once

  return (
    <SafeAreaView style={commonStyles.quizWrapper}>
      <View style={styles.quizContainer}>
        <View style={styles.textContainer}>
          <Text style={[commonStyles.title, { textAlign: 'center', marginBottom: 0 }]}>Congratulations!</Text>
          <Text style={[commonStyles.title, { textAlign: 'center', paddingTop: 0 }]}>Your first meditation is ready.</Text>
          <Confetti />
        </View>

        {!userAuth && // Use userAuth state instead of state
          <View style={styles.infoBox}>
            <View>
              <Text style={commonStyles.smallText}>Now create your account and get the following features:</Text>

              <View style={styles.circlesContainer}>
                <CirclesImage />
                <View style={styles.circlesText}>
                  <Text style={styles.boldText}>Save Your Favorites</Text>
                  <Text style={styles.boldText}>Track your Progress</Text>
                  <Text style={styles.boldText}>Get Tips & Advice</Text>
                </View>
              </View>
            </View>
          </View>
        }
      </View>

      <View style={commonStyles.footer}>
        <QuizNextButton>Go to meditation</QuizNextButton>
      </View>
    </SafeAreaView>
  );
};

export default Congratulations;

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
  textContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBox: {
    backgroundColor: '#1E1E32',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#3C3C50'
  },
  circlesText: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
  },
  circlesContainer: {
    flexDirection: 'row',
    justifyContent: 'left',
  },
  boldText: {
    fontWeight: 'bold',
    color: 'white',
  },
  quizContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  }
});
