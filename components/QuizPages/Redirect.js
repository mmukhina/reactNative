import React, { useState } from 'react';
import { View, Text, Button, Modal, Animated, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QuizNextButton from '../btn/QuizNextButton';
import RadioButton from '../btn/RadioButton';
import BackBtn from '../btn/BackBtn';

import commonStyles from '../../CommonStyles';

import { SafeAreaView } from 'react-native-safe-area-context';
import DarkBtn from '../btn/DarkBtn';
import TickBoxImage from '../../assets/tickBox.svg'

const Redirect = ({ route }) => {
  const { pageId, questions } = route.params; // Retrieve questionId and questions from navigation params
  const pageInfo = questions[pageId];
  const navigation = useNavigation(); // Get navigation object

  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionChange = (index) => {
    setSelectedOption(index);
  };

  const redirectValue = () => {
    if (selectedOption === null) {
      return;
    }

    if (pageInfo.modalAddText && selectedOption === 0) {
      openSlider();
      console.log("Selected option", selectedOption);
      return;
    }

    nextPage();
  }

  const nextPage = () => {
    const nextPageId = pageInfo.options[selectedOption][1];
    const nextPageName = questions[nextPageId].type;
    navigation.navigate(nextPageName, { pageId: nextPageId, questions });
  }

  const skipAnswer = () => {
    const skipId = pageInfo.options[1][1];
    const nextPageName = questions[skipId].type;
    navigation.navigate(nextPageName, { pageId: skipId, questions });
  }

  const userAddText = () => {
    const skipId = pageInfo.options[1][1];
    const nextPageName = questions[skipId].type;
    navigation.navigate(nextPageName, { pageId: skipId, questions });
  }

  const [modalVisible, setModalVisible] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const [quizContainerStyle, setQuizContainerStyle] = useState(styles.quizContainer);


  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

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

  const openSlider = () => {
    setIsVisible(!isVisible);
    Animated.timing(animation, {
      toValue: isVisible ? 0 : 1,
      duration: 200, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();
    setQuizContainerStyle(isVisible ? styles.quizContainer : styles.quizContainerPopupOpen);

  }

  function ToHomeScreen () {
    console.log("To Home Screen")
    navigation.navigate('MainScreen');
    //close the modal
    setModalVisible(!modalVisible);
  };

  const disclaimer = () => {
    Alert.alert(
      'Close the disclaimer',
      'Closing the disclaimer will send you back to the home screen',
      [
        { text: "Cancel"},
        { text: 'Close', onPress: () => ToHomeScreen() },
      ],
      {
        cancelable: true,
      }
    );
  };



  return (
    <SafeAreaView style={commonStyles.quizWrapper}>
      <View style={quizContainerStyle}>
        <BackBtn onPress={() => navigation.goBack()} />
        <Text style={commonStyles.title}>{pageInfo.question}</Text>
        {pageInfo.options.map((option, index) => (
          <RadioButton
            key={index}
            value={index}
            selectedValue={selectedOption}
            onValueChange={handleOptionChange}>{option[0]}</RadioButton>
        ))}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={toggleModal}
      >

        <View style={styles.modal}>
          <View style={styles.modalBox}>
            <View style={styles.modalTitleContainer}>
              <Text style={styles.modalTitle}>Please read to continue</Text>
            </View>
            <ScrollView >
              <View style={styles.modalMainContainer}>
                <Text style={commonStyles.smallText}>Terms of use</Text>
                <Text style={commonStyles.smallText}>Welcome to NeoMind! These Terms of Use govern your access to and use of NeoMind and any related services offered by NeoMind. By using the App, you agree to comply with these Terms, so please read them carefully before proceeding.</Text>
                <Text style={commonStyles.smallText}>Acceptance of Terms By accessing or using the App, you acknowledge that you have read, understood, and agree to be bound by these Terms. If you do not agree with any part of these Terms, you may not use the App.</Text>
                <Text style={commonStyles.smallText}>User Eligibility The use of the App is available only to individuals who are at least age limit years old. If you are under the age limit, you must obtain parental or legal guardian consent before using the App.</Text>
                <Text style={commonStyles.smallText}>Intellectual Property Rights All content, materials, and features available on the App, including but not limited to text, graphics, logos, images, software, audio, and video files, are protected by applicable intellectual property laws. [Your Company Name] owns or has licenses to use these materials, and you may not use, modify, distribute, or reproduce them without our explicit written permission.</Text>
                <Text style={commonStyles.smallText}>User Content By using the App, you may have the opportunity to submit or share content, including but not limited to comments, feedback, and suggestions. You retain ownership of your content, but you grant NeoMind a worldwide, royalty-free, non-exclusive, transferable, and sublicensable license to use, reproduce, modify, adapt, publish, translate, distribute, and display your content in connection with the App.</Text>
                <Text style={commonStyles.smallText}>If you have any questions or concerns regarding these Terms, please contact us at mail@example.com</Text>
                <Text style={commonStyles.smallText}>Thank you for using NeoMind!</Text>

                <View style={styles.rowStyling}>
                  <TickBoxImage />
                  <Text style={styles.tickBoxText}>I have read and agree to the terms of use and privacy policy of the NeoMind App</Text>
                </View>
              </View>
            </ScrollView>

            <View style={styles.modalBtns}>
              <DarkBtn onPress={disclaimer}>Decline</DarkBtn>
              <QuizNextButton onPress={userAddText}>Accept</QuizNextButton>
            </View>
          </View>
        </View>
      </Modal>

      <Animated.View style={[styles.contentView, contentViewStyle]}>
        <Text style={commonStyles.text}>Are you sure?</Text>
        <Text style={commonStyles.smallText}>You will hear this text in the altered state of mind. That will significantly affect your brain. It can be beneficial if done right and also can be dangerous if done wrong</Text>
      </Animated.View>

      <View style={styles.footer}>
        {isVisible &&
          <DarkBtn onPress={skipAnswer}>No, Skip</DarkBtn>
        }
        {isVisible &&
          <QuizNextButton onPress={toggleModal}>Yes</QuizNextButton>
        }
        {!isVisible &&
          <QuizNextButton onPress={redirectValue}>Next</QuizNextButton>
        }
      </View>
    </SafeAreaView>
  );
};

export default Redirect;

const styles = {
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#02071E',
    padding: 10,
    paddingTop: 30,
    paddingBottom: 20,
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
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#010726',
  },
  modalBox: {
    backgroundColor: '#1E1E32',
    flex: 1,
    width: '100%',
    borderRadius: 24,
  },
  modalTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalTitleContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF33',
  },
  modalMainContainer: {
    padding: 20,
  },
  rowStyling: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quizContainer: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF33',
    padding: 16,
    paddingBottom: 0
  },
  quizContainerPopupOpen: {
    flex: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#FFFFFF33',
    padding: 16,
    paddingBottom: 0,
    opacity: 0.2
  },
  modalBtns: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#FFFFFF33',
  },
  tickBoxText: {
    color: 'white',
    marginLeft: 10,
  }
};
