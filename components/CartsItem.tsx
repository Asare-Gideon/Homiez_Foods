import { AntDesign, Entypo, Fontisto } from "@expo/vector-icons";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useAppDispatch } from "../app/reduxHooks/hooks";
import { Colors, Fonts } from "../constants/Layout";
import {
  removeFromCart,
  setCartItemQuantity,
} from "../features/cart/cartSlice";
import { setBottomNav } from "../features/utilitySlice/bottomSlice";
import { cartsProp } from "../types";
import axios from "../app/axios";

const CartsItem = ({ title, image, price, quantity, id }: cartsProp) => {
  const [titleUpdate, setTitleUpdate] = useState<string>("");
  const [textUpdate, setDescriptionUpdate] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (title && title.length > 17) {
      const newTitle = title.substring(0, 17).concat("...");
      setDescriptionUpdate(newTitle);
    } else {
      setDescriptionUpdate(title);
    }
  }, [title]);

  const handleNav = () => {};

  useEffect(() => {
    (async () => {
      const res = await axios.get(`/users/food/${id}`);
      if (res.data.error) return;
      const foodData = res.data;
      if (!foodData.available) dispatch(removeFromCart(id));
    })();
  }, []);

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
        elevation: 2,
      }}
    >
      <View style={{ flex: 0.2, height: 85 }}>
        <Image
          source={{
            uri: image,
          }}
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 4,
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
            <Text style={{ ...Fonts.body2, fontSize: 14 }}>{textUpdate}</Text>
            <Text style={{ color: Colors.deepDarkGray, fontSize: 13 }}>
              {titleUpdate}
            </Text>
          </View>
          <TouchableOpacity
            style={{
              paddingRight: 10,
              paddingTop: 4,
            }}
            onPress={() => {
              dispatch(removeFromCart(id));
            }}
          >
            <AntDesign name="delete" size={20} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            padding: 4,
          }}
        >
          <Text
            style={{
              ...Fonts.body2,
              fontSize: 13,
              color: Colors.darkgray,
            }}
          >
            GH₵ {price}
          </Text>
          <View
            style={{
              flexDirection: "row",
              paddingLeft: 5,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                paddingRight: 5,
              }}
              onPress={() => {
                dispatch(
                  setCartItemQuantity({
                    id,
                    quantity: quantity - 1 >= 1 ? quantity - 1 : quantity,
                  })
                );
              }}
            >
              <Entypo name="minus" size={24} />
            </TouchableOpacity>
            <Text
              style={{
                ...Fonts.body2,
                paddingRight: 10,
                paddingLeft: 5,
              }}
            >
              {quantity < 10 ? `0${quantity}` : quantity}
            </Text>
            <TouchableOpacity
              onPress={() => {
                dispatch(setCartItemQuantity({ id, quantity: quantity + 1 }));
              }}
            >
              <AntDesign name="pluscircle" size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default CartsItem;
