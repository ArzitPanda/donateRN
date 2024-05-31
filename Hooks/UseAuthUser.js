import React, { useEffect, useState } from 'react';
import { ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import supabase from '../config';


const useAuthUser = () => {
  const [pUser, setPUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const cachedUser = await getFromLocalStorage('userData');

        if (cachedUser) {
          setPUser(cachedUser);
          setLoading(false);
          setError(false)
          ToastAndroid.show(cachedUser?.Email +" "+"from db", ToastAndroid.SHORT);
          return;
        }

        const { data: { user }, error } = await supabase.auth.getUser();
          console.log("not calling this")
        if (error) {
          console.error('Error fetching user:', error);
          setError(true)
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
          setError(true)
          return;
        }

        if (dbUser) {
          setPUser(dbUser);
          setLoading(false);
          setError(false)
          await saveToLocalStorage('userData', dbUser);
        }

        ToastAndroid.show(user.email, ToastAndroid.SHORT);
      } catch (error) {
        setError(true)
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

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error logging out:', error);
        return;
      }

      await AsyncStorage.removeItem('userData');
      setPUser(null);
      setError(true);
      ToastAndroid.show("Logged out successfully", ToastAndroid.SHORT);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return { pUser, loading, refreshUserData, logout, error };
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
