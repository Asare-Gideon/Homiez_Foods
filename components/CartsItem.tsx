import { AntDesign, Entypo } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useAppDispatch } from "../app/reduxHooks/hooks";
import { Colors, Fonts } from "../constants/Layout";
import { setBottomNav } from "../features/utilitySlice/bottomSlice";
import { cartsProp } from "../Types";

const CartsItem = ({ title, image, text, price, order }: cartsProp) => {
  const [titleUpdate, setTitleUpdate] = useState<string>("");
  const [textUpdate, setDescriptionUpdate] = useState("");
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (title && title.length > 17) {
      const newTitle = title.substr(0, 17).concat("...");
      setDescriptionUpdate(newTitle);
    } else {
      setDescriptionUpdate(title);
    }
    if (text && text.length > 36) {
      const newText = text.substr(0, 35).concat("...");
      setTitleUpdate(newText);
    } else {
      setTitleUpdate(text);
    }
  }, [title, text]);

  const handleNav = () => {
    console.log("navigation")
  }

  return (
    <TouchableOpacity
      onPress={handleNav}
      style={{
        width: "100%",
        backgroundColor: Colors.white,
        borderRadius: 10,
        padding: 5,
        flexDirection: "row",
        marginBottom: 10,
        elevation: 2
      }}
    >
      <View style={{ flex: 0.2, height: 85 }}>
        <Image
          source={image}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 4
          }}
        />
      </View>
      <View
        style={{
          marginLeft: 13,
          flex: 0.8,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View>
            <Text style={{ ...Fonts.body2 }}>{textUpdate}</Text>
            <Text style={{ color: Colors.deepDarkGray }}>
              {titleUpdate}
            </Text>
          </View>
          {
            !order ? (
              <TouchableOpacity
                style={{
                  paddingRight: 10,
                  paddingTop: 4
                }}
              >
                <AntDesign name="delete" size={20} />
              </TouchableOpacity>
            ) : null
          }
        </View>
        <View style={{
          flexDirection: "row",
          justifyContent: "space-between",
          padding: 4
        }}>
          <Text style={{
            ...Fonts.body2,
            color: Colors.darkgray
          }} >GH₵ {price}</Text>
          {
            !order ? (
              <View style={{
                flexDirection: "row",
                paddingLeft: 5,
                alignItems: "center"

              }}>
                <TouchableOpacity style={{
                  paddingRight: 5,
                }}>
                  <Entypo name="minus" size={24} />
                </TouchableOpacity>
                <Text style={{
                  ...Fonts.body2,
                  paddingRight: 10,
                  paddingLeft: 5
                }}>01</Text>
                <TouchableOpacity>
                  <AntDesign name="pluscircle" size={24} color={Colors.primary} />
                </TouchableOpacity>
              </View>
            ) : null
          }
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CartsItem;

