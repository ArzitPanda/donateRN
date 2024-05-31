import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions, Share } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import MapView, { Marker } from 'react-native-maps';
import colors from '../../Color';
import { Alert } from 'react-native';
import PagerView from 'react-native-pager-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import LogoSvg from '../../LogioSvg';

const { width, height } = Dimensions.get('window');

const SingleDonationRequest = ({ route }) => {
  const { request } = route.params;
  console.log(request);

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
      <View style={{padding:10,marginTop:10}}>
        <LogoSvg scale={0.7}/>
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Image
            source={{ uri: request.PhotoUrls ? request.Users.Details.ProfileImage : 'https://example.com/default-image.jpg' }}
            style={styles.headerImage}
          />
          <TouchableOpacity style={styles.shareButton} onPress={shareContent}>
            <Icon name="share-social-outline" size={24} color={colors.text.primary} />
          </TouchableOpacity>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{request.Users.Name}</Text>
          <Text style={styles.details}>{request.Title}</Text>
        </View>
        <Text style={styles.description}>{request.Description}</Text>

        {request.PhotoUrls ? (
          <View style={styles.pagerView} initialPage={0}>
         
              <View style={styles.page} >
                <Image source={{ uri: request.PhotoUrls }} style={styles.carouselImage} />
              </View>
       
          </View>
        ) : (
          <View style={styles.page}>
            <Text>No images available</Text>
          </View>
        )}

        {request.Category === 1 ? (
          <View style={styles.qrContainer}>
            <QRCode value={request.Donations} size={200} />
            <Text style={styles.qrDescription}>Scan the QR code to donate</Text>
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

        <TouchableOpacity style={styles.callToActionButton}>
          <Text style={styles.callToActionButtonText}>Donate Now</Text>
        </TouchableOpacity>
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
  headerContainer: {
    position: 'relative',
    marginBottom: 8,
  },
  headerImage: {
    width: '100%',
    height: height * 0.1,
    borderRadius: 10,
  },
  shareButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 8,
    borderRadius: 20,
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  details: {
    fontSize: 18,
    color: colors.text.secondary,
  },
  description: {
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 8,
    lineHeight: 24,
  },
  pagerView: {
    height: 200,
    width: '100%',
    marginBottom: 16,
    borderRadius: 10,
    overflow: 'hidden',
  },
  carouselImage: {
    width: width - 32,
    height: '100%',
    borderRadius: 10,
  },
  qrContainer: {
    alignItems: 'center',
    marginVertical: 16,
    padding: 20,
    borderRadius: 12,
    backgroundColor: colors.primaryOpacity,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  qrDescription: {
    color: colors.text.primary,
    marginTop: 8,
    fontSize: 16,
  },
  map: {
    height: 300,
    marginVertical: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    padding: 16,
  },
  callToActionButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 6,
  },
  callToActionButtonText: {
    color: colors.text.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SingleDonationRequest;