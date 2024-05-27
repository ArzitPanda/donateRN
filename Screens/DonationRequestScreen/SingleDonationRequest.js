import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Share } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import MapView, { Marker } from 'react-native-maps';
import colors from '../../Color';
import { Alert } from 'react-native';
import PagerView from 'react-native-pager-view';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const SingleDonationRequest = ({ route }) => {
  const { request } = route.params;

  const shareContent = async () => {
    const shareOptions = {
      message: `Check out this donation request from ${request.name}: ${request.cause}. Details: ${request.description}`,
    };

    try {
      const result = await Share.share({
        message: shareOptions,
        url: "upi://arzitpanda.com",
        title: "check out "
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView>
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.shareButton} onPress={shareContent}>
        <Text style={styles.shareButtonText}>Share</Text>
      </TouchableOpacity>
      <Text style={styles.name}>{request.name}</Text>
      <Text style={styles.details}>{request.cause}</Text>
      <Text style={styles.description}>{request.description}</Text>
      {!request.images && (
        <PagerView style={{ height: 300, width: '100%' }} initialPage={0}>
          <View style={styles.page} key="1">
            <Text>First page</Text>
            <Text>Swipe ➡️</Text>
          </View>
          <View style={styles.page} key="2">
            <Text>Second page</Text>
          </View>
          <View style={styles.page} key="3">
            <Text>Third page</Text>
          </View>
        </PagerView>
      )}
      {request.category === 1 ? (
        <View style={styles.qrContainer}>
          <QRCode value={request.bankDetails} size={150} />
        </View>
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker coordinate={{ latitude: 37.7987, longitude: -122.4354 }} title="Donation Location" />
        </MapView>
      )}

     <Text style={{backgroundColor:colors.secondary,padding:10,borderRadius:8,color:colors.text.primary}}>Description</Text>
     <View style={{marginVertical:10,backgroundColor:colors.primaryOpacity,padding:10,borderRadius:10}}>
        <Text style={{color:colors.text.secondary,textAlign:'justify'}}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </Text>
     </View>

    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: colors.background,
  },
  shareButton: {
    alignSelf: 'flex-end',

    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
  },
  shareButtonText: {
    color: colors.text.primary,
    fontWeight: 'bold',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 2,
  },
  details: {
    fontSize: 20,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  description: {
    fontSize: 18,
    color: colors.text.primary,
    marginBottom: 4,
    lineHeight: 26,
  },
  carouselImage: {
    width: width - 60,
    height: 200,
    borderRadius: 10,
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: colors.primaryOpacity,
    borderRadius: 12,
    padding: 16,
  },
  map: {
    height: 300,
    marginVertical: 20,
    borderRadius: 12,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 16,
  },
});

export default SingleDonationRequest;