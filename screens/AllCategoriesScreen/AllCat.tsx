import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { allCartStyle } from './AllCartStyle'
import Header from '../../components/Header'
import { homeProp } from '../../types'
import { ScrollView } from 'react-native-gesture-handler'
import Items from '../../components/Items'
import { itemData } from '../../constants/Data'

const AllCat = ({ navigation }: homeProp) => {

    const renderItems = ({ item }: any) => (
        <Items image={item.image} price={item.price} title={item.title} navigation={navigation} />
    )
    return (
        <View style={allCartStyle.main}>
            <View style={allCartStyle.header}>
                <Header title='All Products' navigation={navigation} />
            </View>
            <ScrollView style={allCartStyle.contentCont}>
                <View>
                    <Text style={allCartStyle.headerText}>All Categories</Text>
                </View>
                <FlatList
                    renderItem={renderItems}
                    data={itemData}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={allCartStyle.itemsContainer}
                />
            </ScrollView>
        </View>
    )
}

export default AllCat