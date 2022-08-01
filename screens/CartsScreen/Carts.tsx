import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableHighlight,
} from "react-native";
import React, { useEffect, useState } from "react";
import { cartStyle } from "./cartStyle";
import Header from "../../components/Header";
import { homeProp } from "../../types";
import CartsItem from "../../components/CartsItem";
import { cartsData } from "../../constants/Data";
import { useAppDispatch, useAppSelector } from "../../app/reduxHooks/hooks";
import {
  cartItemType,
  selectCarts,
  setCart,
} from "../../features/cart/cartSlice";
import SnackBar from "react-native-snackbar-component";
import { Colors, Fonts } from "../../constants/Layout";
import { MaterialIcons } from "@expo/vector-icons";
import { selectFoods } from "../../features/foods/foodsSlice";

const Carts = ({ navigation }: homeProp) => {
  const dispatch = useAppDispatch();
  const foods = useAppSelector(selectFoods);
  const carts = useAppSelector(selectCarts);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [snackbarMessage, setSnackbarMessage] = useState<{
    message: string;
    color: string;
    messageColor?: string;
    accentColor?: string;
  } | null>();

  useEffect(() => {
    const totalAmount = carts.reduce((p, c, indx) => {
      return p + c.price * c.quantity;
    }, 0);
    setCartTotalAmount(totalAmount);
  }, [carts]);

  useEffect(() => {
    const isAvailables = carts.filter((c) => {
      let available = false;
      foods.forEach((f) => {
        const food = f.items.find((f) => f.id === c.id);
        if (food && food.available) available = true;
      });
      return available;
    });
    if (isAvailables.length !== carts.length) {
      setSnackbarMessage({
        message: "Cart has been filtered, some foods are not available now",
        color: "yellow",
      });
    }
    dispatch(setCart(isAvailables));
  }, []);

  const renderCartsItem = ({ item }: { item: cartItemType }) => (
    <CartsItem
      id={item.id}
      price={item.price}
      title={item.name}
      image={item.imgURL}
      quantity={item.quantity}
    />
  );
  return (
    <View style={cartStyle.main}>
      <SnackBar
        visible={Boolean(snackbarMessage)}
        textMessage={snackbarMessage?.message}
        backgroundColor={snackbarMessage?.color}
        messageColor={snackbarMessage?.messageColor || "black"}
        accentColor={snackbarMessage?.accentColor || "black"}
        actionHandler={() => {
          setSnackbarMessage(null);
        }}
        actionText="Close"
      />
      <View style={cartStyle.header}>
        <Header title="Carts" navigation={navigation} />
      </View>
      {!!carts.length ? (
        <>
          <ScrollView style={cartStyle.contentContainer}>
            <View style={cartStyle.mainListCont}>
              <FlatList
                renderItem={renderCartsItem}
                data={carts}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
              />
            </View>
          </ScrollView>
          <View style={cartStyle.sumCont}>
            <View style={cartStyle.totalCont}>
              <Text style={[cartStyle.totalText, { fontSize: 16 }]}>Total</Text>
              <Text style={[cartStyle.totalText, { fontSize: 16 }]}>
                GH₵ {cartTotalAmount}
              </Text>
            </View>
            <View style={cartStyle.orderBtnCont}>
              <TouchableHighlight
                style={cartStyle.orderBtn}
                onPress={() => navigation.navigate("Order")}
              >
                <Text style={[cartStyle.orderBtnText, { fontSize: 15 }]}>
                  Continue
                </Text>
              </TouchableHighlight>
            </View>
          </View>
        </>
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            backgroundColor: "white",
          }}
        >
          <MaterialIcons name="no-food" size={72} color={Colors.darkgray} />
          <Text style={{ ...Fonts.h2 }}>No Foods Added</Text>
        </View>
      )}
    </View>
  );
};

export default Carts;
