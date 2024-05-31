// AppNavigator.js
import React, { useContext } from 'react';
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
import ArticleWebView from '../Screens/ArticleView';
import DonationModel from '../Screens/DonationModel';
import DonationRequestScreen from '../Screens/DonationRequestScreen/AddDonationRequest';
import SpeedDialScreen from '../Screens/SpeedDialScreen';
import SplashScreen from '../Screens/SplashScreen';
import { Store } from '../Hooks/RouteDataProvider';
import MapScreen from '../Screens/HomeScreen/MapScreen';

const Stack = createStackNavigator();



const AppNavigator = () => {



    const routeData = useContext(Store);
    







  return (
    <NavigationContainer  theme={{colors:{background:'#121212'}}}>
      <Stack.Navigator screenOptions={{headerShown:false}}>
     {
      routeData.splash.splashScreenVanish ===false && (   <Stack.Screen name="Splash" component={SplashScreen}  options={{detachPreviousScreen:true}} />)
     }
       

       <Stack.Group>
       <Stack.Screen name="Home" component={MainNavigator} options={{detachPreviousScreen:true}} />
        <Stack.Screen name="addDonate" component={AddDonateScreen} />
        <Stack.Screen name ="requestList" component={RequestsScreen} />
       
  
        <Stack.Screen name="firstSignupDetails" component={FirstSigupDetails}/>

        <Stack.Screen name="singleDonationRequest" component={SingleDonationRequest}/>
        <Stack.Screen name="Map" component={MapScreen}/>
        <Stack.Screen name="ArticleWebView" component={ArticleWebView} options={{ headerShown: false }} />
        <Stack.Screen name="SpeedDial" component={SpeedDialScreen}/>
        <Stack.Group screenOptions={{ presentation: 'modal' ,}}>
          <Stack.Screen name='DonateOptionModal' component={DonationModel} 
          
          options={{
            headerShown: false,
            gestureEnabled: true,
          }}
       
          />
             <Stack.Screen name="AddDonationRequest" component={DonationRequestScreen} options={{ headerShown: false }} />
             <Stack.Screen name="ProfileEdit" component={EditProfileScreen}/>
        </Stack.Group>
       </Stack.Group>
       <Stack.Group name="Auth">
    <Stack.Screen name="LetsGetStarted" component={LetsGetStartedScreen} options={{detachPreviousScreen:true}} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Group>
      </Stack.Navigator>
       
    </NavigationContainer>
  );
};

export default AppNavigator;
