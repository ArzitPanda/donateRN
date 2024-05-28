import { View, Text ,StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeScreen from './HomeScreens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from './MapScreen';
import HomeScreenNavigator from './HomeScreenNavigator';
import ProfileScreen from './ProfileScreen';
import NonUnitDonationScreen from './NonUnitDonateScreen';
const Tab = createBottomTabNavigator();
const MainNavigator = () => {

  return (
    <Tab.Navigator
        
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