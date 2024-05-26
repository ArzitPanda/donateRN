
import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreens';
import MapScreen from './MapScreen';
import NonUnitDonationScreen from './NonUnitDonateScreen';
import EditProfileScreen from './EditProfileScreen';

const Stack = createStackNavigator();


const HomeScreenNavigator = () => {
  return (
   <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="Home" component={HomeScreen}/>
    <Stack.Screen name="Map" component={MapScreen}/>
    <Stack.Screen name="AntiUnit" component={NonUnitDonationScreen}/>
 
   </Stack.Navigator>
  )
}

export default HomeScreenNavigator