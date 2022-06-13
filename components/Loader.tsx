import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors, Sizes } from '../constants/Layout'
import images from '../constants/Images';
const AnimatedLottieView = require("lottie-react-native");

const Loader = () => {
    return (
        <View style={styles.main}>
            <View style={styles.content}>
                <AnimatedLottieView source={images.lottie[1]} autoPlay loop />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        height: Sizes.height,
        width: Sizes.width,
        backgroundColor: Colors.primary,
        alignItems: "center",
        justifyContent: "center"
    },
    content: {
        height: Sizes.height / 2.5,
        width: Sizes.width / 2
    }
})
export default Loader