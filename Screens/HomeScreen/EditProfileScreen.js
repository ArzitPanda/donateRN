import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, ActivityIndicator, Text, ImageBackground, TouchableOpacity } from 'react-native';
import { Input, Button, Avatar, Divider } from '@rneui/base';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../Color';
import {useNavigation} from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker';
import supabase from '../../server/Config';
import LogoSvg from '../../LogioSvg';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { SafeAreaView } from 'react-native-safe-area-context';
import UseAuth from '../../Hooks/UseAuth';

const EditProfileScreen = ({route}) => {
  const routedata = route.params ;

  const navigation = useNavigation()
  const [image, setImage] = useState(null);
  const [aadharCard, setAadharCard] = useState('');
  const [address, setAddress] = useState('');
  const [profilePicture, setProfilePicture] = useState({uri:routedata.user?.Details?.ProfileImage});
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');
  const [interests, setInterests] = useState([]);
  const [bio, setBio] = useState('');
  const [countries, setCountries] = useState([]);
  const [countryDataLoading, setCountryDataLoading] = useState(true);

  const { error, user } = UseAuth();



  



  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        const countryList = response.data.map(country => ({
          label: country.name.common,
          value: country.name.common,
        }));
        countryList.sort((a, b) => a.label.localeCompare(b.label));
        setCountries(countryList);
        setCountryDataLoading(false);
      })
      .catch(error => {
        console.error(error);
        setCountryDataLoading(false);
      });
  }, []);

  const handleSave = async () => {
    const path = `public/${Date.now().toString() + "-" + profilePicture.fileName}`;
    const { data, error } = await supabase
      .storage
      .from('danaw')
      .upload(path, profilePicture, {
        cacheControl: '3600',
        upsert: false
      });

    if (!error) {
      const { data, error } = await supabase
        .from('Details')
        .insert([{
          AadharCard: aadharCard,
          Address: address,
          ProfileImage: `${supabase.storage.from('danaw').getPublicUrl("").data.publicUrl}/${path}`,
          Pincode: pincode,
          State: state,
          Country: country,
          Phone: phone,
          Interests: interests,
          Bio: bio
        }]);

      if (error) {
        console.error('Error saving profile:', error);
        Alert.alert('Error', 'Failed to save profile');
      } else {
        Alert.alert('Success', 'Profile saved successfully');
      }
    } else {
      console.error('Error uploading image:', error);
      Alert.alert('Error', 'Failed to upload profile picture');
    }
  };

  const selectProfilePicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });

    if (!result.canceled) {
      setProfilePicture(result.assets[0]);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.titleContainer}>
       <TouchableOpacity onPress={()=>{navigation.goBack()}}>
       <Icon name="chevron-left" size={24} color={colors.secondary} />
       </TouchableOpacity>
        <View style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: 'center' }}>
          <Text style={styles.title}>Edit Your Profile</Text>
        </View>
      </View>
      <ScrollView style={styles.scrollView}>
      
        <View style={styles.container}>
        <View style={styles.avatarContainer}>
  <Avatar
    rounded
    size="xlarge"
    source={{
      uri: profilePicture?.uri || 'https://gravatar.com/avatar/b110db69554c45c0539146f082821424?s=400&d=robohash&r=x',
    }}
    containerStyle={styles.avatar}
    onPress={selectProfilePicture}
  />
  <View style={styles.cameraIconContainer}>
    <Icon name="camera" size={24} color={colors.background} onPress={selectProfilePicture} />
  </View>

  <Text style={{textAlign:'center',color:colors.text.primary,fontSize:24,fontWeight:"600",marginTop:15}}>{routedata.user?.Name}</Text>
  <Text style={{textAlign:'center',color:colors.secondary,fontSize:14,fontWeight:"400"}}>Enterpreuner</Text>
