
import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreens';
import MapScreen from './MapScreen';

const Stack = createStackNavigator();


const HomeScreenNavigator = () => {
  return (
   <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name="Home" component={HomeScreen}/>
    <Stack.Screen name="Map" component={MapScreen}/>
   </Stack.Navigator>
  )
}

export default HomeScreenNavigator