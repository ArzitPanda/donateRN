import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Avatar, Badge, Divider } from '@rneui/base';

import colors from '../../Color';
import { PieChart } from 'react-native-gifted-charts';

const ProfileScreen = () => {
  const userData = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    profilePicture: 'https://randomuser.me/api/portraits/men/32.jpg',
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
    {value: 54, color: colors.background, text: 'book'},
    {value: 40, color: colors.primary, text: 'money'},
    {value: 20, color: colors.secondary, text: 'blood'},
    {value: 25, color: colors.text.secondary, text: 'blood'},
];


  const totalDonations = userData.donations.reduce(
    (total, { amount }) => total + amount,
    0
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar
          size="large"
          rounded
          source={{ uri: userData.profilePicture }}
          containerStyle={styles.avatar}
        />
        <View style={styles.userInfo}>
          <Text style={styles.name}>{userData.name}</Text>
          <Badge
            value={`Total Donations: ${totalDonations}`}
            textStyle={styles.badge}
            badgeStyle={styles.badgeContainer}
          />
        </View>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.donationChartContainer}>
        <Text style={styles.sectionTitle}>Donation Summary</Text>
        <PieChart
            showText
            textColor="black"
            radius={150}
            textSize={20}
            showTextBackground
            textBackgroundRadius={26}
            data={pieData}
            />
      </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.sectionTitle}>Contact Details</Text>
        <Text style={styles.detailText}>Email: {userData.email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:50,
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