import { StyleSheet, Text, TextInput, ToastAndroid, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../../Color'

const TextAreaWithCounter = ({bio,setBio}) => {
  const limit =20
  const wordLength =(bio)=>{
      return   bio.length
  }
  const [canWrite,setCanWrite] =useState(true);
  const [counter,setCounter] =useState(0);
  
    return (
    <View style={{width:'100%'}} >
      <Text style={{color:colors.text.primary}}>Your Bio</Text>
      <TextInput style={{color:colors.text.primary,backgroundColor:colors.primaryOpacity,height:60,borderWidth:1,borderRadius:10,borderColor:colors.secondary,width:'100%',textAlignVertical:'top',paddingStart:10,paddingVertical:10}}  value={bio}  onChangeText={(text)=>{
        
            if(wordLength(text)<=limit)
                {
                    setBio(text);
                }
                else
                {
                    ToastAndroid.show("limit is 200",1000)
                }


      }}/>
        <Text style={{color:colors.secondary,marginVertical:10}}>{wordLength(bio)}/{limit}</Text>
      
    </View>
  )
}

export default TextAreaWithCounter

const styles = StyleSheet.create({})