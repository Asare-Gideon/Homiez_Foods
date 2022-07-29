import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, Fonts, Sizes } from "../../constants/Layout";
import Header from "../../components/Header";
import { homeProp } from "../../types";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign, Feather } from "@expo/vector-icons";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import { signOut } from "firebase/auth";
import { auth } from "../../app/Firebase";
import { Button } from "react-native-elements";
import { useAppDispatch, useAppSelector } from "../../app/reduxHooks/hooks";
import { cleanOrders } from "../../features/orders/OrdersSlice";
import { selectAppVersion } from "../../features/appConfig/appConfigSlice";

const Account = ({ navigation }: homeProp) => {
  const dispatch = useAppDispatch();
  const { user, completed, error } = useFirebaseAuth();
  const [logoutLoading, setLogoutLoading] = useState(false);
  const appVersion = useAppSelector(selectAppVersion);

  const handleLogout = async () => {
    setLogoutLoading(true);
    await signOut(auth);
    dispatch(cleanOrders());
    setLogoutLoading(false);
  };

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>There Was An Error Please</Text>
      </View>
    );
  }
  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Header title="Account" navigation={navigation} />
      </View>
      <View style={styles.contentCont}>
        {completed ? (
          user ? (
            <>
              <Text style={{ ...Fonts.h5, paddingBottom: 5, marginTop: 25 }}>
                {user.username || user.email || user.phone}
              </Text>
              <View style={styles.btnCont}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() =>
                    navigation.navigate("PreviousOrders", {
                      fromOrders: false,
                    })
                  }
                >
                  <View style={styles.btnTextCont}>
                    <AntDesign
                      name="creditcard"
                      size={20}
                      color={Colors.deepDarkGray}
                    />
                    <Text style={styles.btnText}>Previous orders</Text>
                  </View>
                  <AntDesign
                    name="right"
                    size={23}
                    color={Colors.deepDarkGray}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => navigation.navigate("ChangeInfo")}
                >
                  <View style={styles.btnTextCont}>
                    <AntDesign
                      name="book"
                      size={22}
                      color={Colors.deepDarkGray}
                    />
                    <Text style={styles.btnText}>Change info</Text>
                  </View>
                  <AntDesign
                    name="right"
                    size={23}
                    color={Colors.deepDarkGray}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.btn]}
                  onPress={() => navigation.navigate("Help")}
                >
                  <View style={[styles.btnTextCont, { marginBottom: 10 }]}>
                    <Feather
                      name="help-circle"
                      size={24}
                      color={Colors.deepDarkGray}
                    />
                    <Text style={styles.btnText}>Help</Text>
                  </View>
                  <AntDesign
                    name="right"
                    size={23}
                    color={Colors.deepDarkGray}
                  />
                </TouchableOpacity>
                <View style={styles.btn}>
                  <Text>App Version - {appVersion}</Text>
                </View>
              </View>
              <Button
                buttonStyle={{
                  backgroundColor: Colors.red,
                  padding: 10,
                }}
                containerStyle={{
                  marginTop: 20,
                  width: "100%",
                }}
                style={{
                  padding: 10,
                }}
                title="Logout"
                loading={logoutLoading}
                onPress={() => {
                  handleLogout();
                }}
              />
            </>
          ) : (
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
              }}
            >
              <Feather size={80} name="alert-circle" color="#777" />
              <Text style={{ ...Fonts.h5 }}>You Don't have an account</Text>
              <Button
                title="Login"
                buttonStyle={{
                  backgroundColor: Colors.red,
                  padding: 10,
                }}
                containerStyle={{
                  width: "100%",
                }}
                style={{
                  padding: 10,
                }}
                onPress={() => {
                  navigation.navigate("LoginScreen");
                }}
              />
            </View>
          )
        ) : (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: Colors.white,
            }}
          >
            <ActivityIndicator animating size={28} color="#333" />
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  btnTextCont: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnText: {
    ...Fonts.body2,
    color: Colors.deepDarkGray,
    marginLeft: 8,
  },
  btn: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    borderWidth: 0.3,
    marginBottom: 20,
    borderRadius: 10,
  },
  btnCont: {
    width: "100%",
    height: 300,
    backgroundColor: Colors.white,
    elevation: 2,
    paddingHorizontal: 10,
    paddingTop: 15,
    marginTop: 5,
  },
  main: {
    flex: 1,
    paddingTop: Sizes.paddingTop,
    backgroundColor: Colors.primary,
  },
  contentCont: {
    backgroundColor: Colors.warmWhite,
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  header: {
    height: 60,
  },
});

export default Account;
