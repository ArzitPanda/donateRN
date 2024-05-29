import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Avatar, Icon } from '@rneui/base';
import colors from '../Color';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoSvg from '../LogioSvg';

const SpeedDialScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Implement your logout logic here
  };

  const navigateTo = (screen) => {
    navigation.navigate(screen);
  };

  return (
    <SafeAreaView style={{flex:1}}>
        <View style={{ backgroundColor: colors.primaryOpacity, padding: 20 ,display:'flex',flexDirection:'row',columnGap:10}}>
    <TouchableOpacity onPress={()=>{
        navigation.goBack();


    }}>
    <Icon name="chevron-left" type='font-awsome' size={24} color={colors.text.primary}/>
    </TouchableOpacity>
        <LogoSvg scale={0.8} />
      </View>
    <ScrollView style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Avatar
          rounded
          size="medium"
          source={{ uri: 'https://via.placeholder.com/150' }} // Replace with your avatar image
          containerStyle={styles.avatar}
        />
        <View style={styles.userDetails}>
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>john.doe@example.com</Text>
          <Text style={styles.age}>Age: 25</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile</Text>
        <View style={styles.sectionContainer}>
     <TouchableOpacity style={[styles.option,styles.optionEven]}  onPress={() => navigateTo('ViewProfile')}>
          <Icon name="user" type="font-awesome" color={colors.secondary} />
          <Text style={styles.optionText}>View Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.option,styles.optionEven]}  onPress={() => navigateTo('EditProfile')}>
          <Icon name="edit" type="font-awesome" color={colors.secondary} />
          <Text style={styles.optionText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.option,styles.optionEven]}  onPress={() => navigateTo('Security')}>
          <Icon name="lock" type="font-awesome" color={colors.secondary} />
          <Text style={styles.optionText}>Security</Text>
        </TouchableOpacity>
     </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Donation</Text>
      <View style={styles.sectionContainer}>
      <TouchableOpacity style={[styles.option,styles.optionEven]}  onPress={() => navigateTo('AddDonation')}>
          <Icon name="plus" type="font-awesome" color={colors.secondary} />
          <Text style={styles.optionText}>Add Donation</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.option,styles.optionEven]}  onPress={() => navigateTo('YourDonations')}>
          <Icon name="list" type="font-awesome" color={colors.secondary} />
          <Text style={styles.optionText}>Your Donations</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.option,styles.optionEven]}  onPress={() => navigateTo('DonationRequests')}>
          <Icon name="inbox" type="font-awesome" color={colors.secondary} />
          <Text style={styles.optionText}>Donation Requests</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.option,styles.optionEven]}  onPress={() => navigateTo('TopContributors')}>
          <Icon name="star" type="font-awesome" color={colors.secondary} />
          <Text style={styles.optionText}>Top Contributors</Text>
        </TouchableOpacity>
      </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Help</Text>
        <View style={styles.sectionContainer}>
        <TouchableOpacity style={[styles.option,styles.optionEven]}  onPress={() => navigateTo('Help')}>
          <Icon name="question" type="font-awesome" color={colors.secondary} />
          <Text style={styles.optionText}>Help</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.option,styles.optionEven]} onPress={() => navigateTo('TermsAndConditions')}>
          <Icon name="file-text" type="font-awesome" color={colors.secondary} />
          <Text style={styles.optionText}>Terms and Conditions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.option,styles.optionEven]}  onPress={() => navigateTo('AboutService')}>
          <Icon name="info" type="font-awesome" color={colors.secondary} />
          <Text style={styles.optionText}>About the Service</Text>
        </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
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
    userInfoContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 24,
      paddingHorizontal:20,
      marginVertical:10
    },
    avatar: {
      marginRight: 16,
    },
    userDetails: {
      flex: 1,
      padding:10,
      borderRadius:5,
     display: 'flex',
     alignItems: 'flex-end',
     justifyContent:'center'
    },
    name: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text.primary,
    },
    email: {
      fontSize: 16,
      color: colors.text.secondary,
    },
    age: {
      fontSize: 16,
      color: colors.text.secondary,
    },
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 16,
      
      fontWeight: 'bold',
      color: colors.text.primary,
      marginBottom: 8,
      padding:10,
      
    },
    option: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 4,
      borderRadius:4,
      padding:10,
    },
    optionOdd:{
            backgroundColor:colors.primaryOpacity
    },
    optionEven:{

        backgroundColor:colors.primary
    },
    optionText: {
      fontSize: 16,
      color: colors.text.primary,
      marginLeft: 8,
    },
    logoutButton: {
      backgroundColor: colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 16,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 24,
    },
    logoutButtonText: {
      color: colors.text.primary,
      fontSize: 16,
      fontWeight: 'bold',
    },
    sectionContainer:{
        padding:10,
        display:'flex',
        rowGap:6
    }
  });

export default SpeedDialScreen;