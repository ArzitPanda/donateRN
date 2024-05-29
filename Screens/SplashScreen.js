import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../Color'
import LogoSvg from '../LogioSvg'
import useAuthUser from '../Hooks/UseAuthUser'
import { useNavigation } from '@react-navigation/native'

const SplashScreen = () => {
    const navigation = useNavigation();
    const [hasRendered, setHasRendered] = useState(false);

  useEffect(() => {
    if (!hasRendered) {
      setHasRendered(true);
    } else {
      // Remove the screen from the navigation stack
      navigation.goBack();
    }
  }, [hasRendered, navigation]);
  
    const data = useAuthUser()
    useEffect(() => {
  
      if(data.pUser!==null)
      {
        navigation.navigate('Home')
      }
      else{
        navigation.navigate('LetsGetStarted')
      }
  
  
  
    }, []);
  return (
    <View style={{flex:1,backgroundColor:colors.background,display:'flex',alignItems:'center',justifyContent:'center'}}>
      <LogoSvg scale={0.9}/>
    </View>
  )
}

export default SplashScreen

const styles = StyleSheet.create({})