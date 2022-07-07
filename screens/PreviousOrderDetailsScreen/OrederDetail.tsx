import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { homeProp } from "../../types";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { Colors, Fonts } from "../../constants/Layout";
import { orderStyle } from "../OrederScreen/orderStyle";
import { orderType } from "../../features/orders/OrdersSlice";
import moment from "moment";

const OrderDetail = ({ navigation, route }: homeProp) => {
  const [order, setOrder] = useState<orderType | null>(null);

  useEffect(() => {
    setOrder(JSON.parse((route.params as any).selectedOrder));
  }, []);
  console.log(order);
  const renderCartsItem = ({ item }: { item: any }) => (
    <View style={orderStyle.summary}>
      <Text style={orderStyle.text}>
        {item.foodName} x {item.quantity}
      </Text>
      <View style={orderStyle.disheCont}>
        <Text style={orderStyle.text}>Price</Text>
        <Text style={orderStyle.text}>{item.price}</Text>
      </View>
      <View style={orderStyle.check}>
        <AntDesign name="checkcircle" color={Colors.primary} size={18} />
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
              <Text style={{ paddingHorizontal: 8 }}>
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
