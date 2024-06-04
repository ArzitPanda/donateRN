import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Alert,
} from "react-native";
import supabase from "../../config"; // Make sure to import your Supabase client
import colors from "../../Color";
import * as ImagePicker from "expo-image-picker";
const DonateNowModal = ({ isVisible, onClose, requestId, userId }) => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      base64: true,
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0]);
    
    }
  };

  const handleDonate = async () => {
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
      Alert.alert(
        "Invalid Amount",
        "Please enter a valid amount greater than 0."
      );
      return;
    }

    setIsLoading(true);
    try {
        const path = `public/${Date.now().toString()}`;
        const photodata = await supabase
        .storage
        .from('danaw')
        .upload(path, image, {
          cacheControl: '3600',
          upsert: true
        });

        console.log(photodata.error,photodata.data)


      const { data, error } = await supabase.from("Donations").insert([
        {
          Amount: parseFloat(amount),
          DonorId: userId,
          UnitDonationId: requestId,
          Message: message,
          Photos: `${supabase.storage.from('danaw').getPublicUrl("").data.publicUrl}/${path}`,
          ModifiedAt: new Date().toISOString(),
          // You can add photo upload functionality later
        },
      ]);

      if (error) throw error;

      Alert.alert("Success", "Your donation has been recorded. Thank you!");
      onClose();
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalTitle}>Make a Donation</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Amount (₹)</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              placeholderTextColor={colors.text.secondary}
              placeholder="Enter amount"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Message (Optional)</Text>
            <TextInput
              style={[styles.input, styles.messageInput]}
              multiline
              value={message}
              onChangeText={setMessage}
              placeholderTextColor={colors.text.secondary}
              placeholder="Leave a message for the requester"
            />
          </View>
          <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
            <Text style={styles.imageButtonText}>Select Image (Optional)</Text>
          </TouchableOpacity>

          {image && (
            <Image source={{ uri: imageUri }} style={styles.previewImage} />
          )}
          <TouchableOpacity
            style={[
              styles.button,
              styles.donateButton,
              isLoading && styles.disabledButton,
            ]}
            onPress={handleDonate}
            disabled={isLoading}
          >
            <Text style={styles.buttonText}>
              {isLoading ? "Processing..." : "Donate Now"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.cancelButton]}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "90%",
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.text.primary,
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.primaryOpacity,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: "white",
    backgroundColor: colors.primaryOpacity,
  },
  messageInput: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 8,
  },
  donateButton: {
    backgroundColor: colors.primary,
    color: colors.secondary,
  },
  cancelButton: {
    backgroundColor: colors.accent,
    borderWidth: 1,
    borderColor: colors.text.secondary,
  },
  buttonText: {
    color: colors.text.primary,
    fontSize: 18,
    fontWeight: "bold",
  },
  disabledButton: {
    opacity: 0.6,
  },
});

export default DonateNowModal;
