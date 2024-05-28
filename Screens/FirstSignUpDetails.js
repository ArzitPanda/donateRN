import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, TextInput, KeyboardAvoidingView } from "react-native";
import PagerView from "react-native-pager-view";
import { useRef, useState } from "react";
import { Avatar, Icon, color } from "@rneui/base";
import colors from "../Color";
import TextAreaWithCounter from "./Components/TextAreaWithCounter";
import { useNavigation } from '@react-navigation/native';
import supabase from "../config";
import * as ImagePicker from 'expo-image-picker';
export default function FirstSigupDetails({ route }) {

  const { createUser } = route.params;

  const [name,setName] = useState("");
  const [mobile,setMobile] = useState("");
  const [aadhar,setAadhar] = useState("");
  const [country,setCountry] = useState("");
  const [state,setState] = useState("");
  const [pincode,setPincode] = useState("");
  const [bio,setBio] = useState("");
  const [address,setAddress] = useState("");

  const [profilePicture, setProfilePicture] = useState('');

  const pagerRef = useRef(null);
  const [page, setPage] = useState(0);
  const navigate = useNavigation();
  const [selectedActivities, setSelectedActivities] = useState([]);
  const handleSave = async () => {
    const path = `public/${createUser.AuthId}`;
    const { data, error } = await supabase
      .storage
      .from('danaw')
      .upload(path, profilePicture, {
        cacheControl: '3600',
        upsert: true
      });
      


      const dbDetails =await supabase.from('Details').insert([{
        AadharCard: aadhar,
        Address: address,
        ProfileImage: `${supabase.storage.from('danaw').getPublicUrl("").data.publicUrl}/${path}`,
        Pincode: pincode,
        State: state,
        Country: country,
        Phone: mobile,
        activities: selectedActivities,
        bio: bio
      }]).select();

      if(dbDetails.data.length>0)
        {
          const dbData  = await supabase.from('Users').insert([{
            Name:name,
            Email:createUser.Email,
            AuthId:createUser.AuthId,
            DetailsId:dbDetails.data[0].Id
          
  
        }])


        console.log(dbData.data,dbData.error)
      if(dbData.error===null)
        {
          navigate.navigate("Home")
        }
        }


    


      


    }
      const selectProfilePicture = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
          base64: true
        });
    
        if (!result.canceled) {
          setProfilePicture(result.assets[0]);
        }
      };







  const toggleActivity = (activity) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(selectedActivities.filter((a) => a !== activity));
    } else {
      if (selectedActivities.length < 3) {
        setSelectedActivities([...selectedActivities, activity]);
      } else {
        // Maximum of 3 activities allowed
        console.log("You can only select up to 3 activities.");
      }
    }
  };

  const activities = ["Listening", "Movie Watching", "Reading", "Painting", "Cooking", "Gardening"];

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <SafeAreaView style={styles.container}>
        <View style={{ height: 10, width: '100%', backgroundColor: colors.primary, marginTop: 30 }}>
          <View style={{ height: '100%', width: `${(page + 1) * 33.33}%`, backgroundColor: colors.secondary }} />
        </View>
        <PagerView
          style={styles.container}
    
         
          ref={pagerRef}
        
        >
          <View style={styles.page} key={1}>
            <Text style={styles.headerTitle}>About Yourself</Text>
            <TextInput
              keyboardType="default"
              value={name}
              onChangeText={(text)=>{setName(text)}}
              style={styles.inputContainer}
              placeholder="Write your name"
              placeholderTextColor={colors.text.secondary}
            />
            <TextInput
              keyboardType="number-pad"
              value={mobile}
              onChangeText={(text)=>{setMobile(text)}}
              style={styles.inputContainer}
              placeholder="Your Mobile No"
              placeholderTextColor={colors.text.secondary}
            />
            <TextAreaWithCounter bio={bio} setBio={setBio} />
          </View>
          <View style={styles.page} key={2}>
            <Text style={styles.headerTitle}>Additional Details</Text>

