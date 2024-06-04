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
import { getFromLocalStorage, saveToLocalStorage } from "../../Hooks/LocalStorageUtils";

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
      const cachedData = await getFromLocalStorage('newsData');
      if (cachedData) {
        setFeedData(cachedData);
        return;
      }

      const response = await fetch(
        `https://newsapi.org/v2/everything?q=charity&apiKey=${"8f0a4346048942d4b863d2c3958ad484"}`
      );
      const data = await response.json();
      if (data.status === "ok") {
        setFeedData(data.articles);
        await saveToLocalStorage('newsData', data.articles, 24 * 60 * 60 * 1000); // Cache for 1 day
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
      <View style={styles.navbar}>
          <LogoSvg scale={0.7} />
         <TouchableOpacity onPress={()=>{navigation.navigate('SpeedDial')}}>
         <Image
            source={{ uri: user.pUser?.Details?.ProfileImage }}
            style={styles.navbarProfileImage}
          />
         </TouchableOpacity>
        </View>
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
       

        {/* Card Grid */}
        <View style={styles.cardGrid}>
          <Card title="Money Donate" icon={"credit-card"} category={4} />
          <Card title="Food Donate" icon={"cutlery"} category={2}  />
          <Card title="Blood Donate" icon={"tint"}  category={1} />
          <Card title="Cloth Donate" icon={"google-wallet"}  category={3} />
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
          {feedData.slice(0,10).map((item, index) => (
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
        onRequestClose={() => setModalVisible(false)}
        style={{ backgroundColor: colors.background }}
      >
        <View style={styles.modalContainer}>
        
          <View style={styles.modalContent}>
        
            <View style={styles.modalHeader}>
            <Text style={styles.modalHeaderText}>Donation Details</Text>
            <TouchableOpacity  onPress={()=>{setModalVisible(false)}}>
            <Icon name="cancel" type="font-awsome" size={24} color={colors.accent}/>
          </TouchableOpacity>

          </View>
             
              <View style={styles.modalBody}>
                
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonWithIcon]}
                  onPress={() => handleDonateAction()}
                >
                  <Icon
                    type="font-awesome-5"
                    name="hand-holding-heart"
                    color={colors.text.primary}
                    size={20}
                    style={styles.modalButtonIcon}
                  />
                  <Text style={styles.modalButtonText}>Want to Donate</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, styles.modalButtonWithIcon]}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate("AddDonationRequest");
                  }}
                >
                  <Icon
                    type="font-awesome-5"
                    name="donate"
                    color={colors.text.primary}
                    size={20}
                    style={styles.modalButtonIcon}
                  />
                  <Text style={styles.modalButtonText}>Donation Request</Text>
                </TouchableOpacity>
              </View>
           
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const Card = ({ title, icon ,category}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        
          if(category===1 || category ===4)
            {
              navigation.navigate("requestList");
            }
            else
            {
              navigation.navigate("Map",{data:null,singleItem: false,category:category});
            }



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
    marginTop:20,
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
  modalContainer: {
    flex: 1,

    justifyContent: "flex-end",
    backgroundColor: colors.primaryOpacity,
  },
  modalContent: {
    backgroundColor: colors.primary,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 24,
    display:'flex',
    flexDirection:'column'
  },
  modalHeader: {
    flexDirection: "row",
    
    alignItems: "center",
    justifyContent:'space-between',
    marginBottom: 16,
  },
  modalHeaderText: {
    color: colors.text.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
  modalBody: {
    rowGap: 16,
  },
  modalButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  modalButtonWithIcon: {
    paddingHorizontal: 24,
  },
  modalButtonIcon: {
    marginRight: 8,
  },
  modalButtonText: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: "bold",
  }
});

export default HomeScreen;
