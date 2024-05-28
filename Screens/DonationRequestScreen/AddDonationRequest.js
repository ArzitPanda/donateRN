import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { Button, Input, Text, Avatar, Overlay } from '@rneui/themed';

import colors from '../../Color';
import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoSvg from '../../LogioSvg';

const DonationRequestScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [seekingAmount, setSeekingAmount] = useState('');
  const [photoUrls, setPhotoUrls] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSubmit = async () => {
    // ... (existing submit logic)
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
      setVisible(true);
    }
  };

  const addPhotoUrl = () => {
    if (selectedImage) {
      setPhotoUrls([...photoUrls, selectedImage]);
      setVisible(false);
      setSelectedImage(null);
    }
  };

  return (
    <SafeAreaView
      style={styles.backgroundImage}
    >
        <View style={{backgroundColor:colors.primaryOpacity,padding:20}}>
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
        <Input
          label="Description"
          value={description}
          onChangeText={setDescription}
          inputStyle={styles.input}
          inputContainerStyle={styles.inputContainer}
          labelStyle={styles.label}
        />
        <Input
          label="Category"
          value={category}
          onChangeText={setCategory}
          inputStyle={styles.input}
          inputContainerStyle={styles.inputContainer}
          labelStyle={styles.label}
        />
        <Input
          label="Seeking Amount"
          value={seekingAmount}
          onChangeText={setSeekingAmount}
          inputStyle={styles.input}
          inputContainerStyle={styles.inputContainer}
          labelStyle={styles.label}
        />
        <View style={styles.photoContainer}>
          <Text style={styles.label}>Photo URLs</Text>
          <View style={styles.photoList}>
            {photoUrls.map((url, index) => (
              <Avatar
                key={index}
                source={{ uri: url }}
                size="small"
                rounded
                containerStyle={styles.photoAvatar}
              />
            ))}
            <Button
              title="Add Photo"
              onPress={pickImage}
              buttonStyle={styles.addPhotoButton}
              titleStyle={styles.addPhotoButtonText}
            />
          </View>
        </View>
        <Button
          title="Submit Request"
          onPress={handleSubmit}
          buttonStyle={styles.button}
          titleStyle={styles.buttonText}
        />
      </ScrollView>
      <Overlay
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        overlayStyle={styles.overlay}
      >
        <ImageBackground
          source={{ uri: selectedImage }}
          style={styles.overlayImage}
        >
          <Button
            title="Add Photo"
            onPress={addPhotoUrl}
            buttonStyle={styles.overlayButton}
            titleStyle={styles.overlayButtonText}
          />
        </ImageBackground>
      </Overlay>
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
  },
  inputContainer: {
    borderBottomColor: colors.text.primary,
  },
  label: {
    color: colors.text.primary,
    fontWeight: 'bold',
  },
  button: {
    marginTop: 16,
    backgroundColor: colors.accent,
  },
  buttonText: {
    color: colors.text.primary,
    fontWeight: 'bold',
  },
  photoContainer: {
    marginVertical: 16,
  },
  photoList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  photoAvatar: {
    marginRight: 8,
    marginBottom: 8,
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
});

export default DonationRequestScreen;