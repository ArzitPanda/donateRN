// ArticleWebView.js
import { Icon } from '@rneui/base';
import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WebView from 'react-native-webview';
import colors from '../Color';
import LogoSvg from '../LogioSvg';

const ArticleWebView = ({ route, navigation }) => {
  const { url } = route.params;

  const handleCloseWebView = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
    <View style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',padding:10}}>
        <LogoSvg scale={0.8}/>
        <TouchableOpacity style={styles.closeButton} onPress={handleCloseWebView}>
        <Icon style={styles.closeButtonText} type='font-awsome' name='close' color={colors.secondary} size={24}/>
      </TouchableOpacity>
    </View>
      <WebView
        source={{ uri: url }}
        style={{ flex: 1 }}
        startInLoadingState
        scalesPageToFit
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  closeButton: {
    backgroundColor: '#333',
   
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ArticleWebView;
