import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../Color'
import LogoSvg from '../LogioSvg'
import useAuthUser from '../Hooks/UseAuthUser'
import { useNavigation } from '@react-navigation/native'

const SplashScreen = () => {
  const data = useAuthUser()
    const navigation = useNavigation();


    useEffect(() => {
      const timer = setTimeout(() => {
        if (data.error === false) {
          navigation.navigate('Home');
        } else {
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