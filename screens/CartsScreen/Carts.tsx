import {
  View,
  Text,
  ScrollView,
  FlatList,
  TouchableHighlightBase,
  TouchableHighlight,
  BackHandler,
} from "react-native";
import React, { useEffect, useState } from "react";
import { cartStyle } from "./cartStyle";
import Header from "../../components/Header";
import { homeProp } from "../../types";
import CartsItem from "../../components/CartsItem";
import { cartsData } from "../../constants/Data";
import { useAppSelector } from "../../app/reduxHooks/hooks";
import { cartItemType, selectCarts } from "../../features/cart/cartSlice";
import { Colors, Fonts } from "../../constants/Layout";
import { MaterialIcons } from "@expo/vector-icons";
import { StackActions, useIsFocused } from "@react-navigation/native";

const Carts = ({ navigation }: homeProp) => {
  const isFocused = useIsFocused();
  const carts = useAppSelector(selectCarts);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);

  useEffect(() => {
    const totalAmount = carts.reduce((p, c, indx) => {
      return p + c.price * c.quantity;
    }, 0);
    setCartTotalAmount(totalAmount);
  }, [carts]);
  useEffect(() => {
    const handler = () => {
      navigation.dispatch(StackActions.replace("Home"));
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", handler);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handler);
    };
  }, [isFocused]);
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
              <Text style={cartStyle.totalText}>Total</Text>
              <Text style={cartStyle.totalText}>GH₵ {cartTotalAmount}</Text>
            </View>
            <View style={cartStyle.orderBtnCont}>
              <TouchableHighlight
                style={cartStyle.orderBtn}
                onPress={() => navigation.navigate("Order")}
              >
                <Text style={cartStyle.orderBtnText}>Continue</Text>
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
