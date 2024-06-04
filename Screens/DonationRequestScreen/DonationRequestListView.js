import React, { useEffect, useState } from 'react';
import { View, StyleSheet, FlatList, Text, TextInput, TouchableOpacity, Modal, Dimensions } from 'react-native';
import { Avatar } from '@rneui/base';
import colors from '../../Color';
import QRCode from 'react-native-qrcode-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoSvg from '../../LogioSvg';
import { useNavigation } from '@react-navigation/native';
import supabase from '../../config';
import Icon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const RequestsScreen = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [minAmount, setMinAmount] = useState('');
  const [requests, setRequests] = useState([]);
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase.from('UnitDonations').select(`
          *, Donations (*), Users (Name, Details (ProfileImage))
        `);
        if (error) console.error('Error fetching data:', error);
        else setRequests(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const filteredRequests = requests.filter(request => {
    const categoryMatch = selectedCategory ? request.Category === selectedCategory : true;
    const amountMatch = minAmount ? request.SeekingAmount >= parseInt(minAmount) : true;
    return categoryMatch && amountMatch;
  });

  const renderRequest = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('singleDonationRequest', { request: item })}>
      <View style={styles.cardHeader}>
        <Avatar
          rounded
          size={60}
          source={{ uri: item.Users.Details.ProfileImage || 'https://example.com/default-image.jpg' }}
          containerStyle={styles.avatarContainer}
        />
        <View style={styles.headerDetails}>
          <Text style={styles.name}>{item.Users.Name}</Text>
          <Text style={styles.title}>{item.Title}</Text>
        </View>
        {item.Category === 1 ? (
          <View style={styles.qrContainer}>
            <QRCode value={item.PhotoUrls} size={50} backgroundColor={colors.background} color={colors.primary} />
          </View>
        ) : (
          <View style={styles.bloodTypeContainer}>
            <Icon name="water" size={24} color={colors.primary} />
            <Text style={styles.bloodType}>{item.bloodType}</Text>
          </View>
        )}
      </View>
      <Text style={styles.description} numberOfLines={2}>{item.Description}</Text>
      <View style={styles.footer}>
        <View style={styles.detailRow}>
          <Icon name="time-outline" size={16} color={colors.text.secondary} />
          <Text style={styles.detailText}>{new Date(item.lastUpdated).toLocaleDateString()}</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name="heart-outline" size={16} color={colors.primary} />
          <Text style={styles.detailText}>{item.Donations.length} donors</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <LogoSvg scale={0.7}/>
        <TouchableOpacity style={styles.filterButton} onPress={() => setFilterModalVisible(true)}>
          <Icon name="options-outline" size={24} color={colors.text.primary} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredRequests}
        renderItem={renderRequest}
        keyExtractor={(item) => item.Id.toString()}
        contentContainerStyle={styles.listContainer}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilterModalVisible}
        onRequestClose={() => setFilterModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Filter Options</Text>
            <View style={styles.filterOption}>
              <Text style={styles.filterLabel}>Category:</Text>
              <View style={styles.buttonGroup}>
                <TouchableOpacity style={[styles.categoryButton, selectedCategory === null && styles.selectedButton]} onPress={() => setSelectedCategory(null)}>
                  <Text style={styles.categoryButtonText}>All</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.categoryButton, selectedCategory === 1 && styles.selectedButton]} onPress={() => setSelectedCategory(1)}>
                  <Text style={styles.categoryButtonText}>Medical</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.categoryButton, selectedCategory === 2 && styles.selectedButton]} onPress={() => setSelectedCategory(2)}>
                  <Text style={styles.categoryButtonText}>Blood</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.filterOption}>
              <Text style={styles.filterLabel}>Min Amount:</Text>
              <TextInput
                placeholder="e.g., 1000"
                value={minAmount}
                onChangeText={setMinAmount}
                keyboardType="numeric"
                style={styles.amountInput}
              />
            </View>
            <TouchableOpacity style={styles.applyButton} onPress={() => setFilterModalVisible(false)}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.primaryOpacity,
  },
  filterButton: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 30,
  },
  listContainer: { padding: 16 },
  card: {
    backgroundColor: colors.primaryOpacity,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarContainer: {
    backgroundColor: colors.secondary,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  headerDetails: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text.primary,
  },
  title: {
    fontSize: 16,
    color: colors.text.secondary,
  },
  qrContainer: {
    padding: 6,
    backgroundColor: colors.background,
    borderRadius: 8,
  },
  bloodTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    backgroundColor: colors.background,
    borderRadius: 8,
  },
  bloodType: {
    marginLeft: 4,
    color: colors.primary,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: colors.text.primary,
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 4,
    fontSize: 12,
    color: colors.text.secondary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 24,
    width: width * 0.8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: 16,
    textAlign: 'center',
  },
  filterOption: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.text.primary,
    marginBottom: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: colors.primaryOpacity,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: colors.primary,
  },
  categoryButtonText: {
    color: colors.text.primary,
    fontWeight: '500',
  },
  amountInput: {
    height: 44,
    borderRadius: 8,
    backgroundColor: colors.primaryOpacity,
    paddingHorizontal: 12,
    fontSize: 16,
    color: colors.text.primary,
  },
  applyButton: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  applyButtonText: {
    color: colors.text.primary,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default RequestsScreen;