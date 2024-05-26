import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';
import { Input, Button, Text } from '@rneui/base';
import LottieView from 'lottie-react-native';
import LogoSvg from '../LogioSvg';
import { useNavigation } from '@react-navigation/native';
import supabase from '../config';

const SignupScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const navigation = useNavigation();
    const handleSignup =async () => {
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
        setPasswordError('Please enter a password');
        isValid = false;
      } else if (password.length < 6) {
        setPasswordError('Password must be at least 6 characters long');
        isValid = false;
      } else {
        setPasswordError('');
      }
  
      // Confirm password validation
      if (!confirmPassword.trim()) {
        setConfirmPasswordError('Please confirm your password');
        isValid = false;
      } else if (confirmPassword !== password) {
        setConfirmPasswordError('Passwords do not match');
        isValid = false;
      } else {
        setConfirmPasswordError('');
      }
  
      if (isValid) {
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
      
         
        })

      console.log(data, error);
        if(data.user!==null )
          {
            


            const dbdata = await supabase
            .from('Users')
            .insert([
              { Name: email, Email: email,AuthId:data.user.id },
            ])
            .select()


          console.log(dbdata)
            


         
          }
          else
          {
            ToastAndroid.show(error.message,2000)
          }



      }
    };



  return (
    <ScrollView contentContainerStyle={styles.container}>
         <View style={{marginTop:20}}>
         <LogoSvg style={{marginTop:'10'}}/>
         </View>
      <LottieView
        source={require('../Animation - 1715416751316.json')}
        autoPlay
        loop
        style={styles.animation}
      />
   
      <Text h3 style={styles.heading}>
        Create an Account
      </Text>
      <Text style={styles.subheading}>
        Join our community and explore a world of possibilities.
      </Text>
      <View style={styles.signupContainer}>
      <Input
        
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        leftIcon={{ type: 'material', name: 'email', color: '#fff',size:15 }}
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
        leftIcon={{ type: 'material', name: 'lock', color: '#fff' ,size:15 }}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        placeholderTextColor="#aaa"
        errorMessage={passwordError}
      />
      <Input
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        leftIcon={{ type: 'material', name: 'lock', color: '#fff',size:15  }}
        inputContainerStyle={styles.inputContainer}
        inputStyle={styles.input}
        placeholderTextColor="#aaa"
        errorMessage={confirmPasswordError}
      />
      <Button
        title="Sign Up"
        buttonStyle={styles.button}
        onPress={handleSignup}
      />
    </View>
   
     <TouchableOpacity onPress={()=>{navigation.navigate('Login')}}>
     <Text style={styles.footerText}>
        Already have an account? <Text style={styles.link}>Sign In</Text>
      </Text>
     </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212', // Dark background
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animation: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
  heading: {
    marginBottom: 10,
    color: '#fff',
    textAlign: 'center',
  },
  subheading: {
    marginBottom: 10,
    color: '#aaa',
    textAlign: 'center',
  },
  inputContainer: {
    backgroundColor: '#222',
    borderRadius: 10,
    paddingHorizontal: 10,

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
  footerText: {
    color: '#aaa',
    marginTop: 20,
  },
  link: {
    color: '#ff9800', // Orange accent
    fontWeight: 'bold',
  },
  signupContainer:{
    padding: 10,
    width:'100%',
    backgroundColor: '#121212',
  }
});

export default SignupScreen;