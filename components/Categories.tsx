import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Colors, Fonts } from "../constants/Layout";
import { categoriesProp } from "../types";

const Categories = ({ title, active, handle, image, id }: categoriesProp) => {
  return (
    <TouchableOpacity
      onPress={() => handle(id)}
      style={{
        backgroundColor: active === id ? Colors.primary : Colors.white,
        padding: 2,
        paddingLeft: 5,
        paddingRight: 10,
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 15,
        marginRight: 10,
        marginBottom: 2,
        elevation: 2,
      }}
    >
      <Image
        source={image}
        style={{ height: 40, width: 40, borderRadius: 30 }}
      />
      <Text
        style={{
          ...Fonts.body2,
          fontSize: 12,
          marginLeft: 5,
          color: id === active ? Colors.white : Colors.darkgray,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Categories;
