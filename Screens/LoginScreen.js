import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Platform } from 'react-native';
import { Input, Button } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import LogoSvg from '../LogioSvg';
import { KeyboardAvoidingView } from 'react-native';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigation = useNavigation();
  const handleLogin = () => {
    let isValid = true;

    // Email validation
    if (!email.trim()) {
      setEmailError('Please enter your email');
      isValid = false;
    } else {
      setEmailError('');
    }

    // Password validation
    if (!password.trim()) {
      setPasswordError('Please enter your password');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      // Handle login logic here
      console.log('Email:', email);
      console.log('Password:', password);
    }


    navigation.navigate('Home')
  };

  return (
    <KeyboardAvoidingView style={styles.container}
    
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}

    >
           <View style={{marginTop:20,display:"flex",alignItems:"center",paddingVertical:50}}>
         <LogoSvg scale={1.4}/>
         </View>
      <Text style={styles.heading}>Welcome Back!</Text>
      <Text style={styles.subheading}>
        Log in to continue your amazing journey
      </Text>

   
      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        leftIcon={{ type: 'material', name: 'email', color: '#fff' }}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        placeholderTextColor="#aaa"
        errorMessage={emailError}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        leftIcon={{ type: 'material', name: 'lock', color: '#fff' }}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        placeholderTextColor="#aaa"
        errorMessage={passwordError}
      />
      <Button
        title="Log In"
        buttonStyle={styles.button}
        onPress={handleLogin}
      />
      <Text style={styles.forgotPasswordText}>Forgot your password?</Text>
      <View style={styles.accountContainer}>
        <Text style={styles.accountText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.signUpText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#121212', // Dark background
    justifyContent: 'center',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  subheading: {
    fontSize: 16,
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: '#222',
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  input: {
    color: '#fff',
  },
  button: {
    backgroundColor: '#ff9800', // Orange accent
    borderRadius: 10,
    marginTop: 20,
    paddingVertical: 15,
  },
  forgotPasswordText: {
    color: '#ff9800', // Orange accent
    marginTop: 20,
    textAlign: 'center',
  },
  accountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  accountText: {
    color: '#aaa',
  },
  signUpText: {
    color: '#ff9800', // Orange accent
    marginLeft: 5,
    fontWeight: 'bold',
  },
});

export default LoginScreen;