
// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import MainScreen from './screens/MainScreen';
import Info from './components/QuizPages/Info';
import Redirect from './components/QuizPages/Redirect';
import TextInputBox from './components/QuizPages/TextInputBox';
import MultipleChoice from './components/QuizPages/MultipleChoice';
import ShortTextInput from './components/QuizPages/ShortTextInput';
import BulletList from './components/QuizPages/BulletList';
import Voice from './components/QuizPages/Voice';
import Thankyou from './components/QuizPages/Thankyou';
import Name from './components/QuizPages/Name';
import Congratulations from './components/QuizPages/Congratulations';
import { StatusBar } from 'react-native';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#ff0000" barStyle="light-content" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // Hide the default header
        }}>
        <Stack.Screen name="MainScreen" component={MainScreen} />
        <Stack.Screen name="Info" component={Info} />
        <Stack.Screen name="Redirect" component={Redirect} />
        <Stack.Screen name="TextInputBox" component={TextInputBox} />
        <Stack.Screen name="MultipleChoice" component={MultipleChoice} />
        <Stack.Screen name="ShortTextInput" component={ShortTextInput} />
        <Stack.Screen name="BulletList" component={BulletList} />
        <Stack.Screen name="Voice" component={Voice} />
        <Stack.Screen name="Thankyou" component={Thankyou} />
        <Stack.Screen name="Name" component={Name} />
        <Stack.Screen name="Congratulations" component={Congratulations} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


/*
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Text } from 'react-native';

const App = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animation] = useState(new Animated.Value(0));

  const toggleContentView = () => {
    setIsVisible(!isVisible);
    Animated.timing(animation, {
      toValue: isVisible ? 0 : 1,
      duration: 300, // Adjust the duration as needed
      useNativeDriver: true,
    }).start();
  };

  const contentViewStyle = {
    transform: [
      {
        translateY: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [300, 0], // Adjust the value based on how far you want to move
        }),
      },
    ],
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.contentView, contentViewStyle]}>
        <Text>Don’t use my name</Text>
        <Text>Mindfulness meditation is a practice that focuses on cultivating present-moment awareness and nonjudgmental observation of one's thoughts, feelings, bodily sensations, and surrounding environment. It involves intentionally directing attention to the present moment, without getting caught up in judgments or the urge to react.</Text>
      </Animated.View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={toggleContentView}>
          <View style={styles.button}>
            <Text>Press Me</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end', // Content aligned at the bottom
  },
  footer: {
    height: 50,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 10,
    backgroundColor: 'red',
    width: '100%',
    flex: 1,
  },
  contentView: {
    position: 'absolute',
    bottom: 50, // Height of the footer
    left: 0,
    backgroundColor: 'white',
    padding: 10,
    width: '100%',
  },
});

export default App;
*/