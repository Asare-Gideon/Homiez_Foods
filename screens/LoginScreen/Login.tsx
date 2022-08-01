import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
  Modal,
  ActivityIndicator,
  TouchableHighlight,
  Pressable,
} from "react-native";
import { AntDesign, FontAwesome, Fontisto, Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import SnackBar from "react-native-snackbar-component";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
  FirebaseRecaptchaVerifier,
} from "expo-firebase-recaptcha";
import Button from "../../components/Button";
import images from "../../constants/Images";
import { Colors, Fonts, Sizes } from "../../constants/Layout";
import { homeProp, initallProp } from "../../types";
import { auth, firebaseApp } from "../../app/Firebase";
import {
  getIdToken,
  PhoneAuthProvider,
  signInWithCredential,
  signInWithCustomToken,
  updateProfile,
} from "firebase/auth";
import InputCode from "../../components/InputCode";
import useFirebaseAuth from "../../hooks/useFirebaseAuth";
import axios from "../../app/axios";
import { TouchableOpacity } from "react-native-gesture-handler";

const Login = ({ navigation }: homeProp) => {
  const recaptchaRef = useRef<FirebaseRecaptchaVerifierModal>(null);
  const [verificationId, setVerificationId] = useState("");
  const [verificationLoading, setVerificationLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const { user } = useFirebaseAuth();
  const [error, setError] = useState("");
  const [entry, setEntry] = useState(true);
  const [code, setCode] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [refCode, setRefCode] = useState("");
  const [phone, setPhone] = useState("");
  const [verificationComplete, setVerificationComplete] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const sendVerification = async () => {
    setError("");
    setVerificationLoading(true);
    const phoneProvider = new PhoneAuthProvider(auth);
    try {
      const verificationId = await phoneProvider.verifyPhoneNumber(
        `+233${phone.substring(1)}`,
        recaptchaRef.current as any
      );
      setVerificationId(verificationId);
      setVerificationLoading(false);
      recaptchaRef.current?._reset();
    } catch (err) {
      setError("A problem was encountered, please try again");
      setVerificationLoading(false);
      console.log(err);
    }
  };

  const handleCreateAccount = async (code: string) => {
    setError("");
    setVerificationLoading(true);
    if (verificationId) {
      try {
        const credential = PhoneAuthProvider.credential(verificationId, code);
        const userInfo = await signInWithCredential(auth, credential);
        if (userInfo.user.email && userInfo.user.displayName) {
          setSnackbarMessage(
            `${userInfo.user.displayName} successfully logged in`
          );
          setTimeout(() => {
            navigation.navigate("Home");
          }, 200);
        } else {
          setSnackbarMessage("Fill Additional Details");
        }
        setTimeout(() => {
          setSnackbarMessage("");
        }, 2000);
        setVerificationId("");
        setVerificationComplete(true);
      } catch (err) {
        setError(`There was an error, please try again`);
      }
    }
    setVerificationLoading(false);
  };

  const handleUpdateDetails = async () => {
    setUpdateLoading(true);
    setError("");
    if (auth.currentUser && email && username) {
      try {
        //await updateEmail(auth.currentUser, email);
        await updateProfile(auth.currentUser, {
          displayName: username,
        });
        const token = await getIdToken(auth.currentUser);
        const res = await axios.post("/auth/registerCustomer", {
          uid: auth.currentUser.uid,
          email,
          refCode,
          token,
        });
        if (res.data.error) {
          //setError(res.data.error);
        }
        setUpdateLoading(false);
        await signInWithCustomToken(auth, res.data.customToken);
        setSnackbarMessage(`${user?.username || ""} successfully logged in`);
        setTimeout(() => {
          navigation.navigate("Home");
        }, 1000);
      } catch (err) {
        console.dir(err);
        if (typeof err === "object") {
          if ((err as any).code === "auth/email-already-in-use") {
            setError("Email already in use");
            setUpdateLoading(false);
            return;
          }
        }
        setError("There was an error, please try again");
      }
    }
    setUpdateLoading(false);
  };

  useEffect(() => {
    if (error) setSnackbarMessage(error);
  }, [error]);

  useEffect(() => {
    setVerificationComplete(false);
  }, []);

  return (
    <>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaRef}
        firebaseConfig={firebaseApp.options}
      />
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
      {Boolean(verificationId) && (
        <Modal animationType="slide" transparent>
          <View style={styles.modalFull}>
            <View style={styles.modalContent}>
              <Pressable
                onPress={() => {
                  setVerificationId("");
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
              <Text style={{ ...Fonts.h2 }}>Verify Mobile Number</Text>
              <InputCode
                label="Enter Verification Code"
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
                  <Text style={{ color: "blue" }}>Resend</Text>
                </Pressable>
              )}
              {verificationLoading && (
                <ActivityIndicator
                  size={28}
                  style={{ marginTop: 5 }}
                  animating
                />
              )}
            </View>
          </View>
        </Modal>
      )}

      <KeyboardAvoidingView
        style={styles.main}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled
      >
        <View style={styles.topCont}>
          <View style={styles.imgMain}>
            <View style={styles.imgSub}>
              <Image source={images.logo} style={styles.img} />
            </View>
            <Text style={styles.topText}>Welcome!</Text>
          </View>
        </View>
        <Animatable.View
          animation="fadeInUp"
          duration={1000}
          style={styles.botCont}
        >
          <ScrollView style={{ height: "100%" }}>
            {verificationComplete ? (
              <>
                <Text style={{ ...Fonts.h5 }}>Additional Info</Text>
                <View style={styles.inputContent}>
                  <Ionicons
                    style={styles.icons}
                    name="person-outline"
                    size={20}
                  />
                  <TextInput
                    style={styles.input}
                    keyboardType="default"
                    placeholder="Your Name"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                  />
                </View>
                <View style={styles.inputContent}>
                  <Fontisto style={styles.icons} name="email" size={20} />
                  <TextInput
                    style={styles.input}
                    keyboardType="email-address"
                    placeholder="Email Address"
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                  />
                </View>
                <View style={styles.inputContent}>
                  <TextInput
                    style={styles.input}
                    placeholder="Reference Code (Optional)"
                    value={refCode}
                    onChangeText={(text) => setRefCode(text)}
                  />
                </View>
              </>
            ) : (
              <View style={styles.inputContent}>
                <Feather style={styles.icons} name="phone" size={20} />
                <TextInput
                  style={styles.input}
                  keyboardType="number-pad"
                  placeholder="Enter phone number"
                  value={phone}
                  onChangeText={(text) => setPhone(text)}
                />
              </View>
            )}
            <View style={{ marginTop: 23 }}>
              <Button
                title="Login"
                props={{
                  disabled: Boolean(verificationId) || updateLoading,
                }}
                onPress={() => {
                  if (!Boolean(verificationComplete)) {
                    sendVerification();
                  } else {
                    handleUpdateDetails();
                  }
                }}
                loading={Boolean(verificationId) || updateLoading}
                BackgroundColor={Colors.primary}
                color={Colors.white}
              />
            </View>
          </ScrollView>
        </Animatable.View>
      </KeyboardAvoidingView>

      <FirebaseRecaptchaBanner />
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    height: Sizes.height,
    width: Sizes.width,
    backgroundColor: Colors.primary,
  },
  topCont: {
    flex: 0.3,
    width: "100%",
    padding: 30,
  },
  modalContent: {
    width: "80%",
    minHeight: "50%",
    backgroundColor: "white",
    elevation: 2,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  botCont: {
    flex: 0.8,
    width: "100%",
    backgroundColor: Colors.warmWhite,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
  },
  inputCont: {
    marginTop: 20,
    paddingBottom: 40,
  },
  inputContent: {
    flexDirection: "row",
    borderWidth: 0.3,
    padding: 10,
    paddingLeft: 6,
    paddingRight: 7,
    marginBottom: 15,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  input: {
    ...Fonts.h5,
    paddingLeft: 5,
    fontSize: Sizes.font,
    flex: 1,
    alignItems: "center",
  },
  icons: {
    marginTop: 3,
  },
  last: {
    marginBottom: 300,
  },
  already: {
    width: "100%",
    alignItems: "center",
    paddingRight: 10,
    marginTop: -10,
  },
  alreadyText: {
    ...Fonts.body4,
    color: Colors.primary,
  },
  imgMain: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  imgSub: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 26,
  },
  img: {
    height: 60,
    width: 260,
  },
  topText: {
    ...Fonts.h2,
    color: Colors.white,
    marginTop: 20,
  },
  modalFull: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Login;
