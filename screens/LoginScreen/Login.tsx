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
}
const Login = ({ navigation }: initallProp) => {
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
                        <Image source={images.categories[0]} style={styles.img} />
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
                        <FontAwesome style={styles.icons} name="envelope-o" size={20} />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your email"
                            value={data.email}
                            onChangeText={(e) => setData({ ...data, email: e })}
                        />
                    </View>
                    <View style={styles.inputContent}>
                        <AntDesign style={styles.icons} name="phone" size={20} />
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your phone number"
                            value={data.phone}
                            onChangeText={(e) => setData({ ...data, phone: e })}
                        />
                    </View>
                    <View style={{ marginTop: 23 }}>
                        <Button
                            title="Login"
                            BackgroundColor={Colors.primary}
                            color={Colors.white}
                        />
                        <Button
                            title="Login with faceboook"
                            BackgroundColor={"#4267B2"}
                            color={Colors.white}
                        />
                        <View style={styles.already}>
                            <TouchableOpacity onPress={() => navigation.navigate("SignupScreen")}>
                                <Text style={styles.alreadyText}>
                                    Create new account
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
        width: 100,
        height: 100,
        borderWidth: 5,
        borderColor: Colors.white,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 60,
    },
    img: {
        height: 75,
        width: 75,
        borderRadius: 50,
    },
    topText: {
        ...Fonts.h2,
        color: Colors.white,
    },
});

export default Login;
