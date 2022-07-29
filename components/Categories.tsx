import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { Colors, Fonts } from "../constants/Layout";
import { categoriesProp } from "../types";

const Categories = ({ title, active, handle, image, id, color }: categoriesProp) => {
  const [colorPick, setColorPick] = useState<string>()
  const colorsArr = [
    "#c6f2e8",
    "#ffd8d8",
    "#e9f3d5",
    "#ffdd95",
  ]
  useEffect(() => {
    let num = Math.floor(Math.random() * colorsArr.length)
    setColorPick(colorsArr[num])
  }, [])

  return (
    <TouchableOpacity
      onPress={() => handle(id)}
      style={{
        paddingLeft: 4,
        paddingRight: 4,
        alignItems: "center",
        marginRight: 10,
        marginBottom: 2,
      }}
    >
      <View style={{
        borderWidth: 2,
        borderColor: active === id ? Colors.primary : "white",
        backgroundColor: active === id ? Colors.white : colorPick,
        padding: 2,
        height: 65,
        width: 65,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 17,
      }}>
        <Image
          source={image}
          style={{ height: 45, width: 45, borderRadius: 30 }}
        />
      </View>
      <Text
        style={{
          ...Fonts.h3,
          fontSize: 12,
          marginLeft: 5,
          color: id === active ? Colors.primary : Colors.deepDarkGray,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Categories;
