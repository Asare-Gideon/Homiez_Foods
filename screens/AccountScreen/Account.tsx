import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors, Fonts, Sizes } from '../../constants/Layout'
import Header from '../../components/Header'
import { homeProp } from '../../types'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { AntDesign, Feather } from '@expo/vector-icons'

const Account = ({ navigation }: homeProp) => {
    return (
        <View style={styles.main}>
            <View style={styles.header}>
                <Header title='Account' navigation={navigation} />
            </View>
            <View style={styles.contentCont}>
                <View style={styles.btnCont}>
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("PreviousOrders")}>
                        <View style={styles.btnTextCont}>
                            <AntDesign name='creditcard' size={20} color={Colors.deepDarkGray} />
                            <Text style={styles.btnText}>Previous orders</Text>
                        </View>
                        <AntDesign name='right' size={23} color={Colors.deepDarkGray} />
                    </TouchableOpacity >
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("ChangeInfo")}>
                        <View style={styles.btnTextCont}>
                            <AntDesign name='book' size={22} color={Colors.deepDarkGray} />
                            <Text style={styles.btnText}>Change info</Text>
                        </View>
                        <AntDesign name='right' size={23} color={Colors.deepDarkGray} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Help")}>
                        <View style={styles.btnTextCont}>
                            <Feather name='help-circle' size={24} color={Colors.deepDarkGray} />
                            <Text style={styles.btnText}>Help</Text>
                        </View>
                        <AntDesign name='right' size={23} color={Colors.deepDarkGray} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

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
        borderBottomWidth: 0.3,
        elevation: 1,
        borderRadius: 10,
        marginBottom: 10,
    },
    btnCont: {
        width: "100%",
        height: Sizes.height / 1.5,
        backgroundColor: Colors.white,
        borderRadius: 20,
        elevation: 2,
        padding: 10,
        paddingTop: 15
    },
    main: {
        flex: 1,
        paddingTop: Sizes.paddingTop,
        backgroundColor: Colors.primary
    },
    contentCont: {
        backgroundColor: Colors.warmWhite,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: 15,
        paddingRight: 15
    },
    header: {
        height: 60,
    }
})

export default Account