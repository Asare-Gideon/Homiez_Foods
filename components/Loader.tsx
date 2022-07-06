import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React from "react";
import { Colors, Sizes } from "../constants/Layout";
import images from "../constants/Images";

const Loader = () => {
  return (
    <View style={styles.main}>
      <View style={styles.content}>
        <ActivityIndicator animating color={Colors.red} size={28} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    height: Sizes.height,
    width: Sizes.width,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  content: {
    height: Sizes.height / 2.5,
    width: Sizes.width / 2,
  },
});
export default Loader;
