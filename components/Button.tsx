import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Colors, Sizes, Fonts } from "../constants/Layout"

interface Props {
  title: string;
  onPress?: () => void;
  BackgroundColor?: string;
  color?: string
}

const Button: React.FC<Props> = ({ title, onPress, BackgroundColor, color }) => {
  return (
    <TouchableOpacity style={[style.btn, { backgroundColor: BackgroundColor }]} onPress={onPress}>
      <Text style={[style.text, { color: color }]}>{title}</Text>
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  btn: {
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 9,
    paddingBottom: 9,
    marginBottom: Sizes.base * 2,
    borderRadius: 8

  },
  text: {
    ...Fonts.h4,
    color: Colors.darkgray,
    fontSize: 17
  },
});

export default Button;
