import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Share,
} from "react-native";
import QRCode from "react-native-qrcode-svg";
import colors from "../../Color";
import { Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from "react-native-vector-icons/Ionicons";
import LogoSvg from "../../LogioSvg";
import { useNavigation } from "@react-navigation/native";
import DonateNowModal from "../Components/DonateNowModal";
import useAuthUser from "../../Hooks/UseAuthUser";

const { width, height } = Dimensions.get("window");

const SingleDonationRequest = ({ route }) => {

const data  = useAuthUser();


  const [isModalVisible, setModalVisible] = useState(false);
  const navigation =useNavigation();
  const { request } = route.params;
  const hasDonations =
    request.Donations &&
    request.Donations.length > 0 &&
    request.Donations[0] !== "Object";

  const shareContent = async () => {
    try {
      await Share.share({
        message: `Check out this donation request from ${request.Users.Name}: ${request.Title}. Details: ${request.Description}`,
        url: "upi://arzitpanda.com",
        title: "Check out this donation request",
      });
    } catch (error) {
      Alert.alert(error.message);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <DonateNowModal
  isVisible={isModalVisible}
  onClose={() => setModalVisible(false)}
  requestId={request.Id}
  userId={data.pUser?.Id} // You need to provide the current user's ID
/>
      <View style={styles.headerBar}>
        <TouchableOpacity style={styles.backButton} onPress={()=>{navigation.goBack()}}>
          <Icon name="arrow-back" size={24} color={colors.text.primary} />
        </TouchableOpacity>
        <LogoSvg scale={0.6} />
      </View>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Image
            source={{
              uri: "https://media.istockphoto.com/id/1353332258/photo/donation-concept-the-volunteer-giving-a-donate-box-to-the-recipient-standing-against-the-wall.jpg?s=612x612&w=0&k=20&c=9AL8Uj9TTtrbHpM78kMp9fqjT_8EqpEekjdixeKUzDw=" ,
            }}
            style={styles.headerImage}
          />
          <View style={styles.headerOverlay}>
            <Text style={styles.title}>{request.Title}</Text>
            <TouchableOpacity style={styles.shareButton} onPress={shareContent}>
              <Icon
                name="share-social-outline"
                size={24}
                color={colors.text.primary}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.detailsContainer}>
          <Image
            source={{
              uri:
                request.Users.Details.ProfileImage ||
                "https://example.com/default-image.jpg",
            }}
            style={styles.profileImage}
          />
          <View style={styles.userInfo}>
            <Text style={styles.name}>{request.Users.Name}</Text>
            <Text style={styles.seekingAmount}>
              Seeking ₹{request.SeekingAmount}
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>About This Request</Text>
        <Text style={styles.description}>{request.Description}</Text>

        {hasDonations ? (
          <>
            <Text style={styles.sectionTitle}>Recent Donations</Text>
            {request.Donations.map((donation, index) => (
              <View key={donation.Id} style={styles.donationItem}>
                <Text style={styles.donationAmount}>₹{donation.Amount}</Text>
                <View style={styles.donationDetails}>
                  <Text style={styles.donationMessage}>{donation.Message}</Text>
                  <Text style={styles.donationDate}>
                    {formatDate(donation.ModifiedAt)}
                  </Text>
                </View>
              </View>
            ))}
          </>
        ) : null}

        <View style={styles.qrContainer}>
          <Text style={styles.qrTitle}>Scan QR to Donate</Text>
          <QRCode
            value="upi://pay?pa=example@upi&pn=DonationApp&mc=5732&tid=123456789&tr=Invoice123&tn=Donation%20to%20request&am=100.00&cu=INR"
            size={200}
          />
          <Text style={styles.qrDescription}>
            Use any UPI app to make a donation
          </Text>
        </View>

        <TouchableOpacity style={styles.callToActionButton}  onPress={() => setModalVisible(true)}>
          <Text style={styles.callToActionButtonText}>Donate Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: colors.primaryOpacity,
  },
  backButton: { padding: 8 },
  contentContainer: { paddingBottom: 24 },
  headerContainer: { position: "relative" },
  headerImage: { width: "100%", height: height * 0.3 },
  headerOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    flex: 1,
    marginRight: 16,
  },
  shareButton: {
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    padding: 12,
    borderRadius: 30,
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: colors.primaryOpacity,
  },
  profileImage: { width: 60, height: 60, borderRadius: 30, marginRight: 16 },
  userInfo: { flex: 1 },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.text.primary,
    marginBottom: 4,
  },
  seekingAmount: { fontSize: 16, color: colors.text.secondary },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.text.primary,
    marginTop: 20,
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  description: {
    fontSize: 16,
    color: colors.text.primary,
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  donationItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primaryOpacity,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    marginHorizontal: 16,
  },
  donationAmount: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.primary,
    marginRight: 16,
  },
  donationDetails: { flex: 1 },
  donationMessage: {
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 4,
  },
  donationDate: { fontSize: 14, color: colors.text.secondary },
  qrContainer: {
    alignItems: "center",
    marginTop: 24,
    padding: 20,
    backgroundColor: colors.primaryOpacity,
    borderRadius: 12,
    marginHorizontal: 16,
  },
  qrTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.secondary,
    marginBottom: 16,
  },
  qrDescription: {
    color: colors.text.secondary,
    marginTop: 12,
    fontSize: 14,
    textAlign: "center",
  },
  callToActionButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 24,
    marginHorizontal: 16,
  },
  callToActionButtonText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SingleDonationRequest;
