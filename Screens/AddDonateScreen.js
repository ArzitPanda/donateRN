import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Input, Button } from '@rneui/themed';
import * as ImagePicker from 'expo-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';

import * as Location from 'expo-location';

import colors from '../Color';
import LogoSvg from '../LogioSvg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useReducer } from 'react';

const AddDonateScreen = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(null);
    const [location, setLocation] = useState('');
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [timing, setTiming] = useState(new Date());
    const [photos, setPhotos] = useState([]);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [currentLocation,setCurrentLocation] = useState(null);
    const categories = [
      { label: 'Book', value: 'book' },
      { label: 'Food', value: 'food' },
      { label: 'Furniture', value: 'furniture' },
      { label: 'Gadget', value: 'gadget' },
      { label: 'Clothes', value: 'clothes' },
    ];


const mapRef = useRef(null)

    useEffect(()=>{

    (async () => {
      
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          ToastAndroid.show("not grantend the location")
          return;
        }
  
        let location = await Location.getCurrentPositionAsync({});
        
        setCurrentLocation(location);
        mapRef.current.initialRegion={latitude:location.coords.latitude,longitude:location.coords.longitude}
      })();


},[])

    const [items, setItems] = useState(categories);
    const handleImagePicker = async () => {
        // Code to launch the image picker and handle the selected images
      };
    
      const handleLocationSearch = async () => {
        // Code to handle location search and update latitude/longitude
      };
    
      const handleSubmit = async () => {
        // Code to submit the donation data to Supabase
      };
    
      // Render the UI components





      return (
       <SafeAreaView>
     <View style={{paddingHorizontal:15}}> 
     <LogoSvg scale={0.8}/>
     </View>
         <ScrollView contentContainerStyle={styles.container}>
         
            <MapView ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: currentLocation?.coords.latitude ||37.78825,
              longitude:  currentLocation?.coords.longitude || -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            region={{
                latitude: currentLocation?.coords.latitude ||37.78825,
                longitude:  currentLocation?.coords.longitude || -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            onPress={(e) => {
              setLatitude(e.nativeEvent.coordinate.latitude);
              setLongitude(e.nativeEvent.coordinate.longitude);
            }}
          >
{currentLocation && <Marker coordinate={{latitude:currentLocation.coords.latitude,longitude:currentLocation.coords.longitude}}/>}

            {latitude && longitude && <Marker coordinate={{ latitude, longitude }} />}
          </MapView>
        <View style={{height:50,backgroundColor:colors.secondary,padding:10,}}>
        <Text style={{fontWeight:"500",textAlign:"left"}}>
            Add the marker to the location of donation {"\n"}
            
            <Text  style={{fontWeight:"200",fontSize:9,textAlign:"left"}}>Desired location may vary from the current location.be sure give proper address</Text>
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
            containerStyle={{borderWidth:0}}      
            leftIcon={{ type: 'material', name: 'description', color: '#fff', size: 15 }}
          />
          <DropDownPicker
            items={items}
            open={open}
         
            value={value}
            listMode='SCROLLVIEW'
            listItemLabelStyle={{color:colors.text.primary}}
           labelStyle={{color:colors.text.secondary}}
                dropDownContainerStyle={{backgroundColor:colors.primary}}

            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            placeholder={'Choose a fruit.'}
            defaultValue={category}
            containerStyle={styles.dropdownContainer}
            placeholderStyle={{borderBottomWidth:2,borderBottomColor:'white'}}
            style={{backgroundColor:colors.background,}}
            textStyle={{color:'white'}}
            onChangeItem={(item) => setCategory(item.value)}
          />
          <Input
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
            onSubmitEditing={handleLocationSearch}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.input}
            placeholderTextColor="#aaa"
            leftIcon={{ type: 'material', name: 'location-on', color: '#fff', size: 15 }}
          />
        
          <TouchableOpacity style={styles.button} onPress={handleImagePicker}>
            <Text style={styles.buttonText}>Add Photos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setShowDatePicker(true)}>
            <Text style={styles.buttonText}>Set Timing</Text>
          </TouchableOpacity>
       
          <Button title="Submit" buttonStyle={styles.submitButton} onPress={handleSubmit} />
        </ScrollView>
       </SafeAreaView>
      )
}




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
     
      fontSize:10,
      borderRadius: 10,
        borderWidth:0

  
    },
    input: {
   
    },
    dropdownContainer: {
      
      borderRadius: 10,
      marginBottom: 10,
      zIndex:10,
      
    },
    dropdownItem: {
      backgroundColor: '#121212',
      color: colors.accent,
    },
    map: {
      height: 500,
   
    },
    button: {
      backgroundColor: '#ff9800',
      borderRadius: 10,
      paddingVertical: 15,
      paddingHorizontal: 20,
      marginBottom: 10,
      alignItems: 'center',
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    submitButton: {
      backgroundColor: '#ff9800',
      borderRadius: 10,
      marginTop: 20,
    },
  });

  export default AddDonateScreen