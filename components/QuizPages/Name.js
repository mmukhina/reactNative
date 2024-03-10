import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Pressable, Animated, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QuizNextButton from '../btn/QuizNextButton';
import RadioButton from '../btn/RadioButton';
import DarkBtn from '../btn/DarkBtn';
import { LinearGradient } from 'expo-linear-gradient';
import BackBtn from '../btn/BackBtn';

import commonStyles from '../../CommonStyles';

import { SafeAreaView } from 'react-native-safe-area-context';

//import { SERVER_URL } from '../../.env.js';

import LongArrowImg from '../../assets/longArrow.svg';

const Name = ({ route }) => {
  const SERVER_URL = 'http://192.168.0.69:3000'; // Replace with your server URL
  function getNameFromServer() {
    fetch(`${SERVER_URL}/fetchUserName`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setUserName(data.userName);
        if (userName === null){
          setWhiteBtnText('Skip');
          setDarkBtnText('Update My name');
        }
        return data.userName;
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

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

  const [userName, setUserName] = useState('');

  const [selectedOption, setSelectedOption] = useState(null);

  const [darkBtnText, setDarkBtnText] = useState('Update My name');
  const [whiteBtnText, setWhiteBtnText] = useState('Use');

  const [isVisible, setIsVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  

  const [quizContainerStyle, setQuizContainerStyle] = useState(styles.quizContainer);

  getNameFromServer();

  const toggleContentView = () => {
    setIsVisible(!isVisible);
    Animated.timing(animation, {
      toValue: isVisible ? 0 : 1,
      duration: 200, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();
    setDarkBtnText(isVisible ? 'Update My name' : 'Set Name');
    setWhiteBtnText(isVisible ? 'Use' : 'Skip');
    setQuizContainerStyle(isVisible ? styles.quizContainer : styles.quizContainerPopupOpen);
  };

  const contentViewStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [500, 0], // Adjust the value based on how far you want to move
        }),
      },
    ],
  };

  const handleOptionChange = (index) => {
    setSelectedOption(index);
  };

  const handleNextQuestion = () => {
    const nextQuestionId = pageInfo.nextPage;
    navigation.navigate(questions[nextQuestionId].type, { pageId: nextQuestionId, questions });
  };

  const darkBtnHandler = () => {
    const setName = pageInfo.updateNamePage;
    navigation.navigate(questions[setName].type, { pageId: setName, questions });
    if (isVisible) {
      toggleContentView();
    }
    if (darkBtnText === 'Update My name') {
      setWhiteBtnText('Use');
    }
  }

  const whiteBtnHandler = () => {
    if (whiteBtnText === 'Skip') {
      updateNameOnServer(null);
    }
    const nextQuestionId = pageInfo.nextPage;
    navigation.navigate(questions[nextQuestionId].type, { pageId: nextQuestionId, questions });
    if (isVisible) {
      toggleContentView();
    }
  }

  const pageText = {
    name: {
      title : "You told us that your name is ",
    },
    noName: {
      title : "You have not told us your name",
    }
  }


  return (
    <SafeAreaView style={commonStyles.quizWrapper}>
      <View style={quizContainerStyle}>
        <View>
          <BackBtn onPress={() => navigation.goBack()} />
          <Text style={commonStyles.title}>
            {userName ? pageText.name.title : pageText.noName.title}
            <Text style={styles.name}>{userName}</Text>
          </Text>

          <View style={styles.textContainer}>
            <LongArrowImg />

            <View style={styles.paragraphs}>
              <Text style={commonStyles.text}>Do you want to use this name in your meditations?</Text>

              <Text style={commonStyles.smallText}>It Is important to use a real name or a name that you truly resonate with. You will be called by this name in your meditations. If you typed something meaningless instead of your name, it will spoil your experience.</Text>
            </View>
          </View>
        </View>
        {userName && <Pressable onPress={toggleContentView}><Text style={[commonStyles.smallText, { textAlign: 'center' }]}>Don't use my name in this meditation</Text></Pressable>}

      </View>

      <Animated.View style={[styles.contentView, contentViewStyle]}>
        <Text style={commonStyles.text}>Don’t use my name</Text>
        <Text style={commonStyles.smallText}>Mindfulness meditation is a practice that focuses on cultivating present-moment awareness and nonjudgmental observation of one's thoughts, feelings, bodily sensations, and surrounding environment. It involves intentionally directing attention to the present moment, without getting caught up in judgments or the urge to react.</Text>
      </Animated.View>

      <View style={styles.footer}>
        <DarkBtn onPress={darkBtnHandler}>{darkBtnText}</DarkBtn>
        <QuizNextButton onPress={whiteBtnHandler}>{whiteBtnText}</QuizNextButton>
      </View>
    </SafeAreaView>

  );
};

export default Name;

const styles = StyleSheet.create({
  name: {
    color: '#94A6F8',
    fontWeight: 'bold'
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paragraphs: {
    marginLeft: 10
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Content aligned at the bottom
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#010726',
  },
  button: {
    padding: 10,
    backgroundColor: 'red',
    width: '100%',
    flex: 1,
  },
  contentView: {
    position: 'absolute',
    bottom: 90, // Height of the footer
    backgroundColor: '#1E1E32',
    padding: 20,
    width: '100%',
    paddingBottom: 30,
    borderTopStartRadius: 24,
    borderTopEndRadius: 24,
  },
  quizContainer: {
    justifyContent: 'space-between',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF33',
    padding: 16,
    paddingBottom: 0
  },
  quizContainerPopupOpen: {
    justifyContent: 'space-between',
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF33',
    padding: 16,
    paddingBottom: 0,
    opacity: 0.2
  },
});


