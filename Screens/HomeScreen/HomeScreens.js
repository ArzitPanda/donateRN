import React from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView, Platform, Touchable, TouchableOpacity } from 'react-native';
import { Icon } from '@rneui/base';
import LogoSvg from '../../LogioSvg';
import { ScrollView } from 'react-native';
import { FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {


     const feedData = [
    {
      id: 1,
      title: 'New Donation Drive for Education',
      description: 'Join our efforts to support underprivileged children\'s education.',
    },
    {
      id: 2,
      title: 'Successful Blood Donation Camp',
      description: 'Thank you for your overwhelming response at our recent blood donation camp.',
    },
    {
      id: 3,
      title: 'Clothing Donation Drive',
      description: 'Donate your gently used clothing to help those in need.',
    },
  ];
  return (
    <SafeAreaView style={styles.container} >
      {/* Navbar */}
     <ScrollView style={styles.container}>
     <View style={styles.navbar}>
       <LogoSvg scale={0.7}/>
        <Image
          source={require('../../assets/icon.png')}
          style={styles.navbarProfileImage}
        />
      </View>

      {/* Card Grid */}
      <View style={styles.cardGrid}>
        <Card title="Money Donate" icon={'credit-card'} />
        <Card title="Food Donate" icon={'cutlery'} />
        <Card title="Blood Donate" icon={'tint'} />
        <Card title="Book Donate" icon={'book'} />
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
        <Text style={styles.sectionTitle}>News and Updates</Text>
        {feedData.map((item) => (
          <View key={item.id} style={styles.feedItem}>
            <Text style={styles.feedItemTitle}>{item.title}</Text>
            <Image source={{uri:'https://source.unsplash.com/featured/?donation'}} style={{width:'100%',height:100,borderRadius:10,marginVertical:5}} />
            <Text style={styles.feedItemDescription}>{item.description}</Text>
          </View>
        ))}
      </View>
     </ScrollView>
    </SafeAreaView>
  );
};

const Card = ({ title ,icon}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={()=>{navigation.navigate('Add',{screen:'Map'})}} style={styles.card}  >
      <Icon name={icon} type="font-awesome" color="#ff9800" size={24} />
      <Text style={styles.cardTitle}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Platform.select({web:'50%',default:'100%'}),
    backgroundColor: '#121212',
    padding: Platform.select({android:10,ios:10})
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal:10
  },
  navbarTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  navbarProfileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  cardGrid: {
    paddingHorizontal:Platform.select({ios:10,android:0}),
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  cardTitle: {
    color: '#fff',
    marginTop: 10,
    
    textAlign: 'center',
  },
  moreOptionsText: {
    color: '#ff9800',
    marginBottom: 20,
    marginHorizontal:Platform.select({android:0,ios:20})
  },
  userDonationSection: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 20,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  donationInfo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  donationText: {
    color: '#aaa',
    marginBottom: 5,
    fontSize:12,
    width: '48%',

  },

  feedSection: {
    marginTop: 20,
  },
  feedItem: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  feedItemTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  feedItemDescription: {
    color: '#aaa',
  },
});

export default HomeScreen