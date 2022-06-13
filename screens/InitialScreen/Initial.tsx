import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors, Fonts, Sizes } from '../../constants/Layout'
import { TouchableOpacity } from 'react-native-gesture-handler'
import images from '../../constants/Images';
import { initallProp } from '../../types';
const AnimatedLottieView = require("lottie-react-native");

const Initial = ({ navigation }: initallProp) => {
    return (
        <View style={styles.main}>
            <View style={styles.header}>
                <View style={styles.lottieCont}>
                    <AnimatedLottieView source={images.lottie[0]} autoPlay loop />
                </View>
            </View>
            <View style={styles.contentCont}>
                <View style={styles.contentHeaderTextCont}>
                    <Text style={styles.headerText}>Food You Love, </Text>
                    <Text style={styles.headerText}>Delivered to You</Text>
                    <Text style={styles.paraText}>Order food from Homiez foods restourants and enjoy it anywhere, anytime</Text>
                    <TouchableOpacity style={styles.btnCont} onPress={() => navigation.navigate("SignupScreen")} >
                        <Text style={styles.btnText}>Get Started</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    lottieCont: {
        width: Sizes.width,
        height: Sizes.height / 1.9,
    },
    btnCont: {
        alignSelf: "center",
        width: "100%",
        backgroundColor: Colors.primary,
        marginTop: 24,
        padding: 5,
        borderRadius: 8
    },
    btnText: {
        textAlign: "center",
        ...Fonts.body2,
        color: Colors.warmWhite,
        fontSize: 19
    },
    paraText: {
        ...Fonts.body3,
        color: Colors.darkgray,
        marginTop: 3
    },
    headerText: {
        ...Fonts.style,
        fontSize: 40,
        color: Colors.darkgray,
        letterSpacing: 2.2
    },
    contentHeaderTextCont: {
        paddingLeft: 10
    },
    main: {
        flex: 1,
        paddingTop: Sizes.paddingTop,

    },
    header: {
        height: Sizes.height / 1.9,
        backgroundColor: Colors.white
    },
    contentCont: {
        flex: 1,
        padding: 15,
        backgroundColor: Colors.white
    },
})
export default Initial