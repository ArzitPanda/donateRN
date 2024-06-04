import React, { useEffect, useRef, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, ListItem, Text } from '@rneui/base';
import colors from '../../Color';
import EventDetails from '../Components/EventDetails';

import LogoSvg from '../../LogioSvg';
import { CATEGORIES } from '../../constant';
import supabase from '../../config';

export default function MapScreen({ route }) {
  const { data, singleItem } = route.params;
  const [list, setList] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!singleItem) {
        let { data, error } = await supabase
          .from('AntiUnitDonations')
          .select('*')
          .eq('Category', route.params.category);
        if (!error) {
          setList(data);
        }
        console.log(data, error);
      }
    };
    fetchData();
  }, [route.params.category, singleItem]);

  useEffect(() => {
    if (data) {
      setSelectedItem(data);
    } else {
      setSelectedItem(null);
    }
    console.log(data);
    console.log(CATEGORIES[`${data?.Category}`]);
  }, [data]);

  const handleItemPress = (item) => {
    setSelectedItem(item);
    mapRef.current.animateToRegion({
      latitude: parseFloat(item.Lattitude),
      longitude: parseFloat(item.Longitude),
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
          latitude: list[0]?.Lattitude || 37.78825,
          longitude: list[0]?.Longitude || -122.4324,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {list.map((item, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: parseFloat(item?.Lattitude),
              longitude: parseFloat(item?.Longitude),
            }}
            title={item?.Title}
            description={item?.Location}
          >
            <Icon name={'tint'} type="font-awesome" color={colors.accent} size={24} style={{ transform: [{ rotate: '180deg' }] }} />
          </Marker>
        ))}
      </MapView>
      <View style={styles.logoContainer}>
        <LogoSvg scale={1} />
      </View>
      <View style={styles.headerContainer}>
        {!singleItem && selectedItem && (
          <TouchableOpacity onPress={() => setSelectedItem(null)}>
            <Icon name={'angle-left'} type="font-awesome" color="#ff9800" size={35} style={styles.backIcon} />
          </TouchableOpacity>
        )}
        <Text style={styles.header}>{data === null ? CATEGORIES[`${route.params.category}`] : data?.Category ? CATEGORIES[`${data?.Category}`] : ''} Donation </Text>
      </View>
      <ScrollView style={styles.scrollView}>
        {!selectedItem && list.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => handleItemPress(item)}>
            <ListItem containerStyle={styles.listItemContainer}>
              <ListItem.Content>
                <ListItem.Title style={{ color: colors.text.primary }}>{item.Title}</ListItem.Title>
                <ListItem.Subtitle style={{ color: colors.secondary }}>{item.Location}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
        ))}
        {selectedItem && <EventDetails eventData={selectedItem} />}
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
    height: '60%',
  },
  logoContainer: {
    backgroundColor: "rgba(0,0,0,0.8)",
    height: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingStart: 10,
    marginTop: 10,
  },
  backIcon: {
    marginBottom: 10,
  },
  header: {
    fontSize: 25,
    paddingHorizontal: 10,
    paddingTop: 4,
    color: colors.text.primary,
    marginBottom: 20,
  },
  scrollView: {
    height: '100%',
    backgroundColor: '#121212',
  },
  listItemContainer: {
    backgroundColor: colors.primary,
    marginVertical: 2,
    marginHorizontal: 10,
    borderRadius: 5,
  },
});
