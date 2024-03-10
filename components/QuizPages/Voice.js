import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Animated, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QuizNextButton from '../btn/QuizNextButton';
import RadioButton from '../btn/RadioButton';
import IconDarkBtn from '../btn/IconDarkBtn';
import BackBtn from '../btn/BackBtn';
import DarkBtnLong from '../btn/DarkBtnLong';

import CloseImage from '../../assets/cross.svg';

import commonStyles from '../../CommonStyles';

import { SafeAreaView } from 'react-native-safe-area-context';

const Voice = ({ route }) => {
  const { pageId, questions } = route.params; // Retrieve questionId and questions from navigation params
  const pageInfo = questions[pageId];
  const navigation = useNavigation(); // Get navigation object

  const [selectedOption, setSelectedOption] = useState(null);

  const [isVisible, setIsVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const contentViewStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [600, 0], // Adjust the value based on how far you want to move
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

  const handleDetailsBtn = () => {
    setIsVisible(!isVisible);
    Animated.timing(animation, {
      toValue: isVisible ? 0 : 1,
      duration: 200, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();
  }

  const voices =
  {
    male: [
      {
        name: 'John',
        voice: require('../../samples/voice1.mp3')
      },
      {
        name: 'Michael',
        voice: require('../../samples/voice2.mp3')
      },
      {
        name: 'Ethan',
        voice: require('../../samples/voice3.mp3')
      }
    ],
    female: [
      {
        name: 'Jenny',
        voice: require('../../samples/voice4.mp3')
      },
      {
        name: 'Aria',
        voice: require('../../samples/voice5.mp3')
      },
      {
        name: 'Aria',
        voice: require('../../samples/voice6.mp3')
      }
    ]
  };

  const numOfMaleVoices = voices["male"].length;

  return (
    <SafeAreaView style={commonStyles.quizWrapper}>
      <View style={commonStyles.quizContainer}>
        <BackBtn onPress={() => navigation.goBack()} />
        <Text style={commonStyles.title}>Choose a voice</Text>
        <ScrollView style={styles.scrollView}>
          <View>
            <Text style={commonStyles.smallText}>Male Voice</Text>
            {voices["male"].map((option, index) => (
              <RadioButton
                key={index}
                value={index}
                selectedValue={selectedOption}
                voice={voices.male[index].voice}
                onValueChange={handleOptionChange}>{option.name}</RadioButton>
            ))}

          </View>

          <View>
            <Text style={commonStyles.smallText}>Female Voice</Text>
            {voices["female"].map((option, index) => (
              <RadioButton
                key={numOfMaleVoices + index}
                value={numOfMaleVoices + index}
                selectedValue={selectedOption}
                voice={voices.female[index].voice}
                onValueChange={handleOptionChange}>{option.name}</RadioButton>
            ))}
          </View>
        </ScrollView>
      </View>

      <Animated.View style={[styles.contentView, contentViewStyle]}>
        <View style={styles.detailsHeader}>
          <Text style={styles.detailsText1}>Details</Text>
          <CloseImage style={styles.detailsCloseImage} onPress={handleDetailsBtn} />
        </View>
        <Text style={styles.detailsText2}>Male Voice</Text>
        <Text style={commonStyles.smallText}>
          <Text style={{ fontWeight: 'bold' }}>Quiet Strength:</Text>Deep and confident tone that soothes and empowers.
        </Text>

        <Text style={[commonStyles.smallText]}>
          <Text style={{ fontWeight: 'bold' }}>Gentle Angel:</Text>Soft and tender tone, creating a sense of comfort and peace.
        </Text>

        <Text style={commonStyles.smallText}>
          <Text style={{ fontWeight: 'bold' }}>Wise Guide:</Text>Balanced and calming tone, guiding you on a path of self-discovery.
        </Text>

        <Text style={styles.detailsText2}>Female Voice</Text>
        <Text style={commonStyles.smallText}>
          <Text style={{ fontWeight: 'bold' }}>Radiant Star:</Text>Bright and inspiring tone, infusing you with courage and energy.
        </Text>

        <Text style={commonStyles.smallText}>
          <Text style={{ fontWeight: 'bold' }}>Warm Charmer:</Text>Friendly and warm tone, supporting relaxation and comfort.
        </Text>

        <Text style={commonStyles.smallText}>
          <Text style={{ fontWeight: 'bold' }}>Elegant Harmony:</Text>Harmonious and balanced tone, fostering deep meditation.
        </Text>


      </Animated.View>

      <View style={styles.footer}>
        {isVisible &&
          <DarkBtnLong onPress={handleDetailsBtn}>Close</DarkBtnLong>
        }

        {(!isVisible) &&
          <IconDarkBtn icon="speak" onPress={handleDetailsBtn}>
            Details
            </IconDarkBtn>
        }
        {!isVisible &&
          <QuizNextButton onPress={handleNextQuestion}>Next</QuizNextButton>
        }
      </View>
    </SafeAreaView>

  );
};

export default Voice;

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
  detailsText1: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',

  },
  detailsText2: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20
  },
  scrollView: {
    flex: 1,
  },
  detailsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20
  },
  detailsCloseImage: {
    padding: 10,
  }
});
