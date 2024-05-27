import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, TextInput, KeyboardAvoidingView } from "react-native";
import PagerView from "react-native-pager-view";
import { useRef, useState } from "react";
import { Avatar, Icon, color } from "@rneui/base";
import colors from "../Color";
import TextAreaWithCounter from "./Components/TextAreaWithCounter";
import { useNavigation } from '@react-navigation/native';
export default function FirstSigupDetails() {
  const pagerRef = useRef(null);
  const [page, setPage] = useState(0);
  const navigate = useNavigation();
  const [selectedActivities, setSelectedActivities] = useState([]);

  const pageTranslation = (type) => {

    if (type === "FORWARD") {
      setPage(page + 1);
    } else {
      setPage(page - 1);
    }
    
    pagerRef.current?.setPage(page);
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
    
          scrollEnabled={false}
          ref={pagerRef}
          onPageSelected={(position) => {
            console.log(position.nativeEvent.position);
      
          }}
        >
          <View style={styles.page} key={1}>
            <Text style={styles.headerTitle}>About Yourself</Text>
            <TextInput
              keyboardType="default"
              value=""
              style={styles.inputContainer}
              placeholder="Write your name"
              placeholderTextColor={colors.text.secondary}
            />
            <TextInput
              keyboardType="number-pad"
              value=""
              style={styles.inputContainer}
              placeholder="Your Mobile No"
              placeholderTextColor={colors.text.secondary}
            />
            <TextAreaWithCounter />
          </View>
          <View style={styles.page} key={2}>
            <Text style={styles.headerTitle}>Additional Details</Text>

<View>
<View style={styles.avatarContainer}>
  <Avatar
    rounded
    size="xlarge"
    source={{
      uri:  'https://gravatar.com/avatar/b110db69554c45c0539146f082821424?s=400&d=robohash&r=x',
    }}
    containerStyle={styles.avatar}
 
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
              value=""
              style={styles.inputContainer}
              placeholder="Enter your Aadhar Number"
              placeholderTextColor={colors.text.secondary}
            />
            <TextInput
              keyboardType="default"
              value=""
              style={styles.inputContainer}
              placeholder="City"
              placeholderTextColor={colors.text.secondary}
            />
            <TextInput
              keyboardType="default"
              value=""
              style={styles.inputContainer}
              placeholder="State"
              placeholderTextColor={colors.text.secondary}
            />
            <TextInput
              keyboardType="default"
              value=""
              style={styles.inputContainer}
              placeholder="Country"
              placeholderTextColor={colors.text.secondary}
            />


              <TouchableOpacity onPress={()=>{navigate.navigate('Home')}}>
                <Text>Explore</Text>
              </TouchableOpacity>

          </View>
        </PagerView>
        <View
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            flexDirection: "row",
            columnGap: 10,
            padding: 40,
          }}
        >
          <TouchableOpacity
            onPress={() => {
              pageTranslation("BACKWARD");
            }}
            disabled={page === 0}
          >
            <Icon
              type="font-awesome"
              name="chevron-left"
              color={page === 0 ? colors.text.secondary : colors.text.primary}
              size={24}
              containerStyle={styles.iconContainer}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              pageTranslation("FORWARD");
            }}
            disabled={page === 2}
          >
            <Icon
              type="font-awesome"
              name="chevron-right"
              color={page === 2 ? colors.text.secondary : colors.text.primary}
              size={24}
              containerStyle={styles.iconContainer}
            />
          </TouchableOpacity>
        </View>
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
    },
  });