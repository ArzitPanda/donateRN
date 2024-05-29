import { View, Text,Modal} from 'react-native'
import React from 'react'
import colors from '../Color'
import LogoSvg from '../LogioSvg'

const DonationModel = () => {
  return (
    <View style={{height:300,backgroundColor:colors.primary,display:'flex',alignItems:'center',justifyContent:'center'}}>
      
        <LogoSvg scale={1.2}/>
    
    </View>
  )
}

export default DonationModel