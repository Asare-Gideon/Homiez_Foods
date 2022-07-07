import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";
import { Colors, Sizes } from "../constants/Layout";
import images from "../constants/Images";

const Loader = () => {
  return (
    <View style={styles.main}>
      <ActivityIndicator animating color={Colors.red} size={38} />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    height: Sizes.height,
    width: Sizes.width,
    backgroundColor: Colors.white,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Loader;
