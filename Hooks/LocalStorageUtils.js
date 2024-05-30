import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveToLocalStorage = async (key, value, expiryInMilliseconds) => {
  try {
    const item = {
      value,
      expiry: Date.now() + expiryInMilliseconds,
    };
    await AsyncStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error('Error saving to local storage:', error);
  }
};

export const getFromLocalStorage = async (key) => {
  try {
    const item = await AsyncStorage.getItem(key);
    if (!item) return null;

    const parsedItem = JSON.parse(item);
    if (Date.now() > parsedItem.expiry) {
      await AsyncStorage.removeItem(key);
      return null;
    }

    return parsedItem.value;
  } catch (error) {
    console.error('Error getting from local storage:', error);
    return null;
  }
};

export const updateLocalStorage = async (key, newValue, newExpiryInMilliseconds) => {
  try {
    const item = await AsyncStorage.getItem(key);
    if (!item) return null;

    const parsedItem = JSON.parse(item);
    const updatedItem = {
      ...parsedItem,
      value: newValue,
      expiry: Date.now() + newExpiryInMilliseconds,
    };
    await AsyncStorage.setItem(key, JSON.stringify(updatedItem));
  } catch (error) {
    console.error('Error updating local storage:', error);
  }
};

export const deleteFromLocalStorage = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error('Error deleting from local storage:', error);
  }
};

;
