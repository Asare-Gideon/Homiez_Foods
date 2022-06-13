import { View, Text, ScrollView, FlatList, TouchableHighlightBase, TouchableHighlight } from 'react-native'
import React from 'react'
import { cartStyle } from './cartStyle'
import Header from '../../components/Header'
import { homeProp } from '../../types'
import CartsItem from '../../components/CartsItem'
import { cartsData } from '../../constants/Data'

const Carts = ({ navigation }: homeProp) => {
    const renderCartsItem = ({ item }: any) => (
        <CartsItem price={item.price} title={item.title} image={item.image} text={item.text} />
    )
    return (
        <View style={cartStyle.main}>
            <View style={cartStyle.header}>
                <Header title='Carts' navigation={navigation} />
            </View>
            <ScrollView style={cartStyle.contentContainer}>
                <View style={cartStyle.mainListCont}>
                    <FlatList
                        renderItem={renderCartsItem}
                        data={cartsData}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ paddingBottom: 100 }}
                    />
                </View>
            </ScrollView>
            <View style={cartStyle.sumCont}>
                <View style={cartStyle.totalCont}>
                    <Text style={cartStyle.totalText}>Total</Text>
                    <Text style={cartStyle.totalText} >GH₵ 4550</Text>
                </View>
                <View style={cartStyle.orderBtnCont}>
                    <TouchableHighlight style={cartStyle.orderBtn} onPress={() => navigation.navigate("Order")}>
                        <Text style={cartStyle.orderBtnText}>Continue</Text>
                    </TouchableHighlight>
                </View>
            </View>
        </View>
    )
}

export default Carts