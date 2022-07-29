import {
  View,
  Text,
  FlatList,
  TouchableHighlight,
  Modal,
  Image,
  ActivityIndicator,
  BackHandler,
  TextInput,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { orderStyle } from "./orderStyle";
import Header from "../../components/Header";
import { homeProp, notificationTypes } from "../../types";
import { ScrollView } from "react-native-gesture-handler";
import { AntDesign, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Colors, Fonts } from "../../constants/Layout";
import { useAppDispatch, useAppSelector } from "../../app/reduxHooks/hooks";
import {
  cartItemType,
  clearCart,
  selectCarts,
} from "../../features/cart/cartSlice";
import { orderType, placeOrder } from "../../features/orders/OrdersSlice";
import AnimatedLottieView from "lottie-react-native";
import { Button, CheckBox } from "react-native-elements";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import axios from "../../app/axios";
import MapView from "react-native-maps";
import useNotificationToken from "../../hooks/useNotificationToken";
import SnackBar from "react-native-snackbar-component";
import { schedulePushNotification } from "../../app/utils";
import { StackActions } from "@react-navigation/native";

const ProcessPrevOrder = ({ navigation, route }: homeProp) => {
  const { user, completed, error: authError } = useFirebaseAuth();
  const dispatch = useAppDispatch();
  const [cartItems, setCartItems] = useState<Partial<cartItemType[]>>([]);
  const [cartTotalAmount, setCartTotalAmount] = useState(0);
  const [payManualLoading, setPayManualLoading] = useState(false);
  const [error, setError] = useState("");
  const [newOrder, setNewOrder] = useState<orderType | null>(null);
  const [loading, setLoading] = useState(true);
  const [locationModal, setLocationModal] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [locationStreet, setLocationStreet] = useState("");
  const [agentPay, setAgentPay] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { notification, response: notificationReponse } =
    useNotificationToken();

  const [locationLngLat, setLocationLgnLat] = useState<{
    longitude: number;
    latitude: number;
  } | null>(null);
  const [searchTimer, setSearchTimer] = useState<{ timer: any; last: number }>({
    timer: undefined,
    last: 0,
  });

  useEffect(() => {
    const totalAmount = cartItems.reduce((p, c, indx) => {
      if (c) return p + c.price * c.quantity;
      return p;
    }, 0);
    setCartTotalAmount(totalAmount);
  }, [cartItems]);

  useEffect(() => {
    if (error) setSnackbarMessage(error);
  }, [error]);

  useEffect(() => {
    if (newOrder) {
      setTimeout(() => {
        navigation.pop();
      }, 1000);
    }
  }, [newOrder]);

  useEffect(() => {
    if (notification) {
      const notificationData = notification.request.content.data;
      if (notificationData.type === notificationTypes.order) {
        navigation.navigate("PreviousOrders", {
          fromOrders: true,
        });
      }
    }
  }, [notification]);

  useEffect(() => {
    setLoading(true);
    setCartItems(JSON.parse((route.params as any).prevOrder));
    setLoading(false);
  }, []);

  useEffect(() => {
    if (completed && !user) navigation.navigate("LoginScreen");
  }, [completed, user]);

  useEffect(() => {
    if (!loading && !cartItems.length) {
      setTimeout(() => {
        if (!loading && !cartItems.length) navigation.navigate("Home");
      }, 1000);
    }
  }, [loading, cartItems]);

  useEffect(() => {
    if (notificationReponse) {
      setNewOrder(null);
      const notificationData =
        notificationReponse.notification.request.content.data;
      if (notificationData.type === notificationTypes.order) {
        navigation.navigate("PreviousOrders", {
          fromOrders: true,
        });
      }
    }
  }, [notificationReponse]);

  useEffect(() => {
    if (locationStreet) {
      (async () => {
        setLocationLoading(true);
        if (Date.now() - searchTimer.last < 3 * 1000) {
          if (searchTimer.timer) clearTimeout(searchTimer.timer);
        }
        let timer = setTimeout(async () => {
          const res = await axios.get(
            `/globals/get_long_lat/${locationStreet}`
          );
          setLocationLoading(false);
          if (res.data.error) return setError(res.data.error);
          setLocationLgnLat({
            longitude: res.data.geometry.location.lng,
            latitude: res.data.geometry.location.lat,
          });
        }, 800);
        setSearchTimer({
          last: Date.now(),
          timer: timer,
        });
      })();
    } else {
      setLocationLgnLat(null);
      setLocationLoading(false);
      if (searchTimer.timer) clearTimeout(searchTimer.timer);
    }
  }, [locationStreet]);

  const handlePay = async () => {
    setError("");
    if (locationStreet && locationLngLat && cartItems) {
      setPayManualLoading(true);
      const foods: { id: string; quantity: number }[] = cartItems.map((c) => ({
        id: c?.id || "",
        quantity: c?.quantity || 1,
      }));
      const res = await dispatch(
        placeOrder({ foods, locationStreet, locationLngLat, agentPay })
      );
      setPayManualLoading(false);
      if (res.meta.requestStatus === "rejected")
        return setError((res as any).error.message);
      const newOrder = res.payload;
      dispatch(clearCart());
      schedulePushNotification(
        "New Order Created",
        `You Have successfully placed an order. Order-id-${newOrder.id.substring(
          0,
          10
        )}...`,
        {
          orderId: newOrder.id,
          type: notificationTypes.order,
        }
      );
      setNewOrder(newOrder);
    } else {
      setError("Set Location before proceed");
    }
  };
  const renderCartsItem = ({ item }: { item: any }) => (
    <View style={orderStyle.summary}>
      <Text style={orderStyle.text}>{item.name}</Text>
      <View style={orderStyle.disheCont}>
        <Text style={orderStyle.text}>Price</Text>
        <Text style={orderStyle.text}>
          {item.price}x{item.quantity}
        </Text>
      </View>
      <View style={orderStyle.check}>
        <AntDesign name="checkcircle" color={Colors.primary} size={18} />
      </View>
    </View>
  );
  //
  return (
    <>
      <SnackBar
        visible={Boolean(snackbarMessage)}
        textMessage={snackbarMessage}
        backgroundColor={error ? "red" : "green"}
        accentColor="white"
        actionHandler={() => {
          setSnackbarMessage("");
        }}
        actionText="Close"
      />
      {Boolean(newOrder) && (
        <>
          <View
            style={{
              width: "100%",
              height: "100%",
              zIndex: 50,
            }}
          >
            <AnimatedLottieView
              source={require("../../assets/images/lottie/order-success.json")}
              autoPlay
              loop
            />
          </View>

          <Modal animationType="fade" transparent>
            <View
              style={{
                width: "100%",
                minHeight: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  width: "80%",
                  minHeight: "50%",
                  padding: 10,
                  backgroundColor: "white",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    flexDirection: "column",
                  }}
                >
                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Image
                      source={require("../../assets/images/logo-no-bg.png")}
                      width={180}
                      height={53.285}
                      resizeMode="center"
                    />
                  </View>
                  <View
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: 20,
                    }}
                  >
                    <Text style={{ ...Fonts.h5 }}>Order Id</Text>
                    <Text style={{ ...Fonts.body5 }}>{newOrder?.id}</Text>
                  </View>
                </View>
                <View style={{ width: "100%", alignItems: "center" }}>
                  {newOrder?.items.map((item) => (
                    <View
                      key={item.id}
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        backgroundColor: "#F8FAFC",
                        padding: 10,
                      }}
                    >
                      <Text style={{ ...Fonts.body3 }}>{item.foodName}</Text>
                      <Text style={{ ...Fonts.body3, fontWeight: "bold" }}>
                        ₵{item.price}x{item.quantity}
                      </Text>
                    </View>
                  ))}
                  <View style={{ width: "100%", alignItems: "flex-end" }}>
                    <Text>
                      Total Price - ₵
                      {newOrder && newOrder?.hasRefCode
                        ? newOrder.totalPrice + 1 + 0.2
                        : newOrder && newOrder.totalPrice + 0.2}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    width: "100%",
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Text style={{ color: "#DB2777", ...Fonts.h5 }}>
                    Food On Its Way
                  </Text>
                  <Button
                    title="Go To Orders"
                    buttonStyle={{
                      backgroundColor: Colors.red,
                    }}
                    containerStyle={{
                      width: "100%",
                      marginTop: 5,
                    }}
                    onPress={() => {
                      setNewOrder(null);
                      navigation.navigate("PreviousOrders", {
                        fromOrders: true,
                      });
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
        </>
      )}
      {locationModal && (
        <Modal
          transparent
          onRequestClose={() => {
            setLocationModal(false);
          }}
          animationType="fade"
        >
          <View
            style={{
              width: "100%",
              height: "100%",
              marginTop: 60,
              backgroundColor: "#fff",
              position: "relative",
              zIndex: 50,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                alignSelf: "center",
                elevation: 2,
                paddingHorizontal: 10,
              }}
            >
              <View style={{ flex: 1, marginRight: 5 }}>
                <TextInput
                  value={locationStreet}
                  onChangeText={(text) => setLocationStreet(text)}
                  placeholder="Enter Location For Delivery"
                  style={{
                    height: 50,
                    width: "100%",
                    color: Colors.black,
                    backgroundColor: "white",
                    borderColor: Colors.darkgray,
                    borderWidth: 1,
                    borderRadius: 5,
                    paddingHorizontal: 10,
                    fontSize: 18,
                  }}
                />
                {locationLoading && (
                  <View
                    style={{
                      position: "absolute",
                      right: 0,
                      top: 10,
                    }}
                  >
                    <ActivityIndicator size={28} color={Colors.red} />
                  </View>
                )}
              </View>
              <Pressable
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}
                onPress={() => {
                  setLocationModal(false);
                  console.log("hello");
                }}
              >
                <MaterialIcons name="check" size={38} color={Colors.primary} />
              </Pressable>
            </View>
            <View style={{ flex: 1, width: "100%" }}>
              <MapView
                style={{ width: "100%", height: "100%" }}
                loadingEnabled={true}
                region={{
                  latitude: locationLngLat?.latitude || 37.78825,
                  longitude: locationLngLat?.longitude || -122.4324,
                  latitudeDelta: 0.015,
                  longitudeDelta: 0.0121,
                }}
              />
            </View>
          </View>
        </Modal>
      )}
      <View style={orderStyle.main}>
        <View style={orderStyle.header}>
          <Header
            title={locationModal ? "Your Location" : "Your Last Order"}
            navigation={navigation}
          />
        </View>
        {completed && user && !loading && cartItems.length ? (
          <>
            <ScrollView style={orderStyle.contentContainer}>
              {user.agent && (
                <>
                  <CheckBox
                    title="It appears that you are an agent, do you want to pay through your agent account?"
                    checked={agentPay}
                    onPress={() => {
                      setAgentPay(!agentPay);
                    }}
                  />
                </>
              )}
              <Button
                title="Set Your Location"
                onPress={() => setLocationModal(true)}
              />
              <Text
                style={{ ...Fonts.body5, fontSize: 14, textAlign: "center" }}
              >
                {locationStreet}
              </Text>
              <View>
                <FlatList
                  renderItem={renderCartsItem}
                  data={cartItems}
                  keyExtractor={(item, indx) => item?.id || indx.toString()}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ paddingBottom: 100 }}
                />
              </View>
            </ScrollView>
            {!newOrder && (
              <View style={orderStyle.sumCont}>
                <View style={orderStyle.totalCont}>
                  <Text style={orderStyle.totalText}>Total</Text>
                  <Text style={orderStyle.totalText}>
                    GH₵ {cartTotalAmount}
                  </Text>
                </View>
                <View style={orderStyle.orderBtnCont}>
                  <TouchableHighlight
                    disabled={!locationLngLat || !locationStreet}
                    style={[
                      orderStyle.orderBtn,
                      { opacity: !locationLngLat || !locationStreet ? 0.5 : 1 },
                    ]}
                    onPress={() => handlePay()}
                  >
                    {payManualLoading ? (
                      <ActivityIndicator animating size={28} color="#222" />
                    ) : (
                      <Text style={orderStyle.orderBtnText}>
                        {agentPay
                          ? "Pay With Agent Acount"
                          : "Payment On Delivery"}
                      </Text>
                    )}
                  </TouchableHighlight>
                </View>
              </View>
            )}
          </>
        ) : (
          <View
            style={{
              flex: 1,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: Colors.white,
            }}
          >
            <ActivityIndicator size={32} color="#222" animating />
          </View>
        )}
      </View>
    </>
  );
};
export default ProcessPrevOrder;
