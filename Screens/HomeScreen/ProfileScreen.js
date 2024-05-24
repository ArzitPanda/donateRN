import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { Avatar, Badge, Divider, ListItem, color } from '@rneui/base';
import colors from '../../Color';


const ProfileScreen = () => {
  const userData = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    profilePicture: 'https://randomuser.me/api/portraits/men/32.jpg',
    phone: '+1 234 567 890',
    address: '123 Main Street, City, State, Country',
    donations: [
      { type: 'Money', amount: 500 },
      { type: 'Food', amount: 20 },
      { type: 'Blood', amount: 2 },
      { type: 'Books', amount: 15 },
    ],
  };

  const donationData = userData.donations.map(({ type, amount }) => ({
    x: type,
    y: amount,
  }));

  const pieData = [
    { value: 54, color: colors.background, text: 'book' },
    { value: 40, color: colors.primary, text: 'money' },
    { value: 20, color: colors.secondary, text: 'blood' },
    { value: 25, color: colors.text.secondary, text: 'blood' },
  ];

  const totalDonations = userData.donations.reduce(
    (total, { amount }) => total + amount,
    0
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar
          size="xlarge"
          rounded
          source={{ uri: userData.profilePicture }}
          containerStyle={styles.avatar}
        />
      
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
  
    backgroundColor: colors.background,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
  badgeContainer: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  badge: {
    color: colors.background,
    fontSize: 14,
  },
  divider: {
    backgroundColor: colors.text.secondary,
    marginVertical: 20,
  },
  donationChartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 10,
  },
  detailsContainer: {
    marginBottom: 20,
  },
  detailText: {
    color: colors.text.secondary,
    fontSize: 16,
  },
});

export default ProfileScreen;