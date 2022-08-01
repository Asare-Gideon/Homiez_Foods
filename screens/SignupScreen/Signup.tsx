import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import Button from "../../components/Button";
import images from "../../constants/Images";
import { Colors, Fonts, Sizes } from "../../constants/Layout";
import { initallProp } from "../../types";

type data = string | undefined;

interface dataType {
  phone: data;
  email: data;
  password: data;
  confirmPassword: data;
  validName: boolean;
}
const Signup = ({ navigation }: initallProp) => {
  const [entry, setEntry] = useState(true)
  const [entry2, setEntry2] = useState(true)
  const [data, setData] = useState<dataType>({
    phone: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
    validName: true,
  });
  return (
    <KeyboardAvoidingView style={styles.main}
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
          <View style={styles.inputContent}>
            <Feather style={styles.icons} name="phone" size={20} />
            <TextInput
              style={styles.input}
              placeholder="Enter your phone number"
              value={data.phone}
              onChangeText={(e) => setData({ ...data, phone: e })}
            />
          </View>
          <View style={[styles.inputContent]}>
            <Feather style={styles.icons} name="lock" size={20} />
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={data.password}
              onChangeText={(e) => setData({ ...data, password: e })}
              secureTextEntry={entry}
            />
            {
              entry ? (
                <Animatable.View animation={"bounceIn"} duration={700}>
                  <TouchableOpacity onPress={() => setEntry(prev => !prev)}>
                    <Feather name="eye" size={24} />
                  </TouchableOpacity>
                </Animatable.View>
              ) : (
                <Animatable.View animation={"bounceIn"} duration={700}>
                  <TouchableOpacity onPress={() => setEntry(prev => !prev)}>
                    <Feather name="eye-off" size={24} />
                  </TouchableOpacity>
                </Animatable.View>
              )
            }
          </View>
          <View style={[styles.inputContent]}>
            <Feather style={styles.icons} name="lock" size={20} />
            <TextInput
              style={styles.input}
              placeholder="Confirm password"
              value={data.confirmPassword}
              onChangeText={(e) => setData({ ...data, confirmPassword: e })}
              secureTextEntry={entry2}
            />
            {
              entry2 ? (
                <Animatable.View animation={"bounceIn"} duration={700}>
                  <TouchableOpacity onPress={() => setEntry2(prev => !prev)}>
                    <Feather name="eye" size={24} />
                  </TouchableOpacity>
                </Animatable.View>
              ) : (
                <Animatable.View animation={"bounceIn"} duration={700}>
                  <TouchableOpacity onPress={() => setEntry2(prev => !prev)}>
                    <Feather name="eye-off" size={24} />
                  </TouchableOpacity>
                </Animatable.View>
              )
            }
          </View>

          <View style={{ marginTop: 13 }}>
            <Button
              title="Create Account"
              BackgroundColor={Colors.primary}
              color={Colors.white}
            />
            <Button
              title="Signup with faceboook"
              BackgroundColor={"#4267B2"}
              color={Colors.white}
            />
            <View style={styles.already}>
              <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
                <Text style={styles.alreadyText}>
                  Already have an account
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </ScrollView>
      </Animatable.View>
    </KeyboardAvoidingView>
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
    borderTopWidth: 0
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
    marginTop: 26
  },
  img: {
    height: 60,
    width: 250,
  },
  topText: {
    ...Fonts.h2,
    color: Colors.white,
    marginTop: 20
  },
});

export default Signup;
