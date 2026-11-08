import { StyleSheet, Text, View } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import { s } from "react-native-size-matters";

export default function CustomLoading() {
  return (
    <View style={styles.loadingContainer}>
      <LottieView
        source={require("../../assets/animations/dice-loader.json")}
        autoPlay
        loop
        style={styles.lottieAnimation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  lottieAnimation: {
    width: s(60),
    height: s(60),
  },
});
