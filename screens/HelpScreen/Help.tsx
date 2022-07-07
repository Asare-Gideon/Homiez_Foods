import { View, StyleSheet, Text } from "react-native";
import React from "react";
import { homeProp } from "../../types";
import { Colors, Fonts, Sizes } from "../../constants/Layout";
import Header from "../../components/Header";
import { ScrollView } from "react-native-gesture-handler";

const Help = ({ navigation }: homeProp) => {
  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Header title="Help" navigation={navigation} />
      </View>
      <ScrollView style={styles.ContentCont}>
        <View>
          <View style={styles.textCont}>
            <Text style={[styles.headerText]}>About Homiez Foods</Text>
            <Text style={[styles.text, { fontSize: 12 }]}>
              Homiez foods is a Restaurant located near Kotei Police Station,
              Kumasi. Our mission is to become your favorite food brand and
              bring to you the best meal service while we are in your area.
            </Text>

            <Text style={[styles.text, { fontSize: 12, marginTop: 8 }]}>
              We give you a reason to eat the best food at any time and yearn
              for more.
            </Text>
            <Text style={[styles.text, { fontSize: 12, marginTop: 8 }]}>
              We are currently working in kumasi but are rapidly spreading our
              wings. Spot us in your location soon
            </Text>
            <Text style={[styles.text, { fontSize: 12, marginTop: 8 }]}>
              Homiezfoods, Food You Love!!!
            </Text>
          </View>
          <View style={styles.textCont}>
            <Text style={styles.headerText}>How the app works</Text>
            <Text style={{ ...Fonts.h2, fontSize: 12 }}>
              1. Choose Your Preferred food:{" "}
            </Text>
            <Text style={[styles.text, { fontSize: 12 }]}>
              Food kinds have been made into packages on the homescreen of the
              app. Every food package has what it contains and will be listed in
              the food's details screen.
            </Text>
            <Text style={[{ marginTop: 8 }, styles.text, { fontSize: 12 }]}>
              You buy a food package and get other food items attached to them,
              by navigating through the packages. Like you can buy meat attached
              to some other meals.
            </Text>

            <Text style={{ marginTop: 12, ...Fonts.h2, fontSize: 12 }}>
              2. Your Food Cart:{" "}
            </Text>
            <Text style={[styles.text, { fontSize: 12 }]}>
              Your cart is to contain your preferred food packages for an order.
              It will be stored locally therefore will even persist when you log
              out. You can checkout your cart at any point in time.
            </Text>

            <Text style={{ marginTop: 12, ...Fonts.h2, fontSize: 12 }}>
              3. The Checkout Screen:{" "}
            </Text>
            <Text style={[styles.text, { fontSize: 12 }]}>
              The checkout screen is almost just to confirm the food items that
              are being bought except you have to add your location of delivery.
            </Text>
            <Text style={[styles.text, { marginTop: 8 }, { fontSize: 12 }]}>
              When The Location button is clicked you will have a map where your
              typed out location (your area name), will be tried and located on
              the map. If the map isn't able to get your location, try other
              landmarks in your area so we can get an approximate distance to
              your area.
            </Text>

            <Text style={{ marginTop: 12, ...Fonts.h2, fontSize: 12 }}>
              4. After Order:{" "}
            </Text>
            <Text style={[styles.text, { fontSize: 12 }]}>
              After making an order, you will receive a notification of success
              that the order has been received. Your orders screen will have
              your previous orders and ongoing orders as well.
            </Text>
            <Text style={[styles.text, { marginTop: 8 }, { fontSize: 12 }]}>
              Pressing on an order will lead you to the order's summary that was
              generated during the order.
            </Text>

            <Text style={{ marginTop: 12, ...Fonts.h2, fontSize: 12 }}>
              3. Notifications:{" "}
            </Text>
            <Text style={styles.text}>
              <Text style={[styles.text, { fontSize: 12 }]}>
                Still after an order, you will receive
              </Text>{" "}
              <Text
                style={[
                  styles.text,
                  { fontWeight: "bold", marginHorizontal: 5, fontSize: 12 },
                ]}
              >
                2
              </Text>{" "}
              <Text style={[styles.text, { fontSize: 12 }]}>
                more notifications. First, that the rider is on the way and
                second, the order has completed or failed. Any of these are yet
                still trackable on the orders screen.
              </Text>
              <Text
                style={[
                  styles.text,
                  { fontStyle: "italic", marginTop: 8, fontSize: 12 },
                ]}
              >
                Also after an order, there will be a locate icon on the top side
                of the screen that can be used to track the order, and make a
                call if order is delayed.
              </Text>
            </Text>

            <Text
              style={[
                styles.text,
                { marginTop: 20, fontStyle: "italic", fontSize: 8 },
              ]}
            >
              You can contribute to this app through Google play or Apple store.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  textCont: {
    marginBottom: 15,
    paddingBottom: 5,
    borderBottomWidth: 0.5,
  },
  text: {
    ...Fonts.body3,
    color: Colors.darkgray,
    textAlign: "justify",
  },

  headerText: {
    ...Fonts.h2,
    fontSize: 14,
    color: Colors.darkgray,
    marginBottom: 10,
  },
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
    padding: 19,
    flex: 1,
  },
});
export default Help;
