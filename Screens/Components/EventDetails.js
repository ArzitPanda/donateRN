import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../Color';

const EventDetails = ({ eventData }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{eventData.title}</Text>
      <View style={styles.detailsContainer}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>📍</Text>
        </View>
        <Text style={styles.detailText}>{eventData.address}</Text>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>⏰</Text>
        </View>
        <Text style={styles.detailText}>
          {eventData.timing} on {eventData.date}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 20,
    marginHorizontal:10,
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 10,
  },
  detailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  iconContainer: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    padding: 5,
    marginRight: 10,
  },
  icon: {
    fontSize: 16,
    color: colors.background,
  },
  detailText: {
    color: colors.text.secondary,
    fontSize: 16,
  },
});

export default EventDetails;