</View>
         <View style={{paddingHorizontal:5,backgroundColor:colors.background,paddingTop:20,shadowColor:colors.text.primary,shadowRadius:40,shadowOpacity:0.1,borderTopLeftRadius:30,borderTopRightRadius:30}}>
          <Input
        
          errorMessage='addhar number should be 16 digit'
            placeholder="Aadhar Card"
            leftIcon={<Icon name="id-card" size={24} color={colors.secondary} />}
            value={aadharCard}
            onChangeText={setAadharCard}
            inputContainerStyle={styles.input}
            underlineColorAndroid={"transparent"}
            placeholderTextColor={colors.text.secondary}
          />
          <Input
            placeholder="Address"
            leftIcon={<Icon name="home" size={24} color={colors.secondary} />}
            value={address}
            onChangeText={setAddress}
            inputContainerStyle={styles.input}
            underlineColorAndroid={"transparent"}
            placeholderTextColor={colors.text.secondary}
          />
          <Input
            placeholder="Pincode"
            leftIcon={<Icon name="map-marker" size={24} color={colors.secondary} />}
            value={pincode}
            onChangeText={setPincode}
            underlineColorAndroid={"transparent"}
            inputContainerStyle={styles.input}
            placeholderTextColor={colors.text.secondary}
          />
          <Input
            placeholder="State"
            leftIcon={<Icon name="flag" size={24} color={colors.secondary} />}
            value={state}
            onChangeText={setState}
            inputContainerStyle={styles.input}
            placeholderTextColor={colors.text.secondary}
          />
          {countryDataLoading ? (
            <ActivityIndicator size="large" color={colors.secondary} />
          ) : (
            <RNPickerSelect
              onValueChange={(value) => setCountry(value)}
              items={countries}
              darkTheme={true}
              placeholder={{
                label: 'Select a country...',
                value: "India",
                color: colors.text.secondary,
                
              }}
              
              style={{
                inputIOS: {
                  color: colors.text.primary,
                  paddingHorizontal: 20,
                  paddingVertical:14,
                  marginVertical:10,
                  backgroundColor: colors.primaryOpacity,
                  borderRadius: 10,
                  
                  fontSize:18,
                  marginHorizontal:10,
                  borderWidth: 1.5,
                  borderColor: colors.primary,
                },
                inputAndroid: {
                  color: colors.text.primary,
                  padding: 10,
                  backgroundColor: colors.background,
                  borderRadius: 5,
                  borderWidth: 1,
                  borderColor: colors.primary,
                },
 
                placeholder: {
                  color: colors.text.secondary,
                },
                
                iconContainer:{
                  backgroundColor:colors.background,
                  padding:20,
                  
                  position:'static',
                  top:0,
                  left:0
                },
                modalViewMiddle:{
                  backgroundColor:"#000"
                },
                done:{
                  color:colors.secondary

                },
                modalViewBottom:{
                  backgroundColor:colors.secondary,
                  
                  
                  
                },

                
              }}
              value={country}
            />
          )}
          <Input
            placeholder="Phone Number"
            leftIcon={<Icon name="phone" size={24} color={colors.secondary} />}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            inputContainerStyle={styles.input}
            underlineColorAndroid={"transparent"}
            placeholderTextColor={colors.text.secondary}
          />
          <Input
            placeholder="Interests (comma-separated)"
            leftIcon={<Icon name="heart" size={24} color={colors.secondary} />}
            value={interests.join(', ')}
            onChangeText={(text) => setInterests(text.split(',').map((interest) => interest.trim()))}
            inputContainerStyle={styles.input}
            underlineColorAndroid={"transparent"}
            placeholderTextColor={colors.text.secondary}
          />
          <Input
            placeholder="Bio"
            leftIcon={<Icon name="user" size={24} color={colors.secondary} />}
            value={bio}
            onChangeText={setBio}
            inputContainerStyle={styles.input}
            underlineColorAndroid={"transparent"}
            multiline
            placeholderTextColor={colors.text.secondary}
          />
         </View> 
        </View>
      </ScrollView>
      <Button
            title="Save"
            onPress={handleSave}
            buttonStyle={styles.saveButton}
            titleStyle={styles.buttonTitle}
          />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: colors.primaryOpacity,
  },
  header: {
    height: 80,
    display: "flex",
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  avatarContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
   padding:20,
   marginBottom:20,
    backgroundColor:colors.primaryOpacity,
    borderBottomLeftRadius:30,
    borderCurve:'continuous',
    borderBottomRightRadius:30,
    borderBottomColor:colors.secondary,
    borderBottomWidth:.5
  
  },
  avatar: {
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: 70,
    borderWidth:1,
    borderColor:colors.secondary,
    right: '35%',
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 8,
  },
  logo: {
    width: 100,
    height: 100,
  },
  titleContainer: {
    display: "flex",
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    height: 60,
    backgroundColor: colors.primaryOpacity
  },
  title: {
    color: colors.text.secondary,
    fontSize: 16,
    fontWeight: '500',
  },
  divider: {
    marginVertical: 2,
    backgroundColor: colors.text.secondary,
  },
  container: {
    flex: 1,
   
    backgroundColor: colors.background,
  },
  avatarBackground: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  avatar: {
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  inputContainer: {
    marginVertical: 10,
  },
  input: {
    color: colors.text.primary,
    backgroundColor: colors.primaryOpacity,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.primary,
  },
  saveButton: {
    height:50,
    padding:10,
    backgroundColor: colors.secondary,
    marginHorizontal:15,
    marginVertical:10,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonTitle: {
    color: colors.background,
    fontSize: 16,
  },
});

export default EditProfileScreen;