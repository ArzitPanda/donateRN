import React, { useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';
import LogoSvg from '../LogioSvg';
import { SafeAreaView } from 'react-native-safe-area-context';


const WebViewScreen = ({ route }) => {
    const { url } = route.params;
    return (
  <SafeAreaView style={styles.webview}>
      <View style={{width:'100%',display:'flex',alignItems:'center',paddingBottom:20}}>
      <LogoSvg scale={1}/>
      </View>
      <WebView source={{ uri: url }}  />
  </SafeAreaView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    webview: {
      flex: 1,
    },
  });

  export default WebViewScreen;