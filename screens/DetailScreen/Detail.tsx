import { View, Text, Image, FlatList } from 'react-native'
import React from 'react'
import { detailStyle } from './detailStyle'
import { ScrollView, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler'
import images from '../../constants/Images'
import Items from '../../components/Items'
import { homeProp } from '../../types'
import { itemData } from '../../constants/Data'
import { AntDesign } from '@expo/vector-icons'
import { Colors } from '../../constants/Layout'

const Detail = ({ navigation }: homeProp) => {
    const renderItems = ({ item }: any) => (
        <Items image={item.image} price={item.price} title={item.title} navigation={navigation} />
    )


    return (
        <View style={detailStyle.main}>
            <View style={detailStyle.imageCont}>
                <View style={detailStyle.backBtnCont}>
                    <TouchableOpacity onPress={() => navigation.goBack()} >
                        <AntDesign name='arrowleft' size={24} color={Colors.white} />
                    </TouchableOpacity>
                </View>
                <Image source={images.items[0]} style={{ width: "100%", height: "100%" }} />
            </View>
            <ScrollView style={detailStyle.contentCont}>
                <View style={detailStyle.headerCont}>
                    <Text style={detailStyle.itemName}>Blueberry Bagel</Text>
                    <TouchableHighlight style={detailStyle.addCartBtn} onPress={() => console.log("add to carts")}>
                        <Text style={detailStyle.addText}>Add to cart</Text>
                    </TouchableHighlight>
                </View>
                {/**price */}
                <Text style={detailStyle.price}>GH₵ 250</Text>

                <Text style={detailStyle.likeText}>Ingredient</Text>
                <View style={detailStyle.ingredientCont}>
                    <Text style={detailStyle.ingText}>Salt</Text>
                    <Text style={detailStyle.ingText}>Pepper</Text>
                    <Text style={detailStyle.ingText}>Salad</Text>
                    <Text style={detailStyle.ingText}>Carrots</Text>
                    <Text style={detailStyle.ingText}>Cabbage</Text>
                    <Text style={detailStyle.ingText}>Cacumber</Text>
                </View>
                <View>
                    <Text style={detailStyle.likeText}>You may also like</Text>
                    <FlatList
                        renderItem={renderItems}
                        data={itemData}
                        keyExtractor={(item) => item.id}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true}
                        contentContainerStyle={{ paddingBottom: 10 }}
                    />
                </View>

            </ScrollView>
        </View>
    )
}

export default Detail