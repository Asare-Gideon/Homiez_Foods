import { View, Text, StyleSheet, FlatList, TouchableHighlight } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import { homeProp } from '../../types'
import { Colors, Fonts, Sizes } from '../../constants/Layout'
import { AntDesign } from '@expo/vector-icons'
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler'

const PreviousOrder = ({ navigation }: homeProp) => {
    const ordersData = [
        {
            id: "2"
        },
        {
            id: "3"
        },
        {
            id: "4"
        },
        {
            id: "5"
        },
    ]
    const renderOrders = ({ item }: any) => (
        <TouchableOpacity onPress={() => navigation.navigate("PreviousOrderDetail")}>
            <View style={styles.summary}>
                <Text style={styles.headerText}>Order Summary</Text>
                <Text style={styles.text1}>Order #233343345</Text>
                <View style={styles.disheCont}>
                    <Text style={styles.disheText}>4 Dishes</Text>
                    <Text style={styles.disheText}>23 / 03 /2022</Text>
                </View>
                <View style={styles.disheCont}>
                    <Text style={styles.disheText}>Total price</Text>
                    <Text style={styles.disheText}>$500</Text>
                </View>
                <View style={styles.check}>
                    <AntDesign name='checkcircle' color={Colors.primary} size={30} />
                </View>
            </View>
        </TouchableOpacity>
    )
    return (
        <View style={styles.main}>
            <View style={styles.header}>
                <Header title='Previous Orders' navigation={navigation} />
            </View>
            <View style={styles.ContentCont}>
                <FlatList
                    renderItem={renderOrders}
                    data={ordersData}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 30 }}
                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        paddingTop: Sizes.paddingTop,
        backgroundColor: Colors.primary,
    },
    header: {
        height: 60,
    },
    ContentCont: {
        backgroundColor: Colors.warmWhite,
        padding: 15,
        flex: 1
    },
    summary: {
        elevation: 2,
        backgroundColor: Colors.white,
        borderRadius: 12,
        padding: 10,
        paddingBottom: 10,
        marginBottom: 10,
    },
    headerText: {
        ...Fonts.h3,
        color: Colors.darkgray,
        paddingBottom: 4,
    },
    text1: {
        ...Fonts.body2,
        color: Colors.deepDarkGray,
        fontSize: 18,
    },
    disheCont: {
        flexDirection: "row",
    },
    disheText: {
        ...Fonts.body2,
        color: Colors.deepDarkGray,
        fontSize: 18,
        marginRight: 15,
    },
    check: {
        position: "absolute",
        right: 1,
        bottom: 1,
    },
})

export default PreviousOrder