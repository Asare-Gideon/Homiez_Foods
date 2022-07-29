import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
  ActivityIndicator,
  BackHandler,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { homeProp } from "../../types";
import { Colors, Fonts, Sizes } from "../../constants/Layout";
import { AntDesign, MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useAppDispatch, useAppSelector } from "../../app/reduxHooks/hooks";
import {
  getOrders,
  orderType,
  selectOrders,
} from "../../features/orders/OrdersSlice";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import axios from "../../app/axios";
import { auth } from "../../app/Firebase";
import { getIdToken, User } from "firebase/auth";
import moment from "moment";
import { useIsFocused } from "@react-navigation/native";
import { selectUserData } from "../../features/auth/AuthSlice";
import { Button } from "react-native-elements";

const numInPage = 6;
const PreviousOrder = ({ navigation, route }: homeProp) => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const orders = useAppSelector(selectOrders(page));
  const isFocused = useIsFocused();
  const [lastUpdateComplete, setLastUpdateComplete] = useState(false);
  const [ordersLastUpdate, setOrdersLastUpdate] = useState<number>(0);
  const { user, completed } = useFirebaseAuth();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const userData = useAppSelector(selectUserData);
  const [totalOrders, setTotalOrders] = useState(userData?.ordersCount || 1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchOrders, setSearchOrders] = useState<orderType[]>([]);
  const [displayedOrders, setDispayedOrders] = useState<orderType[]>(orders);
  const [searchLoading, setSearchLoading] = useState(false);
  const isFromOrders = (route.params as any)?.fromOrders;

  useEffect(() => {
    (async () => {
      if (lastUpdateComplete) {
        if (!orders.length) setLoading(true);
        await dispatch(
          getOrders({
            lastUpdate: ordersLastUpdate,
            page,
          })
        );
        setLoading(false);
      }
    })();
  }, [page, lastUpdateComplete, ordersLastUpdate]);

  useEffect(() => {
    const handler = () => {
      if (isFromOrders) {
        navigation.pop(2);
        return true;
      }
      return false;
    };
    BackHandler.addEventListener("hardwareBackPress", handler);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handler);
    };
  }, [isFocused, isFromOrders]);

  useEffect(() => {
    (async () => {
      setLastUpdateComplete(false);
      const res = await axios.get("/users/orderGlobals");
      const globals: any = res.data;
      setOrdersLastUpdate(globals?.ordersLastUpdate);
      setLastUpdateComplete(true);
    })();
  }, []);

  useEffect(() => {
    let numPages =
      totalOrders > numInPage ? Math.ceil(totalOrders / numInPage) : 1;
    setTotalPages(numPages);
  }, [totalOrders, userData]);

  useEffect(() => {
    if (!!searchOrders.length) {
      setDispayedOrders(
        searchOrders.map((s) => ({
          ...s,
          createdAt: {
            nanoseconds: (s as any).createdAt["_nanoseconds"],
            seconds: (s as any).createdAt["_seconds"],
          },
        }))
      );
    } else {
      setDispayedOrders(orders);
    }
  }, [orders, searchOrders]);

  useEffect(() => {
    if (!search) setSearchOrders([]);
  }, [search]);

  const handleSearch = () => {
    if (search) {
      if (auth.currentUser) {
        (async () => {
          setSearchLoading(true);
          const token = await getIdToken(auth.currentUser as User);
          const searchRes = await axios.get(
            `/users/searchOrder?s=${search}&page=${page}&token=${token}`
          );
          setSearchLoading(false);
          if (searchRes.data.error) return setError(searchRes.data.error);
          setSearchOrders(searchRes.data);
        })();
      }
    } else {
      setSearchOrders([]);
    }
  };

  const handleNextPage = () => {
    if (page <= totalPages) setPage((p) => p + 1);
  };

  const handlePrevPage = () => {
    setPage((p) => {
      if (p > 1) return p - 1;
      return p;
    });
  };

  const renderOrders = ({ item }: { item: orderType }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("PreviousOrderDetail", {
          selectedOrder: JSON.stringify(item),
          fromOrders: Boolean(isFromOrders),
        })
      }
    >
      <View style={styles.summary}>
        <Text style={[styles.headerText, { fontSize: 15 }]}>Order Summary</Text>
        <Text style={[styles.disheText, { fontSize: 13 }]}>
          Order {item.id}
        </Text>
        {item.items.map((it) => (
          <View key={it.id} style={styles.disheCont}>
            <Text style={[styles.disheText, { fontSize: 13 }]}>
              {it.foodName} x {it.quantity}
            </Text>
          </View>
        ))}

        <View>
          <Text style={[styles.disheText, { fontSize: 13 }]}>
            {moment.unix(item.createdAt.seconds).format("llll")}
          </Text>
        </View>
        <View style={styles.disheCont}>
          <Text style={[styles.disheText, { fontSize: 13 }]}>Total price</Text>
          <Text style={[styles.disheText, { fontSize: 13 }]}>
            ₵
            {item && item?.hasRefCode
              ? item.totalPrice + 1 + 0.2
              : item && item.totalPrice + 0.2}
          </Text>
        </View>
        <View style={styles.check}>
          <AntDesign
            name="checkcircle"
            color={
              item.completed ? "green" : item.failed ? "red" : Colors.primary
            }
            size={30}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Header
          title="Previous Orders"
          onBackPressed={() => {
            if (isFromOrders) {
              navigation.pop(2);
            } else {
              navigation.goBack();
            }
          }}
          navigation={navigation}
        />
      </View>
      <View style={styles.ContentCont}>
        {(!searchLoading || !loading) && (
          <View style={{ width: "100%", padding: 10 }}>
            <Button
              title="search"
              containerStyle={{
                position: "absolute",
                right: 0,
                top: 10,
                zIndex: 20,
              }}
              onPress={handleSearch}
              buttonStyle={{ backgroundColor: "#bbbbbb" }}
            />
            <TextInput
              value={search}
              onChangeText={(text) => {
                setSearch(text);
              }}
              placeholder="Search an order with id, delivery location, date (*/*/****)"
              placeholderTextColor={"#aaa"}
              style={{
                width: "100%",
                padding: 5,
                paddingRight: 80,
                fontSize: 12,
                borderColor: "#aaaaaa44",
                borderWidth: 1,
                borderRadius: 10,
              }}
            />
          </View>
        )}
        {(loading || searchLoading) && (
          <>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                width: "100%",
              }}
            >
              <ActivityIndicator size={28} color={Colors.black} animating />
            </View>
          </>
        )}
        {!!displayedOrders.length && !loading && !searchLoading && (
          <>
            <FlatList
              renderItem={renderOrders}
              data={displayedOrders}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 30 }}
            />
            {!searchOrders.length && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 10,
                  backgroundColor: "#dddddd44",
                  borderRadius: 5,
                }}
              >
                <Text style={{ ...Fonts.body5, fontSize: 10, color: "#333" }}>
                  {page} of {totalPages}
                </Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Button
                    title="Prev"
                    disabled={page <= 1}
                    containerStyle={{ margin: 2 }}
                    onPress={() => {
                      handlePrevPage();
                    }}
                    titleStyle={{ color: "#555" }}
                    buttonStyle={{ backgroundColor: "#bbb" }}
                    icon={
                      <AntDesign
                        size={18}
                        color={page <= 1 ? "#aaa" : "#333"}
                        name="left"
                      />
                    }
                  />
                  <Button
                    title="Next"
                    containerStyle={{ margin: 2 }}
                    disabled={page >= totalPages}
                    titleStyle={{ color: "#555" }}
                    onPress={() => {
                      handleNextPage();
                    }}
                    buttonStyle={{ backgroundColor: "#bbb" }}
                    iconPosition="right"
                    icon={
                      <AntDesign
                        size={18}
                        color={page >= totalPages ? "#aaa" : "#333"}
                        name="right"
                      />
                    }
                  />
                </View>
              </View>
            )}
          </>
        )}
        {!loading && !orders.length && page == 1 && (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              flex: 1,
              width: "100%",
            }}
          >
            <MaterialCommunityIcons
              name="alert-circle-outline"
              size={72}
              color={Colors.darkgray}
            />
            <Text style={{ ...Fonts.h3 }}>No Orders Made</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    paddingTop: Sizes.paddingTop,
    backgroundColor: Colors.primary,
  },
  header: {
    height: 60,
  },
  ContentCont: {
    backgroundColor: Colors.warmWhite,
    padding: 15,
    flex: 1,
  },
  summary: {
    elevation: 2,
    backgroundColor: Colors.white,
    borderRadius: 12,
    padding: 10,
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerText: {
    ...Fonts.h3,
    color: Colors.darkgray,
    paddingBottom: 4,
  },
  text1: {
    ...Fonts.body2,
    color: Colors.deepDarkGray,
    fontSize: 18,
  },
  disheCont: {
    flexDirection: "row",
  },
  disheText: {
    ...Fonts.body5,
    color: Colors.deepDarkGray,
    fontSize: 18,
    marginRight: 15,
  },
  check: {
    position: "absolute",
    right: 1,
    bottom: 1,
  },
});

export default PreviousOrder;
