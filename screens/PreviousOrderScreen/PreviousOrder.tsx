import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableHighlight,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { homeProp } from "../../types";
import { Colors, Fonts, Sizes } from "../../constants/Layout";
import { AntDesign } from "@expo/vector-icons";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
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

const PreviousOrder = ({ navigation }: homeProp) => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const orders = useAppSelector(selectOrders(1));
  const [lastUpdateComplete, setLastUpdateComplete] = useState(false);
  const [ordersLastUpdate, setOrdersLastUpdate] = useState<number>(0);
  const [selectedOrder, setSelectedOrder] = useState("");
  const { user, completed } = useFirebaseAuth();
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [searchOrders, setSearchOrders] = useState<orderType[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (lastUpdateComplete) {
        setLoading(true);
        await dispatch(
          getOrders({
            lastUpdate: ordersLastUpdate,
            page: page,
          })
        );
        setLoading(false);
      }
    })();
  }, [page, lastUpdateComplete, dispatch, ordersLastUpdate]);

  useEffect(() => {
    (async () => {
      setLastUpdateComplete(false);
      const res = await axios.get("/users/orderGlobals");
      const globals: any = res.data;
      setOrdersLastUpdate(globals?.ordersLastUpdate);
      setLastUpdateComplete(true);
    })();
  }, []);

  const handleOnScrolledToEnd = async () => {
    setLoading(true);
    await dispatch(
      getOrders({
        lastUpdate: ordersLastUpdate,
        page: page,
      })
    );
    setLoading(false);
  };

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
  const renderOrders = ({ item }: { item: orderType }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("PreviousOrderDetail", {
          selectedOrder: JSON.stringify(item),
        })
      }
    >
      <View style={styles.summary}>
        <Text style={styles.headerText}>Order Summary</Text>
        <Text style={styles.disheText}>Order {item.id}</Text>
        {item.items.map((it) => (
          <View style={styles.disheCont}>
            <Text style={styles.disheText}>
              {it.foodName} x {it.quantity}
            </Text>
          </View>
        ))}

        <View>
          <Text style={styles.disheText}>
            {moment.unix(item.createdAt.seconds).format("llll")}
          </Text>
        </View>
        <View style={styles.disheCont}>
          <Text style={styles.disheText}>Total price</Text>
          <Text style={styles.disheText}>
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
        <Header title="Previous Orders" navigation={navigation} />
      </View>
      <View style={styles.ContentCont}>
        <FlatList
          renderItem={renderOrders}
          data={orders}
          onEndReached={handleOnScrolledToEnd}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 30 }}
        />
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
