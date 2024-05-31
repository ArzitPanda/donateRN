import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Image, Text, ActivityIndicator, RefreshControl } from 'react-native';
import { Button, ListItem, Icon } from '@rneui/base';
import colors from '../../Color'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoSvg from '../../LogioSvg';
import supabase from '../../config';

const NonUnitDonationScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchData = async () => {
    try {
      const { data, error } = await supabase.from('AntiUnitDonations').select('*').range(0, 10);

      if (error) {
        throw new Error(error.message);
      } else {
        setData(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ marginTop: 10, marginHorizontal: 25 }}>
        <LogoSvg scale={0.8} />
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Text style={styles.heading}>Recent Donations</Text>

        {data.map((item, index) => (
          <ListItem
            key={index}
            containerStyle={styles.listItemContainer}
            style={styles.listItemStyle}
            onPress={() =>{navigation.navigate('Map',{data: item,singleItem: true,category:null})}}
          >
            <Image source={require("../../charity-box.png")} style={styles.charityImage} />
            <ListItem.Content>
              <ListItem.Title style={styles.title}>{item.Title}</ListItem.Title>
              <ListItem.Subtitle style={styles.subtitle}>{item.Description}</ListItem.Subtitle>
              <Text style={styles.details}>Location: {item.Location}</Text>
              <Text style={styles.details}>Timing: {new Date(item.Timing).toLocaleString()}</Text>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
      <Button
        title="Add Donation"
        buttonStyle={styles.button}
        onPress={() => navigation.navigate('addDonate')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  heading: {
    fontSize: 20,
    marginHorizontal: 20,
    color: colors.secondary,
    marginTop: 10,
    marginBottom: 20,
  },
  listItemContainer: {
    backgroundColor: colors.primaryOpacity,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: colors.primary,
    marginVertical: 3,
    borderRadius: 10,
  },
  listItemStyle: {
    backgroundColor: colors.background,
  },
  charityImage: {
    width: 50,
    height: 60,
    transform: [{ rotate: '180deg' }],
  },
  title: {
    color: colors.text.primary,
  },
  subtitle: {
    color: colors.text.secondary,
  },
  details: {
    color: colors.text.primary,
  },
  button: {
    backgroundColor: colors.secondary,
    margin: 20,
    borderRadius: 5,
  },
});

export default NonUnitDonationScreen;
