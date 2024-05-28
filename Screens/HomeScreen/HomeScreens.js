import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  Platform,
  Touchable,
  TouchableOpacity,
  ToastAndroid,
  Modal,
} from "react-native";
import { Icon } from "@rneui/base";
import LogoSvg from "../../LogioSvg";
import { ScrollView } from "react-native";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import useAuthUser from "../../Hooks/UseAuthUser";
import colors from "../../Color";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [feedData, setFeedData] = useState([]);
  const [webViewUrl, setWebViewUrl] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const user = useAuthUser();

  useEffect(() => {
    fetchNewsData();
  }, []);

  const fetchNewsData = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=charity&apiKey=${"8f0a4346048942d4b863d2c3958ad484"}`
      );
      const data = await response.json();
      if (data.status === "ok") {
        setFeedData(data.articles);
      } else {
        ToastAndroid.show("Failed to fetch news", ToastAndroid.SHORT);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      ToastAndroid.show("Failed to fetch news", ToastAndroid.SHORT);
    }
  };

  const handleArticlePress = (url) => {
    navigation.navigate("ArticleWebView", { url });
  };

  const handleCloseWebView = () => {
    setWebViewUrl("");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Navbar */}
      <TouchableOpacity
        style={{
          backgroundColor: colors.secondary,
          borderRadius: 20,
          width: 50,
          height: 50,
          shadowColor: colors.primary,
          shadowOpacity: 0.6,
          borderWidth: 4,
          borderColor: colors.text.secondary,
          position: "absolute",
          bottom: 30,
          right: 10,
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => {
          setModalVisible(true);
        }}
      >
        <View>
          <Icon
            name="charity"
            type="material-community"
            size={34}
            color={colors.primaryOpacity}
          />
        </View>
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        <View style={styles.navbar}>
          <LogoSvg scale={0.7} />
          <Image
            source={{ uri: user.pUser?.Details?.ProfileImage }}
            style={styles.navbarProfileImage}
          />
        </View>

        {/* Card Grid */}
        <View style={styles.cardGrid}>
          <Card title="Money Donate" icon={"credit-card"} />
          <Card title="Food Donate" icon={"cutlery"} />
          <Card title="Blood Donate" icon={"tint"} />
          <Card title="Book Donate" icon={"book"} />
        </View>

        {/* More Options */}
        <Text style={styles.moreOptionsText}>More Options</Text>

        {/* User Donation Information */}
        <View style={styles.userDonationSection}>
          <Text style={styles.sectionTitle}>Your Donations</Text>
          <View style={styles.donationInfo}>
            <Text style={styles.donationText}>Money Donated: $500</Text>
            <Text style={styles.donationText}>Food Donated: 20 kg</Text>
            <Text style={styles.donationText}>Blood Donated: 2 units</Text>
            <Text style={styles.donationText}>Books Donated: 15</Text>
          </View>
        </View>
        <View style={styles.feedSection}>
          {feedData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.feedItem}
              onPress={() => handleArticlePress(item.url)}
            >
              <Text style={styles.feedItemTitle}>{item.title}</Text>
              <Image
                source={{ uri: item.urlToImage }}
                style={{
                  width: "100%",
                  height: 100,
                  borderRadius: 10,
                  marginVertical: 5,
                }}
              />
              <Text style={styles.feedItemDescription}>{item.description}</Text>
            </TouchableOpacity>
          ))}
          {webViewUrl ? (
            <WebView
              source={{ uri: webViewUrl }}
              style={{ flex: 1 }}
              onNavigationStateChange={(navState) => {
                // Handle WebView navigation state changes here
              }}
              startInLoadingState
              scalesPageToFit
            />
          ) : null}
        </View>
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        presentationStyle="overFullScreen"
        style={{ backgroundColor: colors.background }}
      >
        <View
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <View
            style={{
              height: 300,
              width: "100%",
              backgroundColor: colors.primary,
              borderTopWidth: 1,
              borderColor: colors.secondary,
              borderTopLeftRadius: 20,
              borderTopEndRadius: 20,
            }}
          >
            <View
              style={{
                backgroundColor: colors.secondary,
                padding: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
            >
              <Text>DonationDetails</Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(false);
                }}
              >
                <Icon
                  type="font-awsome"
                  name="close"
                  color={colors.primaryOpacity}
                  size={24}
                />
              </TouchableOpacity>
            </View>
            <View
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                flex: 1,
                rowGap: 2,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: colors.primaryOpacity,
                  padding: 5,
                  width: "80%",
                  paddingVertical: 10,
                  borderRadius: 4,
                  marginHorizontal: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "800",
                    color: colors.secondary,
                  }}
                >
                  want to Donate
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.primaryOpacity,
                  padding: 5,
                  width: "80%",
                  paddingVertical: 10,
                  borderRadius: 4,
                  marginHorizontal: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}


                onPress={()=>{navigation.navigate('AddDonationRequest')}}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: "800",
                    color: colors.secondary,
                  }}
                >
                  Donation Request
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const Card = ({ title, icon }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Add", { screen: "Map" });
      }}
      style={styles.card}
    >
      <Icon name={icon} type="font-awesome" color="#ff9800" size={24} />
      <Text style={styles.cardTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Platform.select({ web: "50%", default: "100%" }),
    backgroundColor: "#121212",
    padding: Platform.select({ android: 10, ios: 10 }),
  },
  navbar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  navbarTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  navbarProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  cardGrid: {
    paddingHorizontal: Platform.select({ ios: 10, android: 0 }),
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    backgroundColor: "#222",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: "center",
  },
  cardTitle: {
    color: "#fff",
    marginTop: 10,

    textAlign: "center",
  },
  moreOptionsText: {
    color: "#ff9800",
    marginBottom: 20,
    marginHorizontal: Platform.select({ android: 0, ios: 20 }),
  },
  userDonationSection: {
    backgroundColor: "#222",
    borderRadius: 10,
    padding: 20,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  donationInfo: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  donationText: {
    color: "#aaa",
    marginBottom: 5,
    fontSize: 12,
    width: "48%",
  },

  feedSection: {
    marginTop: 20,
  },
  feedItem: {
    backgroundColor: "#222",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  feedItemTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  feedItemDescription: {
    color: "#aaa",
  },
});

export default HomeScreen;
