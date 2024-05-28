import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert, ToastAndroid, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Input, Button } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import * as Location from 'expo-location';
import colors from '../Color';
import LogoSvg from '../LogioSvg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { createClient } from '@supabase/supabase-js';
import supabase from '../config';
import useAuthUser from '../Hooks/UseAuthUser';


const AddDonateScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(null);
  const [location, setLocation] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [timing, setTiming] = useState(new Date());
  const [photos, setPhotos] = useState([]);
  const [photoUrls, setPhotoUrls] = useState([]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const categories = [
    { label: 'Book', value: 1 },
    { label: 'Food', value: 2 },
    { label: 'Furniture', value: 3 },
    { label: 'Gadget', value: 4 },
    { label: 'Clothes', value: 5 },
    { label: 'Other', value: 6 }
  ];

  const mapRef = useRef(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        ToastAndroid.show('Location permission not granted');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
      mapRef.current.initialRegion = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
    })();
  }, []);

  const [items, setItems] = useState(categories);
  const authUser = useAuthUser();
   
  const handleImagePicker = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      setPhotos([...result.assets]);
    }
  };

  const uploadImageToSupabase = async (photo) => {


    const path = `public/${Date.now().toString() + "-" + photo.fileName}`;
    const { data, error } = await supabase
      .storage
      .from('danaw')
      .upload(path, photo, {
        cacheControl: '3600',
        upsert: false
      });;
    if (error) {
      throw error;
    }
    console.log('Uploading image', data,error);

    return `${supabase.storage.from('danaw').getPublicUrl("").data.publicUrl}/${path}`;
  };

  const handleSubmit = async () => {
 

    try {

       const photourl = uploadImageToSupabase(photos[0])
const dataToInsert  =  {
  DonorId: authUser.pUser?.Id, // Assuming DonorId is available, replace with actual donor ID
  Category: value,
  Title: title,
  Description: description,
  PhotoUrls: JSON.stringify([photourl]), // Assuming PhotoUrls is stored as a JSON string
  Location: location,
  Lattitude: latitude,
  Longitude: longitude,
  // Convert Date object to string
}

      const { data, error } = await supabase
        .from('AntiUnitDonations')
        .insert([
          dataToInsert
        ]);

      if (error) {
        Alert.alert('Error', error.message);
      } else {
        Alert.alert('Success', 'Donation added successfully.');
        // Reset form or navigate to another screen
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <SafeAreaView>
      <View style={{ paddingHorizontal: 15 }}>
        <LogoSvg scale={0.8} />
      </View>
      <ScrollView contentContainerStyle={styles.container}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: currentLocation?.coords.latitude || 37.78825,
            longitude: currentLocation?.coords.longitude || -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          region={{
            latitude: currentLocation?.coords.latitude || 37.78825,
            longitude: currentLocation?.coords.longitude || -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          onPress={(e) => {
            setLatitude(e.nativeEvent.coordinate.latitude);
            setLongitude(e.nativeEvent.coordinate.longitude);
          }}
        >
          {currentLocation && (
            <Marker
              coordinate={{
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
              }}
            />
          )}

          {latitude && longitude && <Marker coordinate={{ latitude, longitude }} />}
        </MapView>
        <View style={{ height: 50, backgroundColor: colors.secondary, padding: 10 }}>
          <Text style={{ fontWeight: '500', textAlign: 'left' }}>
            Add the marker to the location of donation
            {'\n'}
            <Text style={{ fontWeight: '200', fontSize: 9, textAlign: 'left' }}>
              Desired location may vary from the current location. Be sure to give the proper address.
            </Text>
          </Text>
        </View>

        <Text style={styles.heading}>Add Donation</Text>
        <Input
          placeholder="Title"
          value={title}
          onChangeText={setTitle}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          placeholderTextColor="#aaa"
          leftIcon={{ type: 'material', name: 'title', color: '#fff', size: 15 }}
        />
        <Input
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          placeholderTextColor="#aaa"
          containerStyle={{ borderWidth: 0 }}
          leftIcon={{ type: 'material', name: 'description', color: '#fff', size: 15 }}
        />
        <DropDownPicker
          items={items}
          open={open}
          value={value}
          listMode='SCROLLVIEW'
          listItemLabelStyle={{ color: colors.text.primary }}
          labelStyle={{ color: colors.text.secondary }}
          dropDownContainerStyle={{ backgroundColor: colors.primary }}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder={'Choose a category'}
          defaultValue={category}
          containerStyle={styles.dropdownContainer}
          placeholderStyle={{ borderBottomWidth: 2, borderBottomColor: 'white' }}
          style={{ backgroundColor: colors.background }}
          textStyle={{ color: 'white' }}
            onChangeValue={(val)=>{console.log(value)}}
        />
        <Input
          placeholder="Location"
          value={location}
          onChangeText={setLocation}
    
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.input}
          placeholderTextColor="#aaa"
          leftIcon={{ type: 'material', name: 'location-on', color: '#fff', size: 15 }}
        />
      <View style={{display:'flex',flexDirection:'row',flex:1,width:'100%',columnGap:10,marginVertical:10}}>
      <View style={{display:'flex',flexDirection:'row',flex:1}}>
        {photos.length > 0 ? photos.map((photo, index) => (
          <Image
            key={index}
            source={{ uri: photo.uri }}
            style={{ width: 50, height: 50, marginHorizontal: 5 }}
          />
        )) : <Text style={{flex:1,padding:10,backgroundColor:colors.primaryOpacity,color:colors.text.primary}}>Upload some images for context</Text>}
        </View>
        <TouchableOpacity style={styles.Iconbutton} onPress={handleImagePicker}>
          <FontAwesome name="image" size={24} color={colors.text.primary} />
        </TouchableOpacity>
      </View>

        <TouchableOpacity style={styles.Iconbutton} onPress={() => setShowDatePicker(true)}>
          <FontAwesome name="clock-o" size={24} color={colors.text.primary} />
        </TouchableOpacity>

        <Button title="Submit" buttonStyle={styles.submitButton} onPress={handleSubmit} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#121212',
    padding: 5,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  inputContainer: {
    fontSize: 10,
    borderRadius: 10,
    borderWidth: 0,
  },
  input: {},
  dropdownContainer: {
    borderRadius: 10,
    marginBottom: 10,
    zIndex: 10,
  },
  map: {
    height: 500,
  },
  button: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  Iconbutton: {
    backgroundColor: colors.secondary,
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  submitButton: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    marginTop: 20,
  },
});

export default AddDonateScreen;
