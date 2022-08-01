import { View, Text, StyleSheet, FlatList, Linking } from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import { Colors, Fonts, Sizes } from "../../constants/Layout";
import MapView, { Marker } from "react-native-maps";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign, Feather } from "@expo/vector-icons";
import { homeProp } from "../../types";
import { useAppSelector } from "../../app/reduxHooks/hooks";
import { selectProcessingOrders } from "../../features/orders/OrdersSlice";
import moment from "moment";
import { orderType } from "../../features/orders/OrdersSlice";
import MapViewDirections from "react-native-maps-directions";
import axios from "../../app/axios";

const Map = ({ navigation }: homeProp) => {
  const [selectedOrder, setSelectedOrder] = useState<orderType | null>(null);
  const processingOrders = useAppSelector(selectProcessingOrders);
  const [customerCallPhone, setCustomerCallPhone] = useState("");
  const [location, setLocation] = useState({
    longitude: -122.4324,
    latitude: 37.78825,
  });
  const [fromLocation, setFromLocation] = useState({
    longitude: 0,
    latitude: 0,
  });

  console.log(processingOrders);

  useEffect(() => {
    if (!!processingOrders.length) {
      setSelectedOrder(processingOrders[0]);
    }
  }, [processingOrders]);

  useEffect(() => {
    console.log(selectedOrder?.location);
    if (selectedOrder) {
      if (selectedOrder.location?.locationLngLat) {
        setLocation(selectedOrder.location.locationLngLat);
      }
    }
  }, [selectedOrder]);

  useEffect(() => {
    (async () => {
      const res = await axios.get("/users/serviceGlobals");
      const data = res.data;
      setCustomerCallPhone(data.phoneNumber || "");
      setFromLocation({
        longitude: data.location?.location?.longitude || 0,
        latitude: data.location?.location?.latitude || 0,
      });
    })();
  }, []);

  const handleCall = () => {
    const url = `tel://${customerCallPhone}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.main}>
      <View style={styles.backBtnCont}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>
      <MapView
        loadingEnabled={true}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        style={styles.map}
      >
        {selectedOrder &&
          selectedOrder.location?.locationLngLat &&
          !!fromLocation.longitude &&
          !!fromLocation.latitude && (
            <MapViewDirections
              apikey="AIzaSyCfInZTzIWDRowpzmwRdgi9Jyxeu4SU7ec"
              strokeWidth={3}
              strokeColor="hotpink"
              destination={selectedOrder.location.locationLngLat}
              origin={{
                longitude: fromLocation.longitude,
                latitude: fromLocation.latitude,
              }}
            />
          )}
        <Marker
          pinColor={Colors.red}
          title="Homiez Restaurant"
          image={require("../../assets/images/restaurant_80x80.jpg")}
          coordinate={{
            longitude: fromLocation.longitude,
            latitude: fromLocation.latitude,
          }}
        />
        <Marker
          pinColor={Colors.red}
          title="You"
          coordinate={{
            longitude: location.longitude,
            latitude: location.latitude,
          }}
        />
      </MapView>
      <View style={styles.contentCont}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          {selectedOrder?.ongoing && (
            <Text style={{ color: Colors.red, ...Fonts.body3 }}>
              Rider On Way
            </Text>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 10,
          }}
        >
          <View>
            <Text style={styles.headerText}>Ride Duration</Text>
            <Text style={styles.numText}>
              {selectedOrder?.distanceFromUs?.duration.text}
            </Text>
          </View>
          <View>
            <Text style={styles.headerText}>Distance</Text>
            <Text style={styles.numText}>
              {selectedOrder?.distanceFromUs?.distance.text}
            </Text>
          </View>
        </View>
        {!!processingOrders.length && (
          <FlatList
            data={processingOrders}
            horizontal
            contentContainerStyle={{
              paddingVertical: 20,
            }}
            renderItem={({ item }) => {
              return (
                <View style={{ margin: 5 }}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedOrder(item);
                    }}
                    style={{
                      marginRight: 10,
                      width: "100%",
                      borderColor:
                        selectedOrder?.id === item.id
                          ? "green"
                          : Colors.darkgray,
                      padding: 5,
                      borderWidth: 1,
                      borderRadius: 5,
                    }}
                  >
                    <Text>
                      {moment.unix(item.createdAt.seconds).format("llll")}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
            keyExtractor={(item) => item.id}
          />
        )}

        <TouchableOpacity style={styles.callBtn} onPress={handleCall}>
          <Feather name="phone" size={22} color="white" />
          <Text style={styles.btnText}>Call</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backBtnCont: {
    position: "absolute",
    top: 35,
    marginLeft: 15,
    zIndex: 222,
    backgroundColor: Colors.primary,
    padding: 3,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 7,
  },
  btnText: {
    ...Fonts.body2,
    color: Colors.white,
    marginLeft: 10,
  },
  callBtn: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    padding: 8,
    marginTop: 7,
    borderRadius: 4,
    alignItems: "center",
  },
  numText: {
    ...Fonts.h2,
    color: Colors.deepDarkGray,
    paddingLeft: 3,
  },
  headerText: {
    ...Fonts.body2,
    color: Colors.darkgray,
  },
  contentCont: {
    width: Sizes.width - 20,
    alignSelf: "center",
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 10,
    position: "absolute",
    bottom: 50,
  },
  main: {
    flex: 1,
    paddingTop: Sizes.paddingTop,
  },
  map: {
    height: Sizes.height,
    width: Sizes.width,
  },
});
export default Map;
