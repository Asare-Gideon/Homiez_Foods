import {
  View,
  Text,
  StyleSheet,
  Animated,
  Share,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { Colors, Fonts, Sizes } from "../../constants/Layout";
import { homeProp } from "../../types";
import Header from "../../components/Header";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from "@react-navigation/native";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import { auth } from "../../app/Firebase";
import { useAppSelector } from "../../app/reduxHooks/hooks";
import { selectAgent, setAgent } from "../../features/auth/AuthSlice";
import { useDispatch } from "react-redux";
import { getIdToken } from "firebase/auth";
import axios from "../../app/axios";
import moment from "moment";
import { getAnalyticsFromData } from "../../app/utils";

const Agent = ({ navigation }: homeProp) => {
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const { user, completed } = useFirebaseAuth();
  const slideAnim = useRef(new Animated.Value(-280)).current;
  const agent = useAppSelector(selectAgent);
  const [agentLoading, setAgentLoading] = useState(true);
  const [error, setError] = useState("");
  const [analyticsData, setAnalyticsData] = useState({
    ordersToday: 0,
    ordersMonth: 0,
    ordersYear: 0,
  });
  useEffect(() => {
    (async () => {
      if (completed && user && auth.currentUser) {
        const token = await getIdToken(auth.currentUser);
        const res = await axios.get(`/users/getAgentInfo?token=${token}`);
        setAgentLoading(false);
        if (res.data.error) return setError("There was an error");
        dispatch(setAgent(res.data));
      }
    })();
  }, [isFocused, user, completed]);
  useEffect(() => {
    if (agent) {
      const analyticsData = getAnalyticsFromData(agent, "orders") as any;
      setAnalyticsData(analyticsData);
    }
  }, [agent]);

  const handleShare = () => {
    Share.share({
      message: `homiezfoods.com/?rc=${agent?.refCode}`,
      url: `https://homiezfoods.com/?rc=${agent?.refCode}`,
      title: "Share Your Link",
    });
  };

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: false,
    }).start();
  };
  const slideDown = () => {
    Animated.timing(slideAnim, {
      toValue: -280,
      duration: 800,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Header title="Agent Console" navigation={navigation} />
      </View>
      <ScrollView style={styles.contentCont}>
        {agentLoading && (
          <View
            style={{
              flex: 1,
              width: "100%",
              height: Sizes.height - 100,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator animating size={28} color="#000" />
          </View>
        )}
        {completed && !user && (
          <View
            style={{
              flex: 1,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            There was an error, please check if user is logged in
          </View>
        )}
        {!agentLoading && !agent && (
          <View
            style={{
              flex: 1,
              width: "100%",
              height: Sizes.height - 60,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text>There was an error, agent data couldn't be collected</Text>
          </View>
        )}
        {!agentLoading && Boolean(agent) && (
          <>
            <View style={styles.amountCont}>
              <View style={styles.amountTextCont}>
                <Text style={styles.amountText}>Current: </Text>
                <Text style={styles.amountText}>GH₵ {agent?.profit || 0}</Text>
              </View>
              <TouchableOpacity style={styles.amountBtn}>
                <Text style={styles.amountBtnText}>Withdraw</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.amountCont}>
              <Text style={styles.amountText}>Amount Withdrawn: </Text>
              <Text style={styles.amountText}>GH₵ {agent?.withdrawn || 0}</Text>
            </View>
            <View style={styles.amountCont}>
              <Text style={styles.amountText}>Your Refcode: </Text>
              <Text style={styles.amountText}>{agent?.refCode}</Text>
            </View>
            <View style={styles.amountCont}>
              <Text style={styles.amountText}>Users Referenced: </Text>
              <Text style={styles.amountText}>{agent?.references || 0}</Text>
            </View>
            <View style={styles.amountCont}>
              <Text style={styles.amountText}>Orders Referenced Today: </Text>
              <Text style={styles.amountText}>
                {analyticsData["ordersToday"] || 0}
              </Text>
            </View>
            <View style={styles.amountCont}>
              <Text style={styles.amountText}>
                Orders Referenced This Month:{" "}
              </Text>
              <Text style={styles.amountText}>
                {analyticsData["ordersMonth"] || 0}
              </Text>
            </View>
            <View style={styles.amountCont}>
              <Text style={styles.amountText}>
                Orders Referenced This Year:{" "}
              </Text>
              <Text style={styles.amountText}>
                {analyticsData["ordersYear"] || 0}
              </Text>
            </View>
            <View style={styles.amountCont}>
              <Text style={styles.amountText}>Orders Referenced Total: </Text>
              <Text style={styles.amountText}>{agent?.orders || 0}</Text>
            </View>

            <Text style={styles.amountText}>Withdrawal History</Text>
            <View style={styles.history}>
              {/**History table  header*/}
              {agent?.withdrawals &&
                agent.withdrawals.map((withdrawal) => (
                  <>
                    <View style={styles.historyHeader}>
                      <Text style={styles.amountText}>Time and Date</Text>
                      <Text style={styles.amountText}>Amount</Text>
                    </View>

                    {/**History table  content*/}

                    <View style={styles.historyHeader}>
                      <Text style={styles.amountText}>
                        {moment.unix(withdrawal.time.seconds).format("llll")}
                      </Text>
                      <Text style={styles.amountText}>
                        GH₵ {withdrawal.amount}
                      </Text>
                    </View>
                  </>
                ))}
            </View>
          </>
        )}
      </ScrollView>

      {!agentLoading && Boolean(agent) && (
        <View style={styles.shareBtnCont}>
          <TouchableOpacity
            style={styles.shareBtn}
            onPress={() => {
              handleShare();
            }}
          >
            <Text style={styles.shareBtnText}>Share & Earn</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* <Animated.View style={[styles.popupCont, { marginBottom: slideAnim }]}>
        <View style={styles.iconCont}>
          <TouchableOpacity>
            <Fontisto name="whatsapp" size={50} color="#25D366" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo name="facebook-with-circle" size={50} color="#4267B2" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo name="twitter-with-circle" size={50} color="#1DA1F2" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Entypo name="instagram-with-circle" size={50} color="#C13584" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.popBtn}>
          <Text
            style={{
              ...Fonts.body2,
              textAlign: "center",
              color: Colors.darkgray,
            }}
          >
            Copy Link
          </Text>
        </TouchableOpacity>
        <View style={styles.closeBtnCont}>
          <TouchableOpacity style={styles.closeBtn} onPress={() => slideDown()}>
            <Feather name="arrow-down-circle" size={40} color={"#dc2828"} />
          </TouchableOpacity>
        </View>
      </Animated.View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  closeBtn: {},
  closeBtnCont: {
    position: "absolute",
    top: -17,
    alignSelf: "center",
    backgroundColor: Colors.white,
    padding: 4,
    borderRadius: 20,
  },
  popBtn: {
    borderWidth: 1,
    borderRadius: 5,
    marginTop: 45,
    padding: 10,
    elevation: 1,
    borderColor: Colors.deepDarkGray,
  },
  iconCont: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
  },
  popupCont: {
    height: 250,
    backgroundColor: Colors.white,
    padding: 15,
    paddingLeft: 23,
    paddingRight: 23,
  },
  shareBtnText: {
    color: Colors.white,
    ...Fonts.body3,
    textAlign: "center",
  },
  shareBtn: {
    backgroundColor: Colors.primary,
    width: Sizes.width - 40,
    padding: 8,
    borderRadius: 8,
    elevation: 8,
  },
  shareBtnCont: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  historyHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.3,
    borderColor: Colors.deepDarkGray,
    marginBottom: 10,
    paddingBottom: 5,
  },
  history: {
    marginTop: 6,
    backgroundColor: Colors.white,
    padding: 5,
    borderRadius: 5,
  },
  amountBtnText: {
    color: Colors.warmWhite,
    ...Fonts.body3,
  },
  amountBtn: {
    backgroundColor: "#dc2828",
    paddingLeft: 10,
    paddingRight: 10,
    padding: 5,
    borderRadius: 4,
    elevation: 2,
  },
  amountText: {
    ...Fonts.body2,
    fontSize: 15.4,
    color: Colors.darkgray,
    marginRight: 4,
  },
  amountTextCont: {
    flexDirection: "row",
  },
  amountCont: {
    padding: 5,
    backgroundColor: Colors.white,
    borderRadius: 4,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  main: {
    flex: 1,
    backgroundColor: Colors.primary,
    height: Sizes.height,
    width: Sizes.width,
    paddingTop: Sizes.paddingTop,
  },
  header: {
    height: 60,
  },
  contentCont: {
    flex: 1,
    backgroundColor: Colors.warmWhite,
    paddingBottom: 25,
    padding: 15,
  },
});

export default Agent;
