// AppNavigator.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LetsGetStartedScreen from '../Screens/LetsGetStartedScreen';
import SignUpScreen from '../Screens/SignupScreen';
import LoginScreen from '../Screens/LoginScreen';
import HomeScreens from '../Screens/HomeScreen/HomeScreens';
import MainNavigator from '../Screens/HomeScreen/MainNavigator';
import AddDonateScreen from '../Screens/AddDonateScreen';
import EditProfileScreen from '../Screens/HomeScreen/EditProfileScreen';
import FirstSigupDetails from '../Screens/FirstSignUpDetails';
import RequestsScreen from '../Screens/DonationRequestScreen/DonationRequestListView';
import SingleDonationRequest from '../Screens/DonationRequestScreen/SingleDonationRequest';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer  theme={{colors:{background:'#121212'}}}>
      <Stack.Navigator screenOptions={{headerShown:false}}>
        <Stack.Screen name="LetsGetStarted" component={RequestsScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={MainNavigator} />
        <Stack.Screen name="addDonate" component={AddDonateScreen} />
        <Stack.Screen name="ProfileEdit" component={EditProfileScreen}/>
        <Stack.Screen name="firstSigupDetails" component={FirstSigupDetails}/>
        <Stack.Screen name="singleDonationRequest" component={SingleDonationRequest}/>
      </Stack.Navigator>
       
    </NavigationContainer>
  );
};

export default AppNavigator;
