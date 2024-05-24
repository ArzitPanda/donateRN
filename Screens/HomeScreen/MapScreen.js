import React, { useRef, useState } from 'react';
import MapView,{PROVIDER_GOOGLE,PROVIDER_DEFAULT,Marker} from 'react-native-maps';
import { Platform, ScrollView, StyleSheet, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { BottomSheet, Icon, ListItem, Text } from '@rneui/base';
import colors from '../../Color';
import EventDetails from '../Components/EventDetails';

import LogoSvg from '../../LogioSvg';

export default function MapScreen() {


    const [isVisible, setIsVisible] = useState(true);
    const list = [
        {
          title: 'List Item 1',
          latitude: '37.78825',
          longitude: '-122.4324',
          address: 'Bhubaneswar Jaydevvihar',
          timing: '6.00pm',
          date: '23/05/2024'
        },
        {
          title: 'List Item 2',
          latitude: '40.7128',
          longitude: '-74.0059',
          address: 'New York City, Manhattan',
          timing: '9.30am',
          date: '18/06/2024'
        },
        {
          title: 'List Item 3',
          latitude: '51.5074',
          longitude: '-0.1278',
          address: 'London, UK',
          timing: '2.15pm',
          date: '01/07/2024'
        },
        {
          title: 'List Item 4',
          latitude: '35.6895',
          longitude: '139.6917',
          address: 'Tokyo, Japan',
          timing: '7.45pm',
          date: '12/08/2024'
        },
        {
          title: 'List Item 5',
          latitude: '48.8566',
          longitude: '2.3522',
          address: 'Paris, France',
          timing: '11.00am',
          date: '25/09/2024'
        },
        {
          title: 'List Item 6',
          latitude: '41.9028',
          longitude: '12.4964',
          address: 'Rome, Italy',
          timing: '4.30pm',
          date: '08/10/2024'
        },
        {
          title: 'List Item 7',
          latitude: '19.4326',
          longitude: '-99.1332',
          address: 'Mexico City, Mexico',
          timing: '8.15pm',
          date: '20/11/2024'
        },
        {
          title: 'List Item 8',
          latitude: '-33.8688',
          longitude: '151.2093',
          address: 'Sydney, Australia',
          timing: '10.00am',
          date: '03/12/2024'
        },
        {
          title: 'List Item 9',
          latitude: '41.0082',
          longitude: '28.9784',
          address: 'Istanbul, Turkey',
          timing: '6.30pm',
          date: '15/01/2025'
        },
        {
          title: 'List Item 10',
          latitude: '25.2048',
          longitude: '55.2708',
          address: 'Dubai, United Arab Emirates',
          timing: '3.00pm',
          date: '28/02/2025'
        }
      ];


      const [selectedItem, setSelectedItem] = useState(null);
      const mapRef = useRef(null);
    
      const handleItemPress = (item) => {
        setSelectedItem(item);
        mapRef.current.animateToRegion({
          latitude: parseFloat(item.latitude),
          longitude: parseFloat(item.longitude),
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }, 1000);
      };





  return (
    <View style={styles.container}>
      
       <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: parseFloat(list[0].latitude),
          longitude: parseFloat(list[0].longitude),
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {list.map((item, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(item.latitude),
              longitude: parseFloat(item.longitude),
            }}
           
            title={item.title}
            description={item.address}
          >
                  <Icon name={'tint'} type="font-awesome" color={colors.accent} size={24} style={{rotation:'180deg'}} />

          </Marker>
        ))}
      </MapView>
      <View style={{backgroundColor:"rgba(0,0,0,0.8)",height:100,display:'flex',alignItems:'center',justifyContent:'center',paddingTop:50,position:'absolute',top:0,left:0,width:'100%'}}>
        <LogoSvg scale={1}/>
        </View>
      <View style={{display:'flex',flexDirection:"row",alignItems:'center',justifyContent:'flex-start',paddingStart:10}}>
    {
        selectedItem && ( <TouchableOpacity onPress={()=>{setSelectedItem(null)}}>
        <Icon name={'angle-left'} type="font-awesome" color="#ff9800" size={35} style={{marginBottom:10,}}/>
        </TouchableOpacity>)
    }
      <Text style={styles.header}>Blood Donate Camp Near You</Text>
      </View>
   
        <ScrollView style={{height:'100%',backgroundColor:'#121212'}}>
      

        {!selectedItem && list.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleItemPress(item)}>
          <ListItem  containerStyle={styles.listItemContainer} >
            <ListItem.Content >
              <ListItem.Title style={{color:colors.text.primary}}>{item.title}</ListItem.Title>
              <ListItem.Subtitle style={{color:colors.secondary}}>{item.address}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
          </TouchableOpacity>
        ))}
        {
            selectedItem && <EventDetails eventData={selectedItem}/>
        }

        </ScrollView>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
   height:'60%'
  },
    listItemContainer: {
    backgroundColor: colors.primary,
    marginVertical:2,
    marginHorizontal:10,
    
 borderRadius:5

   
  },
  header:{
        fontSize:25,
        paddingHorizontal:10,
        paddingTop:4,
        color:colors.text.primary,
        marginTop:10,
        marginBottom:20
  }
});
