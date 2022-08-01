import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { AntDesign, Fontisto, Ionicons } from "@expo/vector-icons";
import { Colors, Fonts, Sizes } from "../constants/Layout";
import InputCode from "./InputCode";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import SnackBar from "react-native-snackbar-component";
import useAddAdditionalInfo from "../hooks/useAddAdditionalInfo";
import { TextInput } from "react-native-gesture-handler";
import Button from "./Button";
import { LinearGradient } from "expo-linear-gradient";

interface props {
  phoneAuthError: string;
  phoneAuthCompleteMessage: string;
  show: boolean;
  setShow: (val: boolean) => void;
  sendVerification: () => void;
  verificationLoading: boolean;
  accountCreated: boolean;
  handleCreateAccount: (code: string) => void;
}
const AuthModal: React.FC<props> = ({
  setShow,
  phoneAuthError,
  phoneAuthCompleteMessage,
  accountCreated,
  handleCreateAccount,
  sendVerification,
  verificationLoading,
  show,
}) => {
  const [snackbarMessage, setSnackbarMessage] = useState({
    message: "",
    accentColor: "#ffffff",
    backgroundColor: "#484848",
    messageColor: "#ffffff",
  });
  const {
    completeMessage: additionalInfoCompleteMessage,
    email,
    error: additionalInfoError,
    handleUpdateDetails,
    refCode,
    setEmail,
    setRefCode,
    setUsername,
    updateLoading,
    username,
  } = useAddAdditionalInfo();

  useEffect(() => {
    if (phoneAuthError || additionalInfoError) {
      setSnackbarMessage({
        ...snackbarMessage,
        message: phoneAuthError || additionalInfoError,
        backgroundColor: "#a84848",
      });
    }
  }, [phoneAuthError, additionalInfoError]);

  useEffect(() => {
    if (additionalInfoCompleteMessage || phoneAuthCompleteMessage) {
      setSnackbarMessage({
        ...snackbarMessage,
        message: additionalInfoCompleteMessage || phoneAuthCompleteMessage,
        backgroundColor: "#484848",
      });
    }
  }, [additionalInfoCompleteMessage, phoneAuthCompleteMessage]);
  return (
    <Modal visible={show} animationType="fade" transparent>
      <SnackBar
        visible={Boolean(snackbarMessage.message)}
        textMessage={snackbarMessage.message}
        backgroundColor={snackbarMessage.backgroundColor}
        accentColor={snackbarMessage.accentColor}
        messageColor={snackbarMessage.messageColor}
        actionHandler={() => {
          setSnackbarMessage({
            message: "",
            accentColor: "#ffffff",
            backgroundColor: "#484848",
            messageColor: "#ffffff",
          });
        }}
        actionText="OK"
      />
      <View style={styles.modalFull}>
        <LinearGradient
          colors={[`${Colors.red}`, `${Colors.primary}`]}
          style={styles.modalContent}
        >
          <Pressable
            onPress={() => {
              setShow(false);
            }}
            style={({ pressed }) => ({
              position: "absolute",
              right: 3,
              top: 3,
              opacity: pressed ? 0.5 : 1,
            })}
          >
            <AntDesign name="close" size={28} color="#333" />
          </Pressable>
          {!accountCreated && (
            <>
              <Text
                style={{ ...Fonts.h2, fontSize: 26, color: Colors.lightGray }}
              >
                Verify Mobile Number
              </Text>
              <InputCode
                labelColor={Colors.warmWhite}
                label="Enter Verification Code"
                inputBorderColor={Colors.warmWhite}
                length={6}
                loading={verificationLoading}
                onComplete={handleCreateAccount}
              />
              {!verificationLoading && (
                <Pressable
                  style={({ pressed }) => {
                    return {
                      opacity: pressed ? 0.5 : 1,
                    };
                  }}
                  onPress={sendVerification}
                >
                  <Text style={{ color: "blue", marginTop: 20, fontSize: 18 }}>
                    Resend
                  </Text>
                </Pressable>
              )}
              {verificationLoading && (
                <ActivityIndicator
                  size={28}
                  style={{ marginTop: 5 }}
                  animating
                />
              )}
            </>
          )}

          {accountCreated && (
            <ScrollView
              style={{
                width: "100%",
                height: "100%",
                paddingTop: 10,
                paddingBottom: 40,
                paddingHorizontal: 10,
                paddingVertical: 20,
              }}
            >
              <Text style={{ ...Fonts.h5, color: Colors.lightGray }}>
                Additional Info
              </Text>
              <View style={styles.inputContent}>
                <Ionicons
                  style={styles.icons}
                  color={Colors.lightGray3}
                  name="person-outline"
                  size={20}
                />
                <TextInput
                  style={styles.input}
                  keyboardType="default"
                  placeholder="Your Name"
                  placeholderTextColor={Colors.lightGray}
                  value={username}
                  onChangeText={(text) => setUsername(text)}
                />
              </View>
              <View style={styles.inputContent}>
                <Fontisto
                  style={styles.icons}
                  color={Colors.lightGray3}
                  name="email"
                  size={20}
                />
                <TextInput
                  style={styles.input}
                  keyboardType="email-address"
                  placeholder="Email Address"
                  placeholderTextColor={Colors.lightGray}
                  value={email}
                  onChangeText={(text) => setEmail(text)}
                />
              </View>
              <View style={styles.inputContent}>
                <TextInput
                  style={styles.input}
                  placeholderTextColor={Colors.lightGray}
                  placeholder="Reference Code (Optional)"
                  value={refCode}
                  onChangeText={(text) => setRefCode(text)}
                />
              </View>
              <View style={{ marginTop: 23 }}>
                <Button
                  title="Login"
                  props={{
                    disabled: !accountCreated || updateLoading,
                  }}
                  onPress={() => {
                    handleUpdateDetails();
                  }}
                  loading={updateLoading}
                  BackgroundColor={Colors.primary}
                  color={Colors.white}
                />
              </View>
            </ScrollView>
          )}
        </LinearGradient>
      </View>
    </Modal>
  );
};

export default AuthModal;

const styles = StyleSheet.create({
  modalFull: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    height: "50%",
    backgroundColor: "white",
    elevation: 2,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  inputCont: {
    marginTop: 20,
  },
  inputContent: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 10,
    paddingLeft: 6,
    paddingRight: 7,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  input: {
    ...Fonts.h5,
    paddingLeft: 5,
    width: "100%",
    height: 40,
    fontSize: Sizes.font,
    color: Colors.white,
    flex: 1,
    alignItems: "center",
  },
  icons: {
    marginTop: 3,
  },
});
