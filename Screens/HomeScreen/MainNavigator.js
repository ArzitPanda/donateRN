import { View, Text ,StyleSheet, BackHandler} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './HomeScreens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from './MapScreen';
import HomeScreenNavigator from './HomeScreenNavigator';
import ProfileScreen from './ProfileScreen';
import NonUnitDonationScreen from './NonUnitDonateScreen';
import { useEffect } from 'react';
const Tab = createBottomTabNavigator();
const MainNavigator = ({navigation}) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackPress
    );

    return () => backHandler.remove();
  }, []);

  const handleBackPress = () => {
    // Check if the user is on the initial screen
    if (navigation.getState().index === 0) {
      // Exit the app
      BackHandler.exitApp();
      return true;
    }

    // Otherwise, go back to the previous screen
    navigation.goBack();
    return true;
  };
  return (
    <Tab.Navigator
        initialRouteName='Add'
    screenOptions={{
      headerShown: false,
    
      tabBarStyle: {

        backgroundColor: '#222',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingVertical: 10,
      },
      tabBarInactiveTintColor: '#aaa',
      tabBarActiveTintColor: '#fff',
    }}
  >
    <Tab.Screen
      name="Profiles"
      component={ProfileScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <Icon name="account-group" size={24} color={color} />
        ),
        tabBarBadge: 2,
        tabBarBadgeStyle: { backgroundColor: '#ff3d00' },
      }}
    />
    <Tab.Screen
      name="Add"

      component={HomeScreenNavigator}
      options={{
        title:'home',
        tabBarIcon: ({ color }) => (
      
            <Icon name="home" size={24} color={color}  />
       
        ),
        tabBarBadge: 3,
        tabBarBadgeStyle: { backgroundColor: '#ff3d00' }
      }}
    />
    <Tab.Screen
      name="Events"
      component={NonUnitDonationScreen}
      options={{
        tabBarIcon: ({ color }) => (
          <Icon name="calendar" size={24} color={color} />
        ),
        tabBarBadge: 1,
        tabBarBadgeStyle: { backgroundColor: '#ff3d00' },
      }}
    />
  </Tab.Navigator>
  )
}
const styles = StyleSheet.create({
    addButton: {
      backgroundColor: '#ff9800',
      borderRadius: 20,
      padding: 10,
    },
  });
export default MainNavigator