import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet,Image, Text, ActivityIndicator} from 'react-native';
import { Button, ListItem, Icon } from '@rneui/base';
import axios from 'axios';
import colors from '../../Color'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoSvg from '../../LogioSvg';

const NonUnitDonationScreen = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = require('../../Dummy/AntiUnitDonation.json');
        setData(jsonData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
    <View style={{ marginTop:10,marginHorizontal:25}}>
        <LogoSvg scale={0.8} />
        </View>
      <ScrollView>

        <Text style={{fontSize:20,marginHorizontal:20,color:colors.secondary,marginTop:10,marginBottom:20}}>Recent Donations</Text>



        {data.map((item, index) => (
          <ListItem key={index}   
          containerStyle={{backgroundColor:colors.primaryOpacity,marginHorizontal:20,borderWidth:1,borderColor:colors.primary,marginVertical:3,borderRadius:10}}
          style={{backgroundColor:colors.background}}
        >
             <Image   source={require("../../charity-box.png")} style={{width:50,height:60,rotation:'180deg'}}/>
            <ListItem.Content>
              <ListItem.Title style={styles.title}>{item.Title}</ListItem.Title>
              <ListItem.Subtitle style={styles.subtitle}>{item.Description}</ListItem.Subtitle>
              <Text style={styles.details}>Location: {item.Location}</Text>
              <Text style={styles.details}>Timing: {new Date(item.Timing).toLocaleString()}</Text>
            </ListItem.Content>
          </ListItem>
        ))}
        {/* <Image   source={require("../../charity-box.png")} style={{width:100,height:200}}/> */}


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
