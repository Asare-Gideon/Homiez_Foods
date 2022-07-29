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
import { LinearGradient } from "expo-linear-gradient";

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
      <View style={detailStyle.statusbar}></View>
      <View style={detailStyle.imageCont}>
        <View style={detailStyle.imgCont}>
          <View style={detailStyle.logoImg}>
            <Image source={images.items[2]} style={{ height: 47, width: 158 }} />
          </View>
          <Image source={images.items[0]} style={{ height: "100%", width: "100%" }} />
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
      <View style={detailStyle.contentCont}>
        <TouchableOpacity style={detailStyle.backBtnCont} onPress={() => navigation.goBack()}>
          <Image source={images.items[4]} style={{ height: 75, width: 75 }} />
        </TouchableOpacity>

        <ScrollView>
          <View style={detailStyle.headerCont}>
            <Text style={[detailStyle.itemName, { paddingRight: 10 }]}>
              {selectedFood?.name}
            </Text>

            <Text style={detailStyle.likeText}>This Food Includes</Text>
            <View style={detailStyle.ingredientCont}>
              {selectedFood?.includes?.map((s, indx) => (
                <Text key={indx} style={detailStyle.ingText}>
                  {s}
                </Text>
              ))}
            </View>
            {/** 
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
*/}
          </View>
          {/**price */}
          <View style={detailStyle.priceCont}>
            <View style={detailStyle.counterCont}>
              <TouchableOpacity style={detailStyle.counterBtn}>
                <AntDesign name="minus" color={"#f10246"} size={48} />
              </TouchableOpacity>
              <Text style={detailStyle.counterNum}>2</Text>
              <TouchableOpacity style={detailStyle.counterBtn}>
                <AntDesign name="plussquare" color={"#f10246"} size={48} />
              </TouchableOpacity>
            </View>
            <Text style={detailStyle.price}>₵ {parseInt((selectedFood?.price as string)).toFixed(2)}</Text>
          </View>

          <View>
            <TouchableOpacity>
              <LinearGradient
                colors={['#fd4c1b', '#f51e36']}
                end={{ x: 1, y: 0.4 }}
                style={detailStyle.addCarts}
              >
                <Image source={images.items[5]} style={{ height: 25, width: 25 }} />
                <Text style={detailStyle.cartsText}>Add To Carts</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          <View style={detailStyle.mayLikeCont}>
            <Text style={detailStyle.maylikeText}>care to add up?</Text>
          </View>

          <View>
            {likableFoods && (
              <>
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
          </View>
        </ScrollView>
      </View>
      {/** 
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
*/}
    </View>
  );
};

export default Detail;
