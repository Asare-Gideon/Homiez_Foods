import { AntDesign, EvilIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useAppDispatch } from "../app/reduxHooks/hooks";
import { Colors, Fonts } from "../constants/Layout";
import { itemProp } from "../types";
import { LinearGradient } from 'expo-linear-gradient';

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
        backgroundColor: "#ffeade",
        width: 150,
        height: 200,
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 10,
        elevation: 1,
        marginBottom: 4,
        alignItems: 'center',
        paddingTop: 17,
      }}
    >
      <View
        style={{
          width: 100,
          height: 100,
        }}
      >
        <Image
          source={image}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 40,
          }}
        />
      </View>
      <View
        style={{
          position: "absolute",
          right: 15,
          bottom: 60,
        }}
      >
        <LinearGradient
          colors={['#fd4c1b', '#f51e36']}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            padding: 2,
            height: 50,
            width: 50,
            alignItems: 'center',
            borderRadius: 40,
            elevation: 3
          }}
        >
          <Text
            style={{
              ...Fonts.h3,
              fontSize: 16,
              color: Colors.white,
            }}
          >
            ₵ {price}
          </Text>
        </LinearGradient>
      </View>
      <View style={{
        position: "absolute",
        bottom: 35,
        left: 5
      }}>
        <Text
          style={{
            ...Fonts.h3,
            paddingLeft: 5,
            paddingTop: 2,
            color: Colors.darkgray,
            fontSize: 13,
          }}
        >
          {titleUpdate}
        </Text>
      </View>

    </TouchableOpacity>
  );
};

export default Items;
