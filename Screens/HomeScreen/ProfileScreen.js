import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, ToastAndroid } from 'react-native';
import { Avatar, Divider, Button } from '@rneui/base';
import LottieView from 'lottie-react-native';
import colors from '../../Color';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoSvg from '../../LogioSvg';
import { Chip, Icon } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import supabase from '../../config';

const ProfileScreen = () => {
  const navigation = useNavigation();
const [pUser,setPuser] = useState({});
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();

       

        if (error) {
          console.error(error);
          return;
        }
        const dbuser =  await supabase
        .from('Users')
        .select("*")
        // Filters
        .eq('AuthId', user.id)

        if(dbuser.data)
        {
          setPuser(dbuser.data[0])
          console.log(dbuser.data[0])
        }

       
        ToastAndroid.show(user.toString(), ToastAndroid.SHORT);
        



        console.log(user);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };
  
    fetchUser();
  }, []);


  const userData = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    profilePicture: 'https://randomuser.me/api/portraits/men/30.jpg',
    phone: '+1 234 567 890',
    address: '123 Main Street, City, State, Country',
    bio: 'A passionate philanthropist and adventurer. Loves to help people and explore new places.',
    interests: ["Traveling", "Reading", "Cooking", "Sports"],
    donations: [
      { type: 'Money', amount: 500 },
      { type: 'Food', amount: 20 },
      { type: 'Blood', amount: 2 },
      { type: 'Books', amount: 15 },
    ],
  };

  return (
   <SafeAreaView style={styles.container}>
       <View style={{ marginTop:10,marginHorizontal:1,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
       <View style={{paddingStart:10}}>
       <LogoSvg scale={0.8} />
       </View>
       <TouchableOpacity onPress={()=>{ navigation.navigate('ProfileEdit')}}>
        <View style={styles.buttonContainer}>
   
    <Icon name='edit' color={colors.text.primary} type='font-awsome' size={24}/>
 
      </View>
      </TouchableOpacity>
        </View>
  
     <ScrollView alwaysBounceVertical={true}  >

      <View style={styles.header}>
        <Avatar
          size="large"
          rounded
          source={{ uri: userData.profilePicture }}
          containerStyle={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.email}>{pUser?.Email}</Text>
          <Text style={styles.phone}>{userData.phone}</Text>
          <Text style={styles.address}>{userData.address}</Text>
        </View>
      </View>
 
      <Divider style={styles.divider} />
      
      <Text style={styles.bio}>{userData.bio}</Text>
      <Text style={styles.interests}>intrests</Text>
      <View style={{display:'flex',flexDirection:'row',columnGap:5}}>
      {
        userData.interests.map((ele)=>{return (<Chip title={ele} color={colors.secondary}></Chip>)})
      }

      </View>
      <Divider style={styles.divider} />
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Donations</Text>
        {userData.donations.map((donation, index) => (
          <View key={index} style={styles.donationItem}>
            <Text style={styles.donationType}>{donation.type}</Text>
            <Text style={styles.donationAmount}>{donation.amount}</Text>
          </View>
        ))}
      </View>
      
      <Divider style={styles.divider} />
      
     
    </ScrollView>
   </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
   paddingHorizontal:15
  },
  bannerImage: {
    width: '100%',

    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    justifyContent:'space-around',
    marginTop:20
  },
  avatar: {
    borderWidth: 2,
    borderColor: colors.secondary,
  },
  userInfo: {
    marginLeft: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  email: {
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: 5,
  },
  phone: {
    fontSize: 16,
    color: colors.text.secondary,
    marginTop: 5,
  },
  address: {
    fontSize: 12,
    display:'flex',
    color: colors.text.secondary,
    marginTop: 5,
    textAlign:"justify",
    flexWrap:'wrap'
  },
  animation: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  divider: {
    backgroundColor: colors.text.secondary,
    marginVertical: 20,
  },
  bio: {
    fontSize: 16,
    color: colors.text.primary,
    marginBottom: 10,
  },
  interests: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 20,
  },
  section: {
    marginBottom: 20,
    backgroundColor:colors.primaryOpacity,
    padding:15,
    borderWidth:0.2,
    borderColor:colors.text.secondary,
    borderRadius:10
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.secondary,

    marginBottom: 10,
  },
  donationItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  donationType: {
    fontSize: 16,
    color: colors.text.primary,
  },
  donationAmount: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  buttonContainer: {
    alignItems: 'center',
   backgroundColor:colors.secondary,
   padding:10,
   borderCurve:'circular',
   borderRadius:20
  },
  button: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonTitle: {
    fontSize: 16,
    color: colors.background,
  },
});

export default ProfileScreen;
