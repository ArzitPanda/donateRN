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
      message: `Check out this donation request from ${request.Users.Name}: ${request.Title}. Details: ${request.Description}`,
    };

    try {
      const result = await Share.share({
        message: shareOptions.message,
        url: "upi://arzitpanda.com",
        title: "Check out this donation request",
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
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <TouchableOpacity style={styles.shareButton} onPress={shareContent}>
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
        <Text style={styles.name}>{request.Users.Name}</Text>
        <Text style={styles.details}>{request.Title}</Text>
        <Text style={styles.description}>{request.Description}</Text>

        {request.PhotoUrls ? (
          <PagerView style={styles.pagerView} initialPage={0}>
            {request.PhotoUrls.split(',').map((url, index) => (
              <View style={styles.page} key={index}>
                <Image source={{ uri: url }} style={styles.carouselImage} />
              </View>
            ))}
          </PagerView>
        ) : (
          <View style={styles.page}>
            <Text>No images available</Text>
          </View>
        )}

        {request.Category === 1 ? (
          <View style={styles.qrContainer}>
            <QRCode value={request.Donations} size={150} />
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

        <Text style={styles.sectionTitle}>Description</Text>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionText}>
            {request.Description}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 16,
  },
  shareButton: {
    alignSelf: 'flex-end',
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
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
    marginBottom: 12,
    lineHeight: 26,
  },
  pagerView: {
    height: 300,
    width: '100%',
    marginBottom: 20,
  },
  carouselImage: {
    width: width - 32,
    height: 200,
    borderRadius: 10,
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: colors.primaryOpacity,
    borderRadius: 12,
    padding: 16,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  map: {
    height: 300,
    marginVertical: 20,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sectionTitle: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 8,
    color: colors.text.primary,
    fontSize: 18,
    marginVertical: 10,
  },
  descriptionContainer: {
    backgroundColor: colors.primaryOpacity,
    padding: 10,
    borderRadius: 10,
  },
  descriptionText: {
    color: colors.text.secondary,
    textAlign: 'justify',
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 16,
  },
});

export default SingleDonationRequest;
