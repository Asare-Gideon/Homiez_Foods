import { AntDesign, EvilIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useAppDispatch } from "../app/reduxHooks/hooks";
import images from "../constants/Images";
import { Colors, Fonts } from "../constants/Layout";
import { setBottomNav } from "../features/utilitySlice/bottomSlice";
import { itemProp } from "../types";

const Items = ({
  image,
  title,
  price,
  like,
  navigation,
  available,
  id,
  includes,
}: itemProp) => {
  const [textUpdate, setTextUpdate] = useState<string>("");
  const [titleUpdate, setTitleUpdate] = useState("");
  const [loved, setLove] = useState<boolean>(false);
  const handleLike = () => {
    setLove((prev) => !prev);
  };
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (title.length > 15) {
      const newTitle = title.substring(0, 15).concat("...");
      setTitleUpdate(newTitle);
    } else {
      setTitleUpdate(title);
    }
  }, [title]);

  const handleNav = () => {
    navigation.navigate("Detail", {
      selectedFood: JSON.stringify({
        id,
        imgURL: (image as any).uri,
        available,
        name: title,
        price,
        includes,
      }),
    });
  };

  return (
    <TouchableOpacity
      onPress={handleNav}
      style={{
        backgroundColor: Colors.white,
        width: 150,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 10,
        elevation: 2,
        marginBottom: 4,
      }}
    >
      <View
        style={{
          width: 150,
          height: 130,
        }}
      >
        <Image
          source={image}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 5,
          }}
        />
      </View>
      <View>
        <Text
          style={{
            ...Fonts.body3,
            paddingLeft: 5,
            paddingTop: 2,
            color: Colors.darkgray,
          }}
        >
          {titleUpdate}
        </Text>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 2,
          paddingLeft: 5,
          paddingRight: 5,
          paddingTop: 2,
        }}
      >
        <Text
          style={{
            ...Fonts.body2,
            fontSize: 16,
            color: Colors.primary,
          }}
        >
          GH₵ {price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Items;
