import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import colors from '../Color'
import LogoSvg from '../LogioSvg'
import useAuthUser from '../Hooks/UseAuthUser'
import { useNavigation } from '@react-navigation/native'
import { Store } from '../Hooks/RouteDataProvider'

const SplashScreen = () => {
  const data = useAuthUser()
    const navigation = useNavigation();
    const routeData = useContext(Store);

    useEffect(() => {
      const timer = setTimeout(() => {
        if (data.error === false) {
          routeData.splash.setSplashScreenVanish(true);
          navigation.navigate('Home');
        } else {
          routeData.splash.setSplashScreenVanish(true);
          navigation.navigate('LetsGetStarted');
        }

      }, 2000);
    
      return () => clearTimeout(timer); // Cleanup the timer if the component unmounts
    }, [data.error]);
  
  
  
  return (
    <View style={{flex:1,backgroundColor:colors.background,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <LogoSvg scale={0.9}/>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})