<View>
<View style={styles.avatarContainer}>
  <Avatar
    rounded
    size="xlarge"
    source={{
      uri:  profilePicture?.uri|| 'https://gravatar.com/avatar/b110db69554c45c0539146f082821424?s=400&d=robohash&r=x',
    }}
    containerStyle={styles.avatar}
    onPress={selectProfilePicture}
  />
  <View style={styles.cameraIconContainer}>
    <Icon name="camera" size={24} color={colors.background}  />
  </View>
</View>
</View>

            <Text style={styles.headerTitle}>Select Activities (Max 3)</Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginVertical: 20 }}>
              {activities.map((activity) => (
                <TouchableOpacity
                  key={activity}
                  style={[styles.chipContainer, selectedActivities.includes(activity) && styles.chipSelected]}
                  onPress={() => toggleActivity(activity)}
                >
                  <Text style={[styles.chipText, selectedActivities.includes(activity) && styles.chipTextSelected]}>
                    {activity}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>



          </View>
          <View style={styles.page} key={3}>
            <Text style={styles.headerTitle}>Location Details</Text>
            <TextInput
              keyboardType="default"
              value={aadhar}
              onChangeText={(text)=>{setAadhar(text)}}
              style={styles.inputContainer}
              placeholder="Enter your Aadhar Number"
              placeholderTextColor={colors.text.secondary}
            />
           
           <TextInput
              keyboardType="default"
              value={address}
              onChangeText={(text)=>{setAddress(text)}}
              style={styles.inputContainer}
              placeholder="address"
              placeholderTextColor={colors.text.secondary}
            />
            <TextInput
              keyboardType="default"
              value={country}
              style={styles.inputContainer}
              placeholder="Country"
              onChangeText={(text)=>setCountry(text)}
              placeholderTextColor={colors.text.secondary}
            />
   <TextInput
              keyboardType="default"
              value={state}
              onChangeText={(text)=>{setState(text)}}
              style={styles.inputContainer}
              placeholder="State"
              placeholderTextColor={colors.text.secondary}
            />

              <TouchableOpacity onPress={handleSave}>
                <Text>Explore</Text>
              </TouchableOpacity>

          </View>
        </PagerView>
       
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    page: {
      display: "flex",
      justifyContent: "center",
      alignItems: "flex-start",
      paddingHorizontal: 20,
      height: "100%",
    },
    iconContainer: {
      padding: 10,
      backgroundColor: colors.secondary,
      borderRadius: 40,
      height: 40,
      width: 40,
    },
    headerTitle: {
      fontSize: 28, // Changed from 42
      marginVertical: 20,
      color: colors.secondary,
    },
    inputContainer: {
      color: colors.text.primary,
      fontSize: 16,
      paddingHorizontal: 10,
      paddingBottom: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.secondary,
      width: "100%",
      marginVertical: 20,
    },
    avatarContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
       padding:20,
       marginBottom:20,
        backgroundColor:colors.primaryOpacity,
     
        borderBottomColor:colors.secondary,
        borderBottomWidth:.5
      
      },
      avatar: {
        backgroundColor: colors.background,
        borderWidth: 2,
        borderColor: colors.primary,
      },
      cameraIconContainer: {
        position: 'absolute',
        bottom: 70,
        borderWidth:1,
        borderColor:colors.secondary,
        right: '35%',
        backgroundColor: colors.primary,
        borderRadius: 20,
        padding: 8,
      },
    chipContainer: {
      backgroundColor: colors.secondary,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 20,
      marginRight: 10,
      marginBottom: 10,
    },
    chipSelected: {
      backgroundColor: colors.primary,
    },
    chipText: {
      color: colors.text.primary,
      fontWeight: 'bold',
      fontSize: 16, // Added smaller font size for chip text
    },
    chipTextSelected: {
      color: colors.text.secondary,
      fontSize: 16, // Added smaller font size for selected chip text
    }}
  );
