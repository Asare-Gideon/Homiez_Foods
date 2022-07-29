import { View, Text, FlatList, Image, BackHandler } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { homeProp, paymentMethods } from "../../types";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Colors, Fonts } from "../../constants/Layout";
import { orderStyle } from "../OrederScreen/orderStyle";
import { orderType } from "../../features/orders/OrdersSlice";
import moment from "moment";
import { useIsFocused } from "@react-navigation/native";

const OrderDetail = ({ navigation, route }: homeProp) => {
  const isFocused = useIsFocused();
  const [order, setOrder] = useState<orderType | null>(null);
  const [isFromOrders, setIsFromOrders] = useState(false);

  useEffect(() => {
    setOrder(JSON.parse((route.params as any).selectedOrder));
    setIsFromOrders((route.params as any).isFromOrders || false);
  }, []);

  useEffect(() => {
    const handler = () => {
      if (isFromOrders) {
        navigation.pop(3);
        return true;
      }
      return false;
    };
    BackHandler.addEventListener("hardwareBackPress", handler);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handler);
    };
  }, [isFocused, isFromOrders]);
  console.log(order);
  const renderCartsItem = ({ item }: { item: any }) => (
    <View style={orderStyle.summary}>
      <Text style={[orderStyle.text, { fontSize: 14 }]}>
        {item.foodName} x {item.quantity}
      </Text>
      <View style={orderStyle.disheCont}>
        <Text style={[orderStyle.text, { fontSize: 13 }]}>Price</Text>
        <Text style={[orderStyle.text, { fontSize: 13 }]}>{item.price}</Text>
      </View>
      <View style={orderStyle.check}>
        <AntDesign
          name="checkcircle"
          color={
            order?.completed
              ? "green"
              : order?.failed
              ? Colors.red
              : order?.ongoing
              ? Colors.primary
              : "#aaa"
          }
          size={18}
        />
      </View>
    </View>
  );

  return (
    <View style={orderStyle.main}>
      <View style={orderStyle.header}>
        <Header title="Previous Order" navigation={navigation} />
      </View>
      <ScrollView style={orderStyle.contentContainer}>
        <View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              source={require("../../assets/images/logo-no-bg.png")}
              width={80}
              height={26.682}
              resizeMode="center"
            />

            <View style={{ justifyContent: "center", alignContent: "center" }}>
              <Text
                style={{
                  ...Fonts.body4,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                Order Id
              </Text>
              <Text
                style={{ ...Fonts.body5, fontSize: 12, textAlign: "center" }}
              >
                {order?.id}
              </Text>
              <Text
                style={{ ...Fonts.body5, fontSize: 11, textAlign: "center" }}
              >
                {moment.unix(order?.createdAt.seconds).format("llll")}
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 2,
              width: "100%",
              backgroundColor: Colors.darkgray,
            }}
          ></View>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 5,
              elevation: 2,
              marginBottom: 10,
              marginTop: 10,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}
            >
              <Text
                style={{
                  ...Fonts.body3,
                }}
              >
                Name
              </Text>
              <Text style={{ paddingHorizontal: 8 }}>
                {order?.customerName}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}
            >
              <Text
                style={{
                  ...Fonts.body3,
                }}
              >
                Phone Number
              </Text>
              <Text style={{ paddingHorizontal: 8 }}>
                {order?.customerPhone}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}
            >
              <Text
                style={{
                  ...Fonts.body3,
                }}
              >
                Delivery Location
              </Text>
              <Text style={{ paddingHorizontal: 8, maxWidth: 200 }}>
                {order?.location?.locationStreet}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}
            >
              <Text
                style={{
                  ...Fonts.body3,
                }}
              >
                Payment Method
              </Text>
              <Text numberOfLines={2} style={{ paddingHorizontal: 8 }}>
                {order?.method && order.method === paymentMethods.agent
                  ? "Agent Account"
                  : order?.method === paymentMethods.electronic
                  ? "Momo"
                  : (order?.method === paymentMethods.manual &&
                      "On Delivery") ||
                    ""}
              </Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}
            >
              <Text
                style={{
                  ...Fonts.body3,
                }}
              >
                Distance From Us
              </Text>
              <Text>{order?.distanceFromUs?.distance.text}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}
            >
              <Text
                style={{
                  ...Fonts.body3,
                }}
              >
                AVG Ride Duration
              </Text>
              <Text>{order?.distanceFromUs?.duration?.text}</Text>
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "100%",
                paddingVertical: 10,
                paddingHorizontal: 10,
              }}
            >
              <Text
                style={{
                  ...Fonts.body3,
                }}
              >
                Status
              </Text>
              <Text>
                {order?.completed
                  ? "Completed"
                  : order?.failed
                  ? "Failed"
                  : order?.ongoing
                  ? "Rider On Way"
                  : "Pending Notice"}
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Text
            style={{
              ...Fonts.body4,
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: 5,
            }}
          >
            Foods Bought
          </Text>
          {order && (
            <FlatList
              renderItem={renderCartsItem}
              data={order.items}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 100 }}
            />
          )}
        </View>
      </ScrollView>
      <View style={orderStyle.sumCont}>
        <View style={orderStyle.totalCont}>
          <Text style={orderStyle.totalText}>Total</Text>
          <Text style={orderStyle.totalText}>
            GH₵{" "}
            {order && order?.hasRefCode
              ? order.totalPrice + 1 + 0.2
              : order && order.totalPrice + 0.2}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default OrderDetail;
