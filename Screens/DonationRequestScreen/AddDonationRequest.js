import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, ImageBackground, ToastAndroid, TouchableOpacity } from 'react-native';
import { Button, Input, Text, Avatar, Overlay, Chip } from '@rneui/themed';
import colors from '../../Color';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoSvg from '../../LogioSvg';
import supabase from '../../config';
import useAuthUser from '../../Hooks/UseAuthUser';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';

const DonationRequestScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState(null);
  const [seekingAmount, setSeekingAmount] = useState('');
  const [photoUrl, setPhotoUrl] = useState(null);
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);


  const navigation = useNavigation();
  const auth = useAuthUser();

  const handleSubmit = async () => {
    if (!category) {
      ToastAndroid.show('Please select a category', ToastAndroid.SHORT);
      return;
    }

    const path = `public/${Date.now().toString()}`;
    const image = await supabase
      .storage
      .from('danaw')
      .upload(path, selectedImage, {
        cacheControl: '3600',
        upsert: false,
      });

    if (image.error === null) {
      const { data, error } = await supabase
        .from('UnitDonations')
        .insert([
          {
            Title: title,
            Description: description,
            Category: category,
            SeekingAmount: seekingAmount,
            PhotoUrls: `${supabase.storage.from('danaw').getPublicUrl("").data.publicUrl}/${path}`,
            RequestorId: auth.pUser?.Id,
          },
        ])
        .select();

      if (error) {
        ToastAndroid.show('Error inserting data:', ToastAndroid.SHORT);
      } else {
        ToastAndroid.show('Donate request added successfully', ToastAndroid.SHORT);
        setTitle('');
        setDescription('');
        setCategory(null);
        setSeekingAmount('');
        setPhotoUrl(null);
      }
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9], // Landscape aspect ratio
      quality: 1,
      base64:true, 
    });

    if (!result.cancelled) {
      setSelectedImage(result.assets[0]);
      setVisible(true);
    }
  };

  const addPhotoUrl = () => {
    if (selectedImage) {
      setPhotoUrl(selectedImage);
      setVisible(false);
      setSelectedImage(null);
    }
  };

  return (
    <SafeAreaView style={styles.backgroundImage}>
      <View style={{ backgroundColor: colors.primaryOpacity, padding: 20 ,display:'flex',flexDirection:'row',columnGap:10}}>
    <TouchableOpacity onPress={()=>{
        navigation.goBack();


    }}>
    <Icon name="chevron-left" type='font-awsome' size={24} color={colors.text.primary}/>
    </TouchableOpacity>
        <LogoSvg scale={0.8} />
      </View>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
      >
        <Input
          label="Title"
          value={title}
          onChangeText={setTitle}
          inputStyle={styles.input}
          inputContainerStyle={styles.inputContainer}
          labelStyle={styles.label}
        />
        <DescriptionInput
          value={description}
          onChangeText={setDescription}
          style={styles.descriptionInput}
        />
        <View style={styles.categoryContainer}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.categoryChips}>
            <Chip
              title="Blood"
              containerStyle={[
                styles.chip,
                category === 1 && styles.selectedChip,
              ]}
              onPress={() => setCategory(1)}
            />
            <Chip
              title="Money"
              containerStyle={[
                styles.chip,
                category === 2 && styles.selectedChip,
              ]}
              onPress={() => setCategory(2)}
            />
          </View>
        </View>
        <Input
          label="Seeking Amount"
          value={seekingAmount}
          onChangeText={setSeekingAmount}
          inputStyle={styles.input}
          inputContainerStyle={styles.inputContainer}
          labelStyle={styles.label}
        />
        <View style={styles.photoContainer}>
          <Text style={styles.label}>Photo</Text>
          <View style={styles.photoPreview}>
        
            {!photoUrl && (
              <Button
                title="Add Photo"
                onPress={pickImage}
                buttonStyle={styles.addPhotoButton}
                titleStyle={styles.addPhotoButtonText}
              />
            )}
          </View>
        </View>
        <Button
          title="Submit Request"
          onPress={handleSubmit}
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
        />
      </ScrollView>
   
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: 16,
  },
  input: {
    color: colors.text.primary,
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    shadowColor: colors.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  inputContainer: {
    borderBottomWidth: 0,
  },
  label: {
    color: colors.text.primary,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  button: {
    marginTop: 16,
    backgroundColor: colors.primary,
  },
  buttonText: {
    color: colors.text.primary,
    fontWeight: 'bold',
  },
  photoContainer: {
    marginVertical: 16,
  },
  photoPreview: {
    alignItems: 'center',
  },
  photoImage: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoButton: {
    backgroundColor: colors.secondary,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addPhotoButtonText: {
    color: colors.text.primary,
    fontWeight: 'bold',
  },
  changePhotoButton: {
    backgroundColor: colors.primaryOpacity,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  changePhotoButtonText: {
    color: colors.text.primary,
    fontWeight: 'bold',
  },
  overlay: {
    backgroundColor: colors.primaryOpacity,
    padding: 16,
    borderRadius: 8,
  },
  overlayImage: {
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayButton: {
    backgroundColor: colors.accent,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  overlayButtonText: {
    color: colors.text.primary,
    fontWeight: 'bold',
  },
  categoryContainer: {
    marginVertical: 16,
  },
  categoryChips: {
    flexDirection: 'row',
    marginTop: 8,
  },
  chip: {
    marginRight: 8,
    backgroundColor: colors.primary,
  },
  selectedChip: {
    backgroundColor: colors.accent,
  },
  descriptionInput: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    padding: 12,
    shadowColor: colors.text.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    minHeight: 100,
    textAlignVertical: 'top',
    color: colors.text.primary,
  },
});

// DescriptionInput component
const DescriptionInput = ({ value, onChangeText, style }) => {
  return (
    <Input
      label="Description"
      value={value}
      onChangeText={onChangeText}
      inputStyle={style}
      inputContainerStyle={styles.inputContainer}
      labelStyle={styles.label}
      multiline
    />
  );
};

export default DonationRequestScreen;