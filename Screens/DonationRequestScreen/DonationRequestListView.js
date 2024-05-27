import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, TextInput, TouchableOpacity } from 'react-native';
import { ListItem, Avatar, Icon } from '@rneui/base';
import colors from '../../Color';
import QRCode from 'react-native-qrcode-svg';
import {Picker} from '@react-native-picker/picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoSvg from '../../LogioSvg';
import { useNavigation } from '@react-navigation/native';
const RequestsScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [minAmount, setMinAmount] = useState('');

const navigation =useNavigation();
const [requests, setRequest] = useState([]);


useEffect(() => {
    const fetchData = async () => {
      try {
        const jsonData = require('../../Dummy/UnitDonationRequest.json');
        setRequest(jsonData);
      } catch (error) {
        console.error(error);
      } finally {
       
      }
    };

    fetchData();
  }, []);





  const filteredRequests = requests.filter(request => {
    const categoryMatch = selectedCategory ? request.category === selectedCategory : true;
    const amountMatch = minAmount ? request.amount >= parseInt(minAmount) : true;
    return categoryMatch && amountMatch;
  });

  const renderRequest = ({ item }) => (
    <TouchableOpacity onPress={()=>{navigation.navigate('singleDonationRequest',{ request: item })}}>
    <ListItem containerStyle={styles.listItemContainer}>
      <Avatar
        rounded
        size={'small'}
        source={{ uri: 'https://randomuser.me/api/portraits/men/44.jpg' }}
        containerStyle={styles.avatarContainer}
      />
      <ListItem.Content>
        <View style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.subtitle}>{item.cause}</Text>
          </View>
          {item.category === 1 ? (
            <View style={{ display: "flex", flexDirection: 'column-reverse', justifyContent: 'center', alignItems: 'center' }}>
              <View style={styles.detailRow}>
                <Icon name="rupee" type="font-awesome" color={colors.text.primary} size={10} />
                <Text style={styles.detail}>{item.amount}</Text>
              </View>
              <QRCode
                value={item.bankDetails}
                size={30}
                backgroundColor={colors.background}
                color={colors.secondary}
              />
            </View>
          ) : (
            <View style={styles.detailRow}>
              <Icon name="tint" type="font-awesome" color={colors.text.primary} />
              <Text style={styles.detail}>{item.bloodType}</Text>
            </View>
          )}
        </View>
        <View style={styles.detailRow}>
          <Icon name="clock-o" type="font-awesome" color={colors.text.secondary} size={8} />
          <Text style={styles.lastUpdated}>
            {new Date(item.lastUpdated).toLocaleString()}
          </Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="users" type="font-awesome" color={colors.text.primary} size={8} />
          <Text style={styles.contributions}>{item.totalContributions}</Text>
        </View>
      </ListItem.Content>
    </ListItem>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
        <View style={{paddingHorizontal:20}}>
            <LogoSvg scale={0.8}/>
        </View>
      <View style={styles.filterContainer}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="All Categories" value={null} />
          <Picker.Item label="Medical Emergency" value={1} />
          <Picker.Item label="Blood Donation" value={2} />
        </Picker>
        <TextInput
          placeholder="Min Amount"
          value={minAmount}
          onChangeText={setMinAmount}
          keyboardType="numeric"
          style={styles.input}
        />
      </View>
      <FlatList
        data={filteredRequests}
        renderItem={renderRequest}
        keyExtractor={(item) => item.id.toString()}
  
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius:10
  },
  picker: {
    flex: 3,
    height: 50,
    backgroundColor:colors.primary
  },
  listItemContainer: {
    backgroundColor: colors.primaryOpacity,
    borderRadius: 10,
    
    padding:20,
    marginHorizontal: 10,
    display:'flex',
    flexDirection:'row',
    marginVertical: 5,
  },
  input: {
    flex: 1,
    height: 50,
   borderRadius:10,
    backgroundColor:colors.text.primary,
    borderWidth: 1,
    paddingLeft: 10,
    marginLeft: 10,
  },
  contentContainer: {
    backgroundColor: colors.primaryOpacity,
    borderRadius: 10,
    marginHorizontal: 10,
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:'row',
    marginVertical: 5,
  },
  avatarContainer: {
    backgroundColor: colors.secondary,
  },
  title: {
    color: colors.text.primary,
    fontWeight: 'bold',
    fontSize:10
  },
  subtitle: {
    color: colors.text.secondary,
    fontSize:7
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 2,
  },
  detail: {
    color: colors.text.primary,
    marginLeft: 5,
    fontSize:7
  },
  lastUpdated: {
    color: colors.text.secondary,
    fontSize: 8,
    marginLeft: 5,
  },
  contributions: {
    color: colors.text.primary,
    fontSize: 8,
    marginLeft: 5,
  },
});

export default RequestsScreen;