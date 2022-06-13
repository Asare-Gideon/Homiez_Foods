import { View, Text, FlatList, TouchableHighlight } from 'react-native'
import React from 'react'
import Header from '../../components/Header'
import { homeProp } from '../../types'
import { ScrollView } from 'react-native-gesture-handler'
import { AntDesign } from '@expo/vector-icons'
import { Colors } from '../../constants/Layout'
import CartsItem from '../../components/CartsItem'
import { cartsData } from '../../constants/Data'
import { orderStyle } from '../OrederScreen/orderStyle'

const OrderDetail = ({ navigation }: homeProp) => {
    const renderCartsItem = ({ item }: any) => (
        <View style={orderStyle.summary}>
            <Text style={orderStyle.text}>{item.title}</Text>
            <View style={orderStyle.disheCont}>
                <Text style={orderStyle.text}>Price</Text>
                <Text style={orderStyle.text}>{item.price}</Text>
            </View>
            <View style={orderStyle.check}>
                <AntDesign name='checkcircle' color={Colors.primary} size={18} />
            </View>

        </View>
    )

    return (
        <View style={orderStyle.main}>
            <View style={orderStyle.header}>
                <Header title='Previous Order' navigation={navigation} />
            </View>
            <ScrollView style={orderStyle.contentContainer}>
                <View>
                    <FlatList
                        renderItem={renderCartsItem}
                        data={cartsData}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 100 }}
                    />

                </View>

            </ScrollView>
            <View style={orderStyle.sumCont}>
                <View style={orderStyle.totalCont}>
                    <Text style={orderStyle.totalText}>Total</Text>
                    <Text style={orderStyle.totalText} >GH₵ 4550</Text>
                </View>

            </View>
        </View>
    )
}

export default OrderDetail