import { View, Text, StyleSheet, Animated } from 'react-native'
import React, { useRef } from 'react'
import { Colors, Fonts, Sizes } from '../../constants/Layout'
import { homeProp } from '../../types'
import Header from '../../components/Header'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Entypo, Feather, Fontisto } from '@expo/vector-icons'

const Agent = ({ navigation }: homeProp) => {
    const slideAnim = useRef(new Animated.Value(-280)).current;

    const slideIn = () => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 800,
            useNativeDriver: false
        }).start();
    };
    const slideDown = () => {
        Animated.timing(slideAnim, {
            toValue: -280,
            duration: 800,
            useNativeDriver: false
        }).start();
    };
    return (
        <View style={styles.main}>
            <View style={styles.header}>
                <Header title='Agent Console' navigation={navigation} />
            </View>
            <ScrollView style={styles.contentCont}>
                <View style={styles.amountCont}>
                    <View style={styles.amountTextCont}>
                        <Text style={styles.amountText}>Current: </Text>
                        <Text style={styles.amountText}>GH₵ 3444</Text>
                    </View>
                    <TouchableOpacity style={styles.amountBtn}>
                        <Text style={styles.amountBtnText}>Withdraw</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.amountCont}>
                    <Text style={styles.amountText}>Amount Withdrawn: </Text>
                    <Text style={styles.amountText}>GH₵ 333</Text>
                </View>

                <Text style={styles.amountText}>Withdrawal History</Text>
                <View style={styles.history}>
                    {/**History table  header*/}
                    <View style={styles.historyHeader}>
                        <Text style={styles.amountText}>Time and Date</Text>
                        <Text style={styles.amountText}>Amount</Text>
                    </View>

                    {/**History table  content*/}
                    <View style={styles.historyHeader}>
                        <Text style={styles.amountText}>3: 30 / 03/02/2022</Text>
                        <Text style={styles.amountText}>GH₵ 30</Text>
                    </View>
                </View>
            </ScrollView>

            <View style={styles.shareBtnCont}>
                <TouchableOpacity style={styles.shareBtn} onPress={() => slideIn()}>
                    <Text style={styles.shareBtnText}>Share</Text>
                </TouchableOpacity>
            </View>
            <Animated.View style={[styles.popupCont, { marginBottom: slideAnim }]}>
                <View style={styles.iconCont}>
                    <TouchableOpacity>
                        <Fontisto name='whatsapp' size={50} color="#25D366" />
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
                    <Text style={{ ...Fonts.body2, textAlign: "center", color: Colors.darkgray }}>Copy Link</Text>
                </TouchableOpacity>
                <View style={styles.closeBtnCont}>
                    <TouchableOpacity style={styles.closeBtn} onPress={() => slideDown()}>
                        <Feather name='arrow-down-circle' size={40} color={"#dc2828"} />
                    </TouchableOpacity>
                </View>

            </Animated.View>
        </View>
    )
}


const styles = StyleSheet.create({
    closeBtn: {

    },
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
        borderColor: Colors.deepDarkGray
    },
    iconCont: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 25
    },
    popupCont: {
        height: 250,
        backgroundColor: Colors.white,
        padding: 15,
        paddingLeft: 23,
        paddingRight: 23
    },
    shareBtnText: {
        color: Colors.white,
        ...Fonts.body3,
        textAlign: 'center'
    },
    shareBtn: {
        backgroundColor: Colors.primary,
        width: Sizes.width - 40,
        padding: 8,
        borderRadius: 8,
        elevation: 8
    },
    shareBtnCont: {
        position: "absolute",
        bottom: 160,
        left: 0,
        right: 0,
        alignItems: "center",
        justifyContent: "center"
    },
    historyHeader: {
        flexDirection: 'row',
        justifyContent: "space-between",
        borderBottomWidth: .3,
        borderColor: Colors.deepDarkGray,
        marginBottom: 10,
        paddingBottom: 5
    },
    history: {
        marginTop: 6,
        backgroundColor: Colors.white,
        padding: 5,
        borderRadius: 5,
    },
    amountBtnText: {
        color: Colors.warmWhite,
        ...Fonts.body3
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
        marginRight: 4
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
        justifyContent: 'space-between',
        marginBottom: 10

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
        padding: 15
    }
})

export default Agent