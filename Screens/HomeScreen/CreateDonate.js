import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import colors from '../../Color'
import LogoSvg from '../../LogioSvg'
import { Badge } from '@rneui/themed'

const CreateDonate = () => {
  return (
    <SafeAreaView>
          <View style={{width:'100%',display:'flex',alignItems:'center',paddingBottom:20}}>
      <LogoSvg scale={1}/>
      </View>
      <View>
      <Text style={styles.maintext}>Hi, Arijit</Text>
      <Text style={styles.secondaryText}>Which Type of Donate You want to contribute?</Text>
      </View>
      <View style={{display:'flex',alignItems:'flex-start',paddingLeft:20,marginVertical:10}}>

        <Badge badgeStyle={{width:'50%',height:30,backgroundColor:colors.primary,paddingHorizontal:20}} textStyle={{color:colors.secondary}} value="Donate options"/>
       
      
        </View>
    </SafeAreaView>
  )
}

export default CreateDonate

const styles = StyleSheet.create({

    maintext:{
        fontSize:50,
        fontWeight:900,
        color:colors.text.primary,
        marginTop:30,
        marginLeft:20
        
    }
    ,secondaryText:{
        color:colors.text.secondary,
        marginLeft:20,
        marginTop:10
    }
})