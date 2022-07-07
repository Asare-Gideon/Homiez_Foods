import { View, Text, Image, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { detailStyle } from "./detailStyle";
import {
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native-gesture-handler";
import images from "../../constants/Images";
import Items from "../../components/Items";
import { homeProp } from "../../types";
import { itemData } from "../../constants/Data";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "../../constants/Layout";
import { devMode } from "../../app/Globals";
import { foodType } from "../../features/foods/foodsSlice";
import { useAppDispatch, useAppSelector } from "../../app/reduxHooks/hooks";
import { addToCart, selectCarts } from "../../features/cart/cartSlice";
import { useIsFocused } from "@react-navigation/native";

const Detail = ({ navigation, route }: homeProp) => {
  const isFocused = useIsFocused();
  const [likableFoods, setLikableFoods] = useState<foodType[]>([]);
  const carts = useAppSelector(selectCarts);
  const [selectedFood, setSelectedFood] = useState<{
    id: string;
    imgURL: string;
    name: string;
    price: string;
    available?: boolean;
    includes?: string[];
  } | null>(null);
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCarts);
  const [inCart, setInCart] = useState(false);

  useEffect(() => {
    const item = cart.findIndex((c) => {
      return c.id === selectedFood?.id;
    });
    if (item !== -1) setInCart(true);
    else setInCart(false);
  }, [cart, selectedFood]);

  useEffect(() => {
    try {
      const selectedFood = JSON.parse((route.params as any).selectedFood);
      setSelectedFood(selectedFood);
    } catch (err) {
      console.log(err);
    }
  }, [isFocused]);

  const addItemToCart = () => {
    if (selectedFood) {
      dispatch(
        addToCart({
          id: selectedFood?.id,
          imgURL: selectedFood?.imgURL,
          name: selectedFood?.name,
          price: parseFloat(selectedFood?.price),
          quantity: 1,
        })
      );
    }
  };

  const renderItems = ({ item }: { item: foodType }) => (
    <Items
      id={item.id}
      image={{
        uri: devMode
          ? item.imgURL?.toString().replace("localhost", "10.0.2.2") || ""
          : item.imgURL?.toString(),
      }}
      price={item.price}
      title={item.name}
      navigation={navigation}
    />
  );

  return (
    <View style={detailStyle.main}>
      <View style={detailStyle.imageCont}>
        <View style={detailStyle.backBtnCont}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color={Colors.white} />
          </TouchableOpacity>
        </View>
        <Image
          source={{
            uri: devMode
              ? selectedFood?.imgURL
                  ?.toString()
                  .replace("localhost", "10.0.2.2") || ""
              : selectedFood?.imgURL?.toString(),
          }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
      <ScrollView style={detailStyle.contentCont}>
        <View style={detailStyle.headerCont}>
          <Text style={[detailStyle.itemName, { paddingRight: 10 }]}>
            {selectedFood?.name}
          </Text>
          <TouchableHighlight
            style={[
              detailStyle.addCartBtn,
              (inCart || !selectedFood?.available) && {
                opacity: 0.6,
                backgroundColor: "#333",
              },
            ]}
            onPress={() => addItemToCart()}
            disabled={inCart || !selectedFood?.available}
          >
            <Text style={[detailStyle.addText]}>
              {selectedFood?.available && !inCart
                ? "Add To Menu"
                : !inCart
                ? "Unavailable"
                : "Added to cart"}
            </Text>
          </TouchableHighlight>
        </View>
        {/**price */}
        <Text style={detailStyle.price}>GH₵ {selectedFood?.price}</Text>

        <Text style={detailStyle.likeText}>This Food Includes</Text>
        <View style={detailStyle.ingredientCont}>
          {selectedFood?.includes?.map((s, indx) => (
            <Text key={indx} style={detailStyle.ingText}>
              {s}
            </Text>
          ))}
        </View>
        {/* <View>
          {likableFoods && (
            <>
              <Text style={detailStyle.likeText}>You may also like</Text>
              <FlatList
                renderItem={renderItems}
                data={likableFoods}
                keyExtractor={(item) => item.id}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                contentContainerStyle={{ paddingBottom: 10 }}
              />
            </>
          )}
        </View> */}
      </ScrollView>
      <View style={detailStyle.cartsBtnCont}>
        <TouchableHighlight
          style={detailStyle.viewCartsBent}
          onPress={() => navigation.navigate("Carts")}
        >
          <Text style={detailStyle.viewBtnText}>
            Check out {carts.length} Foods
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default Detail;
