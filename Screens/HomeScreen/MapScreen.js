import React, { useEffect, useRef, useState } from 'react';
import MapView,{PROVIDER_GOOGLE,PROVIDER_DEFAULT,Marker} from 'react-native-maps';
import { Platform, ScrollView, StyleSheet, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { BottomSheet, Icon, ListItem, Text } from '@rneui/base';
import colors from '../../Color';
import EventDetails from '../Components/EventDetails';

import LogoSvg from '../../LogioSvg';
import { CATEGORIES } from '../../constant';

export default function MapScreen({route}) {
  // {"Category": 3, "CreatedAt": "2024-05-29T06:26:05.863", "Description": "nice nice", "DonorId": 4, "Id": 6, "Lattitude": 37.4025483644441, "Location": "hello odisha", "Longitude": -122.101075127721, "PhotoUrls": "https://rnoczrovwjscbrvtcjoj.supabase.co/storage/v1/object/public/danaw//public/1716963964946", "Timing": "2024-05-29T06:26:05.863", "Title": "hi hello"}
    const {data,singleItem} = route.params;
    const [isVisible, setIsVisible] = useState(true);
    const list = [
        {
          Title: 'List Item 1',
          Lattitude: '37.78825',
          Longitude: '-122.4324',
          Location: 'Bhubaneswar Jaydevvihar',
          Timing: '6.00pm',
          date: '23/05/2024'
        },
        {
          Title: 'List Item 2',
          Lattitude: '40.7128',
          Longitude: '-74.0059',
          Location: 'New York City, Manhattan',
          Timing: '9.30am',
          date: '18/06/2024'
        },
        {
          Title: 'List Item 3',
          Lattitude: '51.5074',
          Longitude: '-0.1278',
          Location: 'London, UK',
          Timing: '2.15pm',
          date: '01/07/2024'
        },
        {
          Title: 'List Item 4',
          Lattitude: '35.6895',
          Longitude: '139.6917',
          Location: 'Tokyo, Japan',
          Timing: '7.45pm',
          date: '12/08/2024'
        },
        {
          Title: 'List Item 5',
          Lattitude: '48.8566',
          Longitude: '2.3522',
          Location: 'Paris, France',
          Timing: '11.00am',
          date: '25/09/2024'
        },
        {
          Title: 'List Item 6',
          Lattitude: '41.9028',
          Longitude: '12.4964',
          Location: 'Rome, Italy',
          Timing: '4.30pm',
          date: '08/10/2024'
        },
        {
          Title: 'List Item 7',
          Lattitude: '19.4326',
          Longitude: '-99.1332',
          Location: 'Mexico City, Mexico',
          Timing: '8.15pm',
          date: '20/11/2024'
        },
        {
          Title: 'List Item 8',
          Lattitude: '-33.8688',
          Longitude: '151.2093',
          Location: 'Sydney, Australia',
          Timing: '10.00am',
          date: '03/12/2024'
        },
        {
          Title: 'List Item 9',
          Lattitude: '41.0082',
          Longitude: '28.9784',
          Location: 'Istanbul, Turkey',
          Timing: '6.30pm',
          date: '15/01/2025'
        },
        {
          Title: 'List Item 10',
          Lattitude: '25.2048',
          Longitude: '55.2708',
          Location: 'Dubai, United Arab Emirates',
          Timing: '3.00pm',
          date: '28/02/2025'
        }
      ];


      const [selectedItem, setSelectedItem] = useState(null);
      const mapRef = useRef(null);
    
      const handleItemPress = (item) => {
        setSelectedItem(item);
        mapRef.current.animateToRegion({
          latitude: parseFloat(item.Lattitude),
          longitude: parseFloat(item.Longitude),
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }, 1000);
      };

      useEffect(()=>{

        if(data === null)
          {
            setSelectedItem(null);
          }
          else{
            setSelectedItem(data)
            
          }
          console.log(data)
          console.log(CATEGORIES[`${data?.Category}`])

      },[])




  return (
    <View style={styles.container}>
      
       <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: parseFloat(list[0].Lattitude),
          longitude: parseFloat(list[0].Longitude),
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {list.map((item, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(item.Lattitude),
              longitude: parseFloat(item.Longitude),
            }}
           
            title={item.Title}
            description={item.Location}
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
       ((!singleItem) &&  selectedItem) && ( <TouchableOpacity onPress={()=>{setSelectedItem(null)}}>
        <Icon name={'angle-left'} type="font-awesome" color="#ff9800" size={35} style={{marginBottom:10,}}/>
        </TouchableOpacity>)
    }
      <Text style={styles.header}>{data?.Category ?CATEGORIES[`${data?.Category}`]:''} Donation </Text>
      </View>
   
        <ScrollView style={{height:'100%',backgroundColor:'#121212'}}>
      

        {!selectedItem && list.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => handleItemPress(item)}>
          <ListItem  containerStyle={styles.listItemContainer} >
            <ListItem.Content >
              <ListItem.Title style={{color:colors.text.primary}}>{item.Timing}</ListItem.Title>
              <ListItem.Subtitle style={{color:colors.secondary}}>{item.Location}</ListItem.Subtitle>
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
