import React, { useEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../config';


const useAuthUser = () => {
  const [pUser, setPUser] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const cachedUser = await getFromLocalStorage('userData');

        if (cachedUser) {
          setPUser(cachedUser);
          setLoading(false);
        }

        const { data: { user }, error } = await supabase.auth.getUser();

        if (error) {
          console.error('Error fetching user:', error);
          return;
        }

        const { data: dbUser, error: dbError } = await supabase
        .from('Users')
        .select(`
          *,
          Details(*)
        `)
        .eq('AuthId', user.id)
          .single();

        if (dbError) {
          console.error('Error fetching user details:', dbError);
          return;
        }

        if (dbUser) {
          setPUser(dbUser);
          setLoading(false);
          await saveToLocalStorage('userData', dbUser);
        }

        ToastAndroid.show(user.email, ToastAndroid.SHORT);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchUser();
  }, []);

  const refreshUserData = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        console.error('Error fetching user:', error);
        return;
      }

      const { data: dbUser, error: dbError } = await supabase
        .from('Users')
        .select('*')
        .eq('AuthId', user.id)
        .single();

      if (dbError) {
        console.error('Error fetching user details:', dbError);
        return;
      }

      if (dbUser) {
        setPUser(dbUser);
        await saveToLocalStorage('userData', dbUser);
      }

      ToastAndroid.show(user.email, ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  return { pUser, loading, refreshUserData };
};

const saveToLocalStorage = async (key, value) => {
  try {
    const item = {
      value,
      expiry: Date.now() + 2 * 24 * 60 * 60 * 1000, // 2 days from now
    };
    await AsyncStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error('Error saving to local storage:', error);
  }
};

const getFromLocalStorage = async (key) => {
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

export default useAuthUser;
