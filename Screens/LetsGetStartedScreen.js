import React, { useState, useEffect } from "react";
import { View, ImageBackground, StyleSheet, Text } from "react-native";
import LottieView from "lottie-react-native";
import axios from "axios";
import { Button } from "@rneui/base";
import LogoSvg from "../LogioSvg";
import { useNavigation } from "@react-navigation/native";
import supabase from "../config";
import UseAuth from "../Hooks/UseAuth";
import useAuthUser from "../Hooks/UseAuthUser";

const LetsGetStartedScreen = () => {
  const navigation = useNavigation();
  const [randomAstronautImage, setRandomAstronautImage] = useState(null);

  return (
    <View style={styles.container}>
      <ImageBackground
        src={"https://source.unsplash.com/featured/?money"}
        style={styles.imageBackground}
      >
        <View style={styles.overlay} />
        <LottieView
          source={require("../Animation - 1715421143181.json")}
          autoPlay
          style={{ width: "100%", height: "100%" }}
          loop
        />

        <View
          style={{
            backgroundColor: "rgba(0,0,0,0.6)",
            height: "20%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 5,
          }}
        >
          <LogoSvg />
          <View style={styles.buttonContainer}>
            <Button
              title="Let's Get Started"
              titleStyle={{ color: "black" }}
              color={"warning"}
              buttonStyle={{ ...styles.button }}
              onPress={async () => {
                navigation.navigate("Login");
              }}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "contain",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  buttonContainer: {
    marginBottom: 20,
    width: "90%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Black with 50% opacity
  },
  button: {
    height: 60,
    width: "100%",
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LetsGetStartedScreen;
